fetch(
  "https://www.anapioficeandfire.com/api/characters?page=1&pageSize=24&isalive=true"
)
  .then((res) => res.json())
  .then((data) => console.log(data));

var page = 1;

const container = document.getElementById("charContainer");
var filters = "";

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
  data.map((el) => {
    const item = document.createElement("div");
    item.classList.add("item");
    const name = document.createElement("h1");
    name.innerText = el.name ? el.name : el.aliases[0];
    item.appendChild(name);
    container.appendChild(item);
  });
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
  if (male.checked === true) filters = "&gender=male";
  else if (female.checked === true) filters = "&gender=female";
  if (alive.checked === true) filters += "&isalive=true";
  else if (dead.checked == true) filters += "&isalive=false";
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

getCharacters().then((data) => loadCharacters(data));
