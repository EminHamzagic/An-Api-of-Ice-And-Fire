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

if (localStorage.getItem("loggedIn")) {
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "flex";
} else {
  document.getElementById("login").style.display = "flex";
  document.getElementById("logout").style.display = "none";
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
});
