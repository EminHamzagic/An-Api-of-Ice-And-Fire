const btns = document.getElementsByClassName("hbtn");

btns[0].addEventListener("click", () => {
  location.href = "home.html";
  localStorage.setItem("page", "home");
});

btns[1].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "books.html";
  localStorage.setItem("page", "books");
});

btns[2].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "characters.html";
  localStorage.setItem("page", "characters");
});

btns[3].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "houses.html";
  localStorage.setItem("page", "houses");
});

btns[4].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "contactUs.html";
  localStorage.setItem("page", "contactUs");
});

btns[5].addEventListener("click", () => {
  location.href = "home.html";
  localStorage.setItem("page", "home");
});

btns[6].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "books.html";
  localStorage.setItem("page", "books");
});

btns[7].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "characters.html";
  localStorage.setItem("page", "characters");
});

btns[8].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "houses.html";
  localStorage.setItem("page", "houses");
});

btns[9].addEventListener("click", () => {
  if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
  } else location.href = "contactUs.html";
  localStorage.setItem("page", "contactUs");
});

btns[10].addEventListener("click", () => {
  location.href = "login.html";
});

btns[11].addEventListener("click", () => {
  location.href = "login.html";
});
