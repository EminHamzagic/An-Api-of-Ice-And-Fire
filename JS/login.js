const inputInfo = document.getElementsByClassName("inputInfo");
const username = document.getElementById("username");
const password = document.getElementById("password");
var lan = JSON.parse(localStorage.getItem("language"));

username.addEventListener("focus", () => {
  username.style.borderColor = "rgb(35, 35, 36)";
  inputInfo[0].innerHTML = "&nbsp;";
});

password.addEventListener("focus", () => {
  document.getElementById("inputBox").style.borderColor = "rgb(35, 35, 36)";
  password.style.borderColor = "rgb(35, 35, 36)";
  inputInfo[1].innerHTML = "&nbsp;";
});

const checkLogin = () => {
  lan = JSON.parse(localStorage.getItem("language"));
  if (username.value === "") {
    inputInfo[0].innerHTML = lan
      ? "Field must not be empty"
      : "Polje ne sme biti prazno";
    username.style.borderColor = "red";
  }
  if (password.value === "") {
    inputInfo[1].innerHTML = lan
      ? "Field must not be empty"
      : "Polje ne sme biti prazno";
    document.getElementById("inputBox").style.borderColor = "red";
  }

  if (username.value && password.value) {
    fetch("https://eminhamzagic.github.io/An-Api-of-Ice-And-Fire/accounts.json")
      .then((res) => res.json())
      .then((data) => {
        const inputPassword = hex_md5(password.value);
        var users = data.users;
        users = users.filter((el) => {
          return el.username == username.value;
        });
        if (users.length >= 1) {
          let flag = true;
          for (let i = 0; i < users.length; i++) {
            if (users[i].password == inputPassword) {
              location.href = "home.html";
              flag = !flag;
              localStorage.setItem("loggedIn", true);

              break;
            }
          }
          if (flag) {
            inputInfo[1].innerHTML = lan ? "Wrong password" : "Pogresna sifra";
            document.getElementById("inputBox").style.borderColor = "red";
          }
        } else {
          inputInfo[0].innerHTML = lan
            ? "Wrong username"
            : "Pogresno korisnicko ime";
          username.style.borderColor = "red";
        }
      });
  }
};

username.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkLogin();
});

password.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkLogin();
});

document.getElementById("loginBtn").addEventListener("click", () => {
  checkLogin();
});

const setLan = (state) => {
  if (state) {
    document.getElementById("loginBtn").innerText = "Login";
  } else {
    document.getElementById("loginBtn").innerText = "Prijavi se";
  }
};

setLan(lan);

document.getElementById("language-toggle").addEventListener("click", (e) => {
  setLan(e.target.checked);
});

document.getElementById("showPass").addEventListener("click", () => {
  const btn = document.getElementById("showPass");
  if (btn.classList.contains("fa-eye")) {
    password.type = "text";
    btn.classList.remove("fa-eye");
    btn.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    btn.classList.remove("fa-eye-slash");
    btn.classList.add("fa-eye");
  }
});
