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
  infoContainer.innerHTML = `<div id="loadingInfo"><div class="lds-dual-ring"></div></div>`;
  infoBox.appendChild(infoTitle);
  infoBox.appendChild(infoContainer);
  container.appendChild(infoBox);
  document.getElementById("closeBtn").addEventListener("click", () => {
    const info = document.getElementById("info");
    info.classList.toggle("active");
    infoContainer.classList.toggle("active");
  });
};

const showInfo = (char) => {
  const info = document.getElementById("info");
  info.classList.toggle("active");
  const infoCon = document.getElementById("infoCon");
  const name = document.getElementById("infoTitle");
  name.innerText = char.name ? char.name : '"' + char.aliases[0] + '"';
  Promise.all(char.books.map((book) => fetch(book).then((r) => r.json()))).then(
    (books) => {
      Promise.all(
        char.allegiances.map((alleg) => fetch(alleg).then((r) => r.json()))
      ).then((allegiances) => {
        Promise.all(
          char.povBooks.map((povBook) => fetch(povBook).then((r) => r.json()))
        ).then((povBooks) => {
          if (char.spouse)
            fetch(char.spouse)
              .then((res) => res.json())
              .then((data) => {
                createInfoData(char, books, allegiances, povBooks, data.name);
              });
          else createInfoData(char, books, allegiances, povBooks, "No data");
        });
      });
    }
  );
};

const createInfoData = (char, books, allegiances, povBooks, Dspouse) => {
  const infoCon = document.getElementById("infoCon");
  infoCon.innerHTML = "";
  infoCon.classList.toggle("active");

  const infoP1 = document.createElement("div");
  infoP1.setAttribute("id", "infoP1");
  const infoP2 = document.createElement("div");
  infoP2.setAttribute("id", "infoP2");
  const infoP3 = document.createElement("div");
  infoP3.setAttribute("id", "infoP3");

  const alias = document.createElement("p");
  alias.innerText = `Aliases: ${
    char.aliases[0] === "" ? "No data" : char.aliases.toString()
  }`;
  const born = document.createElement("p");
  born.innerText = `Born: ${char.born ? char.born : "No data"}`;
  const died = document.createElement("p");
  died.innerText = `Died: ${char.died ? char.died : "No data"}`;
  const gender = document.createElement("p");
  gender.innerText = `Gender: ${char.gender ? char.gender : "No data"}`;
  const culture = document.createElement("p");
  culture.innerText = `Culture: ${char.culture ? char.culture : "No data"}`;
  infoP1.append(alias, born, died, gender, culture);

  const father = document.createElement("p");
  if (char.father) {
    fetch(char.father)
      .then((res) => res.json())
      .then((data) => (father.innerText = `Father: ${data.name}`));
  } else father.innerText = `Father: No data`;
  const mother = document.createElement("p");
  if (char.mother) {
    fetch(char.mother)
      .then((res) => res.json())
      .then((data) => (mother.innerText = `Mother: ${data.name}`));
  } else mother.innerText = `Mother: No data`;
  const spouse = document.createElement("p");
  spouse.innerText = `Spouse: ${Dspouse}`;
  const titles = document.createElement("p");
  titles.innerText = `Titles: ${
    char.titles[0] === "" ? "None" : char.titles.toString()
  }`;
  const playedBy = document.createElement("p");
  playedBy.innerText = `Played by: ${
    char.playedBy[0] === "" ? "No data" : char.playedBy.toString()
  }`;
  infoP2.append(father, mother, spouse, titles, playedBy);

  const pAllegiances = document.createElement("p");
  let allegiancesArr = [];
  if (allegiances.length > 0) {
    for (let i = 0; i < allegiances.length; i++)
      allegiancesArr.push(allegiances[i].name);
  }
  pAllegiances.innerText = `Allegiances: ${
    allegiances.length === 0 ? "No data" : allegiancesArr.toString()
  }`;
  const appearsIn = document.createElement("p");
  let booksArr = [];
  for (let i = 0; i < books.length; i++) booksArr.push(books[i].name);
  appearsIn.innerText = `Appears in: ${booksArr.toString()}`;
  const povbook = document.createElement("p");
  let povBooksArr = [];
  for (let i = 0; i < povBooks.length; i++) povBooksArr.push(povBooks[i].name);
  povbook.innerText = `Pov books: ${
    povBooks.length === 0 ? "No data" : povBooksArr.toString()
  }`;
  const tv = document.createElement("p");
  tv.innerText = `Tv Series Appearances: ${char.tvSeries.toString()}`;
  infoP3.append(pAllegiances, appearsIn, povbook, tv);

  infoCon.append(infoP1, infoP2, infoP3);
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
