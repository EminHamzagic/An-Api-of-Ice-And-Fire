async function getBooks() {
  const res = await fetch(
    "https://www.anapioficeandfire.com/api/books?page=1&pageSize=50"
  );
  const data = await res.json();
  return data;
}

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
      const index = e.target.getAttribute("data-id");
      const infoBox = document.getElementById("info");
      const infoTitle = document.getElementById("infoTitle");
      const infoP1 = document.getElementById("infoP1");
      const infoP2 = document.getElementById("infoP2");
      infoP1.innerHTML = "";
      infoP2.innerHTML = "";
      const p1 = document.createElement("p");
      p1.innerText = `Authors: ${booksRaw[index].authors.toString()}`;
      const p2 = document.createElement("p");
      p2.innerText = `Country: ${booksRaw[index].country}`;
      const p3 = document.createElement("p");
      p3.innerText = `ISBN: ${booksRaw[index].isbn}`;
      const p4 = document.createElement("p");
      p4.innerText = `Media Type: ${booksRaw[index].mediaType}`;
      const p5 = document.createElement("p");
      p5.innerText = `Number of Pages: ${booksRaw[index].numberOfPages}`;
      const p6 = document.createElement("p");
      p6.innerText = `Publisher: ${booksRaw[index].publisher}`;
      const p7 = document.createElement("p");
      p7.innerText = `Released: ${booksRaw[index].released}`;
      const p8 = document.createElement("p");
      p8.setAttribute("id", "povChar");
      p8.setAttribute("title", "Click to see the list of pov characters");
      p8.innerText = `Pov Characters`;
      p8.innerHTML += `<div id="charMenu"></div>`;
      infoP1.appendChild(p1);
      infoP1.appendChild(p2);
      infoP1.appendChild(p3);
      infoP1.appendChild(p4);
      infoP2.appendChild(p5);
      infoP2.appendChild(p6);
      infoP2.appendChild(p7);
      infoP2.appendChild(p8);

      p8.addEventListener("click", () => {
        p8.classList.toggle("active");
      });

      const charMenu = document.getElementById("charMenu");
      charMenu.innerHTML = "";
      for (let i = 0; i < booksRaw[index].povCharacters.length; i++) {
        fetch(booksRaw[index].povCharacters[i])
          .then((res) => res.json())
          .then((data) => (charMenu.innerHTML += `<p>${data.name}</p>`));
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
