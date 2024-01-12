const inputInfo = document.getElementsByClassName("inputInfo");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const msg = document.getElementById("msg");
document.addEventListener("click", () => {
  inputInfo[0].innerHTML =
    inputInfo[1].innerHTML =
    inputInfo[2].innerHTML =
    inputInfo[3].innerHTML =
      "&nbsp;";
  if (document.activeElement === fname)
    inputInfo[0].innerHTML = "Only characters";
  else if (document.activeElement === lname)
    inputInfo[1].innerHTML = "Only characters";
  else if (document.activeElement === email)
    inputInfo[2].innerHTML = "Must be valid email adress";
  else if (document.activeElement === msg)
    inputInfo[3].innerHTML = "Put your message in here";
});

// if (document.activeElement === fname) console.log("radi");

// fname.addEventListener("focus", () => {
//   inputInfo[0].innerHTML = "Only characters";
// });

// lname.addEventListener("focus", () => {
//   inputInfo[1].innerHTML = "Only characters";
// });
