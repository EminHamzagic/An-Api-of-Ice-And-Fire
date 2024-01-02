// fetch("https://www.anapioficeandfire.com/api/books")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

async function getBooks() {
  const res = await fetch("https://www.anapioficeandfire.com/api/books");
  const data = await res.json();
  return data;
}

getBooks().then((data) => {
  const bookList = document.getElementsByClassName("blist")[0];
  document.getElementById("loading").style.display = "none";
  data.map((item) => {
    const title = document.createElement("h1");
    const box = document.createElement("div");
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
    books[i].addEventListener("click", () => {
      document.getElementById("info").classList.toggle("active");
    });
  }
});

document.getElementById("closeBtn").addEventListener("click", (e) => {
  e.target.parentElement.classList.toggle("active");
});
