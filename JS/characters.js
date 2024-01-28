localStorage.setItem("page", "characters");

if (!localStorage.getItem("loggedIn")) {
  location.href = "login.html";
}

var page = 1;

const container = document.getElementById("charContainer");
var lan = JSON.parse(localStorage.getItem("language"));
var filters = "";
var charactersRaw = [];

async function getCharacters() {
  const res = await fetch(
    `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=30` +
      filters
  );

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
      document.documentElement.classList.toggle("lockScroll");
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
    infoContainer.classList.toggle("active");
    document.documentElement.classList.toggle("lockScroll");
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

  //Engleski jezik
  const alias = document.createElement("p");
  alias.innerText = `Aliases: ${
    char.aliases[0] === "" ? "No data" : char.aliases.toString()
  }`;
  alias.classList.add("en", lan ? "&nbsp;" : "unactive");
  const born = document.createElement("p");
  born.innerText = `Born: ${char.born ? char.born : "No data"}`;
  born.classList.add("en", lan ? "&nbsp;" : "unactive");
  const died = document.createElement("p");
  died.innerText = `Died: ${char.died ? char.died : "No data"}`;
  died.classList.add("en", lan ? "&nbsp;" : "unactive");
  const gender = document.createElement("p");
  gender.innerText = `Gender: ${char.gender ? char.gender : "No data"}`;
  gender.classList.add("en", lan ? "&nbsp;" : "unactive");
  const culture = document.createElement("p");
  culture.innerText = `Culture: ${char.culture ? char.culture : "No data"}`;
  culture.classList.add("en", lan ? "&nbsp;" : "unactive");

  //Srpski jezik
  const alias1 = document.createElement("p");
  alias1.innerText = `Alijasi: ${
    char.aliases[0] === "" ? "Nema podataka" : char.aliases.toString()
  }`;
  alias1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const born1 = document.createElement("p");
  born1.innerText = `Rodjen: ${char.born ? char.born : "Nema podataka"}`;
  born1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const died1 = document.createElement("p");
  died1.innerText = `Umro: ${char.died ? char.died : "Nema podataka"}`;
  died1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const gender1 = document.createElement("p");
  gender1.innerText = `Pol: ${char.gender ? char.gender : "Nema podataka"}`;
  gender1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const culture1 = document.createElement("p");
  culture1.innerText = `Kultura: ${
    char.culture ? char.culture : "Nema podataka"
  }`;
  culture1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  infoP1.append(
    alias,
    born,
    died,
    gender,
    culture,
    alias1,
    born1,
    died1,
    gender1,
    culture1
  );

  //Engleski jezik
  const father = document.createElement("p");
  const father1 = document.createElement("p");
  if (char.father) {
    fetch(char.father)
      .then((res) => res.json())
      .then((data) => {
        father.innerText = `Father: ${data.name}`;
        father1.innerText = `Otac: ${data.name}`;
      });
  } else {
    father.innerText = `Father: No data`;
    father1.innerText = `Otac: Nema podataka`;
  }
  father.classList.add("en", lan ? "&nbsp;" : "unactive");
  father1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const mother = document.createElement("p");
  const mother1 = document.createElement("p");
  if (char.mother) {
    fetch(char.mother)
      .then((res) => res.json())
      .then((data) => {
        mother.innerText = `Mother: ${data.name}`;
        mother1.innerText = `Majka: ${data.name}`;
      });
  } else {
    mother.innerText = `Mother: No data`;
    mother1.innerText = `Majka: Nema podataka`;
  }
  mother.classList.add("en", lan ? "&nbsp;" : "unactive");
  mother1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const spouse = document.createElement("p");
  spouse.innerText = `Spouse: ${Dspouse}`;
  spouse.classList.add("en", lan ? "&nbsp;" : "unactive");
  const titles = document.createElement("p");
  titles.innerText = `Titles: ${
    char.titles[0] === "" ? "None" : char.titles.toString()
  }`;
  titles.classList.add("en", lan ? "&nbsp;" : "unactive");
  const playedBy = document.createElement("p");
  playedBy.innerText = `Played by: ${
    char.playedBy[0] === "" ? "No data" : char.playedBy.toString()
  }`;
  playedBy.classList.add("en", lan ? "&nbsp;" : "unactive");

  //Srpski jezik
  const spouse1 = document.createElement("p");
  spouse1.innerText = `Bracni par: ${Dspouse}`;
  spouse1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const titles1 = document.createElement("p");
  titles1.innerText = `Titule: ${
    char.titles[0] === "" ? "None" : char.titles.toString()
  }`;
  titles1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const playedBy1 = document.createElement("p");
  playedBy1.innerText = `Igra: ${
    char.playedBy[0] === "" ? "No data" : char.playedBy.toString()
  }`;
  playedBy1.classList.add("sr", lan ? "unactive" : "&nbsp;");

  infoP2.append(
    father,
    mother,
    spouse,
    titles,
    playedBy,
    father1,
    mother1,
    spouse1,
    titles1,
    playedBy1
  );

  //Engleski jezik
  const pAllegiances = document.createElement("p");
  let allegiancesArr = [];
  if (allegiances.length > 0) {
    for (let i = 0; i < allegiances.length; i++)
      allegiancesArr.push(allegiances[i].name);
  }
  pAllegiances.innerText = `Allegiances: ${
    allegiances.length === 0 ? "No data" : allegiancesArr.toString()
  }`;
  pAllegiances.classList.add("en", lan ? "&nbsp;" : "unactive");
  const appearsIn = document.createElement("p");
  let booksArr = [];
  for (let i = 0; i < books.length; i++) booksArr.push(books[i].name);
  appearsIn.innerText = `Appears in: ${booksArr.toString()}`;
  appearsIn.classList.add("en", lan ? "&nbsp;" : "unactive");
  const povbook = document.createElement("p");
  let povBooksArr = [];
  for (let i = 0; i < povBooks.length; i++) povBooksArr.push(povBooks[i].name);
  povbook.innerText = `Pov books: ${
    povBooks.length === 0 ? "No data" : povBooksArr.toString()
  }`;
  povbook.classList.add("en", lan ? "&nbsp;" : "unactive");
  const tv = document.createElement("p");
  tv.innerText = `Tv Series Appearances: ${
    char.tvSeries[0] === "" ? "None" : char.tvSeries.toString()
  }`;
  tv.classList.add("en", lan ? "&nbsp;" : "unactive");

  //Srpski jezik
  const pAllegiances1 = document.createElement("p");
  pAllegiances1.innerText = `Odanosti: ${
    allegiances.length === 0 ? "Nema podataka" : allegiancesArr.toString()
  }`;
  pAllegiances1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const appearsIn1 = document.createElement("p");
  appearsIn1.innerText = `Pojavljuje se u: ${booksArr.toString()}`;
  appearsIn1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const povbook1 = document.createElement("p");
  povbook1.innerText = `Pov knjige: ${
    povBooks.length === 0 ? "Nema podataka" : povBooksArr.toString()
  }`;
  povbook1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const tv1 = document.createElement("p");
  tv1.innerText = `Pojavljivanja u TV seriji: ${
    char.tvSeries[0] === "" ? "Nema" : char.tvSeries.toString()
  }`;
  tv1.classList.add("sr", lan ? "unactive" : "&nbsp;");

  infoP3.append(
    pAllegiances,
    appearsIn,
    povbook,
    tv,
    pAllegiances1,
    appearsIn1,
    povbook1,
    tv1
  );

  infoCon.append(infoP1, infoP2, infoP3);
};

document.getElementById("prev").addEventListener("click", () => {
  if (page > 1) {
    page--;
    getCharacters().then((data) => loadCharacters(data));
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (charactersRaw.length === 30) {
    page++;
    getCharacters().then((data) => loadCharacters(data));
  }
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

const setLan = (state) => {
  if (state) {
    document.getElementById("btn").innerText = "Filters";
    document.getElementById("next").innerText = "Next";
    document.getElementById("prev").innerText = "Prev";
  } else {
    document.getElementById("btn").innerText = "Filteri";
    document.getElementById("next").innerText = "Sledeca";
    document.getElementById("prev").innerText = "Prethodna";
  }
};

setLan(lan);

document.getElementById("language-toggle").addEventListener("click", (e) => {
  setLan(e.target.checked);
});
