const hamburger = document.querySelector(".hamburger");
const hbtns = document.querySelector(".hbuttons");
const header = document.getElementById("header");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  hbtns.classList.toggle("active");
  header.classList.toggle("active");
});

async function slideCharacters() {
  let page = Math.floor(Math.random() * (110 + 1) + 10);
  const res = await fetch(
    `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=9`
  );
  const data = await res.json();
  return data;
}

slideCharacters().then((data) => {
  const slidesContainer = document.getElementById("slides");
  data.map((el) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const h1 = document.createElement("h1");
    if (el.name !== "") h1.innerHTML = el.name;
    else h1.innerHTML = el.aliases[0];
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("cardInfo");
    cardInfo.innerHTML += `<p>culture: ${
      el.culture ? el.culture : "Unknown"
    }</p>`;
    cardInfo.innerHTML += `<p>born: ${el.born ? el.born : "Unknown"}</p>`;
    cardInfo.innerHTML += `<p>died: ${el.died ? el.died : "Unknown"}</p>`;
    cardInfo.innerHTML += `<p>titles: ${
      el.titles[0] !== ""
        ? el.titles.length > 1
          ? el.titles[0] + ", ..."
          : el.titles[0]
        : "none"
    }</p>`;
    card.appendChild(h1);
    card.appendChild(cardInfo);
    slidesContainer.appendChild(card);
  });

  const cards = document.getElementsByClassName("card");
  for (let i = 3; i < 9; i++) cards[i].style.display = "none";
});

var counter = 0;

const showSlides = () => {
  const cards = document.getElementsByClassName("card");
  if (counter === -3) counter = 6;
  else if (counter === 9) counter = 0;
  for (let i = counter; i < counter + 3; i++) cards[i].style.display = "inline";
  for (let i = 0; i < 9; i++) {
    if (i !== counter && i !== counter + 1 && i !== counter + 2) {
      // cards[i].style.transform = "scale(0.8)";
      cards[i].style.display = "none";
    }
  }
};

const prevSlide = () => {
  counter -= 3;
  showSlides();
  const cards = document.getElementsByClassName("card");
  cards[counter].classList.add("addCardAnim");
  cards[counter + 1].classList.add("addCardAnim");
  cards[counter + 2].classList.add("addCardAnim");
};

const nextSlide = () => {
  counter += 3;
  showSlides();
  const cards = document.getElementsByClassName("card");
  cards[counter].classList.add("addCardAnim");
  cards[counter + 1].classList.add("addCardAnim");
  cards[counter + 2].classList.add("addCardAnim");
};

document.getElementById("prev").addEventListener("click", prevSlide);

document.getElementById("next").addEventListener("click", nextSlide);

let touchstartX = 0;
let touchendX = 0;
const slides = document.getElementById("slides");

function checkDirection() {
  if (touchendX < touchstartX) nextSlide();
  if (touchendX > touchstartX) prevSlide();
}

slides.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

slides.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});
