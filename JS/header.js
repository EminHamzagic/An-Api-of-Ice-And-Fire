const hamburger = document.querySelector(".hamburger");
const hbtns = document.querySelector(".hbuttons");
const header = document.getElementById("header");
var lan = JSON.parse(localStorage.getItem("language"));

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

if (localStorage.getItem("loggedIn")) {
  document.getElementsByClassName("login")[0].style.display = "none";
  document.getElementsByClassName("login")[1].style.display = "none";
} else {
  document.getElementsByClassName("logout")[0].style.display = "none";
  document.getElementsByClassName("logout")[1].style.display = "none";
}

document.getElementsByClassName("logout")[0].addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
});

document.getElementsByClassName("logout")[1].addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
});

document.getElementById("logo").addEventListener("click", () => {
  location.href = "home.html";
});
