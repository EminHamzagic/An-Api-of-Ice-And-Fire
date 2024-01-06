fetch(
  "https://www.anapioficeandfire.com/api/characters?page=1&pageSize=24&isalive=true"
)
  .then((res) => res.json())
  .then((data) => console.log(data));

var page = 1;

const container = document.getElementById("charContainer");
var filters = "";
var charactersRaw = [];

async function getCharacters() {
  const res = await fetch(
    `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=24` +
      filters
  );
  console.log(filters);
  const data = await res.json();
  return data;
}

const loadCharacters = (data) => {
  container.innerHTML = "";
  charactersRaw = data;
  loadingScreen.style.display = "none";
  data.map((el, i) => {
    const item = document.createElement("div");
    item.classList.add("item");
    const name = document.createElement("h1");
    name.innerText = el.name ? el.name : '"' + el.aliases[0] + '"';
    item.addEventListener("click", () => {
      showInfo(charactersRaw[i]);
    });
    item.appendChild(name);
    container.appendChild(item);
  });
  const infoBox = document.createElement("div");
  infoBox.setAttribute("id", "info");
  infoBox.innerHTML = `<div id="closeBtn">
  <span class="bar"></span>
  <span class="bar"></span>
  </div>`;
  const infoTitle = document.createElement("h1");
  infoTitle.setAttribute("id", "infoTitle");
  const infoContainer = document.createElement("div");
  infoContainer.setAttribute("id", "infoCon");
  infoBox.appendChild(infoTitle);
  infoBox.appendChild(infoContainer);
  container.appendChild(infoBox);
  document.getElementById("closeBtn").addEventListener("click", () => {
    const info = document.getElementById("info");
    info.classList.toggle("active");
  });
};

const showInfo = (char) => {
  const info = document.getElementById("info");
  info.classList.toggle("active");
  const infoCon = document.getElementById("infoCon");
  infoCon.innerHTML = "";
  const name = document.getElementById("infoTitle");
  name.innerText = char.name ? char.name : '"' + char.aliases[0] + '"';
  Promise.all(char.books.map((book) => fetch(book).then((r) => r.json()))).then(
    (books) => {
      Promise.all(
        char.allegiances.map((alleg) => fetch(alleg).then((r) => r.json()))
      ).then((allegiances) => {
        const alias = document.createElement("p");
        alias.innerText = `Aliases: ${
          char.aliases[0] === "" ? "No data" : char.aliases.toString()
        }`;

        const bron = document.createElement("p");
        bron.innerText = `Born: ${char.born ? "No data" : char.born}`;
        const died = document.createElement("p");
        died.innerText = `Died: ${char.died ? "No data" : char.died}`;
      });
    }
  );
};

document.getElementById("prev").addEventListener("click", () => {
  if (page > 1) {
    page--;
    getCharacters().then((data) => loadCharacters(data));
  }
});

document.getElementById("next").addEventListener("click", () => {
  page++;
  getCharacters().then((data) => loadCharacters(data));
});

document.getElementById("filterToggle").addEventListener("click", (e) => {
  document.getElementById("fil").classList.toggle("active");
  e.preventDefault();
});

const male = document.getElementById("male");
const female = document.getElementById("female");
const alive = document.getElementById("alive");
const dead = document.getElementById("dead");

document.getElementById("apply").addEventListener("click", () => {
  let gender = "",
    status = "";
  if (male.checked === true) gender = "&gender=male";
  else if (female.checked === true) gender = "&gender=female";
  if (alive.checked === true) status = "&isalive=true";
  else if (dead.checked == true) status = "&isalive=false";
  filters = gender + status;
  getCharacters().then((data) => {
    loadCharacters(data);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  filters = "";
  male.checked = false;
  female.checked = false;
  alive.checked = false;
  dead.checked = false;
  getCharacters().then((data) => loadCharacters(data));
});

const loadingScreen = document.getElementById("loading");

getCharacters().then((data) => loadCharacters(data));
