localStorage.setItem("page", "contactUs");

if (!localStorage.getItem("loggedIn")) {
  location.href = "login.html";
}

var lan = JSON.parse(localStorage.getItem("language"));
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
var emailErr = "Not a valid adress",
  nameErr = "Only characters",
  msgErr = "Message must contain text!";

btn.addEventListener("click", () => {
  if (!emailRegex.test(email.value)) {
    inputInfo[2].innerHTML = emailErr;
    inputInfo[2].style.color = "red";
  }
  if (!nameRegex.test(fname.value)) {
    inputInfo[0].innerHTML = nameErr;
    inputInfo[0].style.color = "red";
  }
  if (!nameRegex.test(lname.value)) {
    inputInfo[1].innerHTML = nameErr;
    inputInfo[1].style.color = "red";
  }
  if (!msg.value) {
    inputInfo[3].innerHTML = msgErr;
    inputInfo[3].style.color = "red";
  }
  if (
    emailRegex.test(email.value) &&
    nameRegex.test(fname.value) &&
    nameRegex.test(lname.value) &&
    msg.value
  ) {
    document.getElementById("response").classList.toggle("active");
    fname.value = "";
    lname.value = "";
    email.value = "";
    msg.value = "";
  }
});

document.getElementById("closeBtn").addEventListener("click", () => {
  document.getElementById("response").classList.toggle("active");
});

const setLan = (state) => {
  console.log(fname.placeHolder);
  if (state) {
    document.getElementById("contactBtn").innerText = "Send Message";
    fname.placeholder = "First Name";
    lname.placeholder = "Last Name";
    msg.placeholder = "Type your message here";
    nameErr = "Only characters";
    emailErr = "Not a valid adress";
    msgErr = "Message must contain text!";
  } else {
    document.getElementById("contactBtn").innerText = "Posalji poruku";
    fname.placeholder = "Ime";
    lname.placeholder = "Prezime";
    msg.placeholder = "Napisi svoju poruku ovde";
    nameErr = "Samo karakteri";
    emailErr = "Nije validna email adresa";
    msgErr = "Poruka mora sadrzati tekst!";
  }
};

setLan(lan);

document.getElementById("language-toggle").addEventListener("click", (e) => {
  setLan(e.target.checked);
});
