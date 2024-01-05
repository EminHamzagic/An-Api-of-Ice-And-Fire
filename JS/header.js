const hamburger = document.querySelector(".hamburger");
const hbtns = document.querySelector(".hbuttons");
const header = document.getElementById("header");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  hbtns.classList.toggle("active");
  header.classList.toggle("active");
});

window.addEventListener("scroll", () => {
  let y = window.scrollY;
  if (y > 100) header.classList.add("scroll");
  else if (y < 300) header.classList.remove("scroll");
});
