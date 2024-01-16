// fetch("https://eminhamzagic.github.io/An-Api-of-Ice-And-Fire/accounts.json")
//   .then((res) => res.json())
//   .then((data) => (loginData = data));

// var loginData = [];
// hash = hex_md5("genshin123");

const inputInfo = document.getElementsByClassName("inputInfo");
const username = document.getElementById("username");
const password = document.getElementById("password");

username.addEventListener("focus", () => {
  username.style.borderColor = "rgb(35, 35, 36)";
  inputInfo[0].innerHTML = "&nbsp;";
});

password.addEventListener("focus", () => {
  password.style.borderColor = "rgb(35, 35, 36)";
  inputInfo[1].innerHTML = "&nbsp;";
});

document.getElementById("loginBtn").addEventListener("click", () => {
  if (username.value === "") {
    inputInfo[0].innerHTML = "Field must not be empty";
    username.style.borderColor = "red";
  }
  if (password.value === "") {
    inputInfo[1].innerHTML = "Field must not be empty";
    password.style.borderColor = "red";
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
            inputInfo[1].innerHTML = "Wrong password";
            password.style.borderColor = "red";
          }
        } else {
          inputInfo[0].innerHTML = "Wrong username";
          username.style.borderColor = "red";
        }
      });
  }
});
