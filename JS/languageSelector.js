en = document.getElementsByClassName("en");
sr = document.getElementsByClassName("sr");
const lnBtn = document.getElementById("language-toggle");

lnBtn.checked = JSON.parse(localStorage.getItem("language"));

lnBtn.addEventListener("click", (e) => {
  en = document.getElementsByClassName("en");
  sr = document.getElementsByClassName("sr");
  localStorage.setItem("language", e.target.checked);
  if (e.target.checked) {
    console.log("object");
    for (let i = 0; i < en.length; i++) {
      en[i].classList.toggle("unactive");
    }
    for (let i = 0; i < sr.length; i++) {
      sr[i].classList.toggle("unactive");
    }
  } else {
    for (let i = 0; i < en.length; i++) {
      en[i].classList.toggle("unactive");
    }
    for (let i = 0; i < sr.length; i++) {
      sr[i].classList.toggle("unactive");
    }
  }
});

if (lnBtn.checked) {
  for (let i = 0; i < sr.length; i++) {
    sr[i].classList.toggle("unactive");
  }
} else {
  for (let i = 0; i < en.length; i++) {
    en[i].classList.toggle("unactive");
  }
}
