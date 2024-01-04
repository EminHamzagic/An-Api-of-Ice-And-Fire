const hamburger = document.querySelector(".hamburger");
const hbtns = document.querySelector(".hbuttons");
const header = document.getElementById("header");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  hbtns.classList.toggle("active");
  header.classList.toggle("active");
});
