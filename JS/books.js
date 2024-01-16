async function getBooks() {
  const res = await fetch(
    "https://www.anapioficeandfire.com/api/books?page=1&pageSize=50"
  );
  const data = await res.json();
  return data;
}

if (!localStorage.getItem("loggedIn")) {
  location.href = "login.html";
}

var lan = JSON.parse(localStorage.getItem("language"));
var booksRaw = [];

getBooks().then((data) => {
  const bookList = document.getElementsByClassName("blist")[0];
  document.getElementById("loading").style.display = "none";
  booksRaw = data;
  data.map((item, index) => {
    const title = document.createElement("h1");
    const box = document.createElement("div");
    box.setAttribute("data-id", index);
    const isbn = document.createElement("p");
    isbn.innerText = `ISBN: ${item.isbn}`;
    title.innerText = item.name;
    box.classList.add("item");
    box.appendChild(title);
    box.appendChild(isbn);
    bookList.appendChild(box);
  });

  const books = document.getElementsByClassName("item");

  for (let i = 0; i < books.length; i++) {
    books[i].addEventListener("click", (e) => {
      lan = JSON.parse(localStorage.getItem("language"));
      const index = e.target.getAttribute("data-id");
      const infoBox = document.getElementById("info");
      const infoTitle = document.getElementById("infoTitle");
      const infoP1 = document.getElementById("infoP1");
      const infoP2 = document.getElementById("infoP2");
      infoP1.innerHTML = "";
      infoP2.innerHTML = "";

      //Engleski jezik
      const p1 = document.createElement("p");
      p1.innerText = `Authors: ${booksRaw[index].authors.toString()}`;
      const p2 = document.createElement("p");
      p1.classList.add("en", lan ? "&nbsp;" : "unactive");
      p2.innerText = `Country: ${booksRaw[index].country}`;
      p2.classList.add("en", lan ? "&nbsp;" : "unactive");
      const p3 = document.createElement("p");
      p3.innerText = `ISBN: ${booksRaw[index].isbn}`;
      p3.classList.add("en", lan ? "&nbsp;" : "unactive");
      const p4 = document.createElement("p");
      p4.innerText = `Media Type: ${booksRaw[index].mediaType}`;
      p4.classList.add("en", lan ? "&nbsp;" : "unactive");

      //Srpski jezik
      const p1a = document.createElement("p");
      p1a.innerText = `Autori: ${booksRaw[index].authors.toString()}`;
      p1a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      const p2a = document.createElement("p");
      p2a.innerText = `Zemlja: ${booksRaw[index].country}`;
      p2a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      const p3a = document.createElement("p");
      p3a.innerText = `ISBN: ${booksRaw[index].isbn}`;
      p3a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      const p4a = document.createElement("p");
      p4a.innerText = `Vrsta medija: ${booksRaw[index].mediaType}`;
      p4a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      infoP1.append(p1, p2, p3, p4, p1a, p2a, p3a, p4a);

      //Engleski jezik
      const p5 = document.createElement("p");
      p5.innerText = `Number of Pages: ${booksRaw[index].numberOfPages}`;
      p5.classList.add("en", lan ? "&nbsp;" : "unactive");
      const p6 = document.createElement("p");
      p6.innerText = `Publisher: ${booksRaw[index].publisher}`;
      p6.classList.add("en", lan ? "&nbsp;" : "unactive");
      const p7 = document.createElement("p");
      p7.innerText = `Released: ${booksRaw[index].released}`;
      p7.classList.add("en", lan ? "&nbsp;" : "unactive");
      const p8 = document.createElement("p");
      p8.setAttribute("id", "povChar");
      p8.innerText = `Pov Characters`;
      p8.classList.add("en", lan ? "&nbsp;" : "unactive");
      p8.innerHTML += `<div class="charMenu"></div>`;

      //Srpski jezik
      const p5a = document.createElement("p");
      p5a.innerText = `Broj stranica: ${booksRaw[index].numberOfPages}`;
      p5a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      const p6a = document.createElement("p");
      p6a.innerText = `Izdavac: ${booksRaw[index].publisher}`;
      p6a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      const p7a = document.createElement("p");
      p7a.innerText = `Objavljeno: ${booksRaw[index].released}`;
      p7a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      const p8a = document.createElement("p");
      p8a.setAttribute("id", "povChar");
      p8a.innerText = `Pov Karakteri`;
      p8a.classList.add("sr", lan ? "unactive" : "&nbsp;");
      p8a.innerHTML += `<div class="charMenu"></div>`;

      infoP2.append(p5, p6, p7, p8, p5a, p6a, p7a, p8a);

      p8.addEventListener("click", () => {
        p8.classList.toggle("active");
      });

      p8a.addEventListener("click", () => {
        p8a.classList.toggle("active");
      });

      const charMenu = document.getElementsByClassName("charMenu");
      charMenu[0].innerHTML = "";
      charMenu[1].innerHTML = "";
      if (booksRaw[index].povCharacters.length === 0) {
        charMenu[0].innerHTML += `<p>None</p>`;
        charMenu[1].innerHTML += `<p>Nijedan</p>`;
      }
      for (let i = 0; i < booksRaw[index].povCharacters.length; i++) {
        fetch(booksRaw[index].povCharacters[i])
          .then((res) => res.json())
          .then((data) => {
            charMenu[0].innerHTML += `<p>${data.name}</p>`;
            charMenu[1].innerHTML += `<p>${data.name}</p>`;
          });
      }
      infoTitle.innerText = booksRaw[index].name;
      infoBox.classList.toggle("active");
    });
  }
});

document.getElementById("closeBtn").addEventListener("click", (e) => {
  e.target.parentElement.classList.toggle("active");
});

const makeStr = (arr) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    if (i < arr.length - 1) str += arr[i] + ", ";
    else str += arr[i];
  }
  return str;
};
