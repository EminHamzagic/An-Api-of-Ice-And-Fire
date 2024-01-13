const inputInfo = document.getElementsByClassName("inputInfo");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const msg = document.getElementById("msg");

fname.addEventListener("focus", () => {
  inputInfo[1].innerHTML =
    inputInfo[2].innerHTML =
    inputInfo[3].innerHTML =
      "&nbsp;";
  inputInfo[0].style.color = "white";
  inputInfo[0].innerHTML = "a-z A-Z";
});
lname.addEventListener("focus", () => {
  inputInfo[0].innerHTML =
    inputInfo[2].innerHTML =
    inputInfo[3].innerHTML =
      "&nbsp;";
  inputInfo[1].style.color = "white";
  inputInfo[1].innerHTML = "a-z A-Z";
});
email.addEventListener("focus", () => {
  inputInfo[0].innerHTML =
    inputInfo[1].innerHTML =
    inputInfo[3].innerHTML =
      "&nbsp;";
  inputInfo[2].style.color = "white";
  inputInfo[2].innerHTML = "Ex. something@gmail.com";
});
msg.addEventListener("focus", () => {
  inputInfo[0].innerHTML =
    inputInfo[1].innerHTML =
    inputInfo[2].innerHTML =
      "&nbsp;";
  inputInfo[3].style.color = "white";
  inputInfo[3].innerHTML = "Put your message in here";
});

var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var nameRegex = /^[a-zA-Z]+$/;
var btn = document.getElementById("contactBtn");

btn.addEventListener("click", () => {
  if (!emailRegex.test(email.value)) {
    inputInfo[2].innerHTML = "Not a valid adress";
    inputInfo[2].style.color = "red";
  }
  if (!nameRegex.test(fname.value)) {
    inputInfo[0].innerHTML = "Only characters";
    inputInfo[0].style.color = "red";
  }
  if (!nameRegex.test(lname.value)) {
    inputInfo[1].innerHTML = "Only characters";
    inputInfo[1].style.color = "red";
  }
  if (!msg.value) {
    inputInfo[3].innerHTML = "Must contain a message!";
    inputInfo[3].style.color = "red";
  }
});
