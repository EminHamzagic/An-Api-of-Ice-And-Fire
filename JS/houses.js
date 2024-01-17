if (!localStorage.getItem("loggedIn")) {
  location.href = "login.html";
}

var page = 1;
var housesRaw = [];

var lan = JSON.parse(localStorage.getItem("language"));
const container = document.getElementById("housesContainer");
const loadingScreen = document.getElementById("loading");
var filters = "";

async function getHouses() {
  const res = await fetch(
    `https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=18` +
      filters
  );
  const data = await res.json();
  return data;
}

const loadHouses = (data) => {
  container.innerHTML = "";
  housesRaw = data;
  loadingScreen.style.display = "none";
  data.map((el, i) => {
    const item = document.createElement("div");
    item.classList.add("item");
    const name = document.createElement("h1");
    name.innerText = el.name;
    item.addEventListener("click", () => {
      showInfo(housesRaw[i]);
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

const showInfo = (house) => {
  const info = document.getElementById("info");
  info.classList.toggle("active");
  const infoCon = document.getElementById("infoCon");
  const name = document.getElementById("infoTitle");
  name.innerText = house.name;
  Promise.all(
    house.cadetBranches.map((branch) => fetch(branch).then((r) => r.json()))
  ).then((branches) => {
    createInfoData(house, branches);
  });
};

const createInfoData = (house, branches) => {
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
  const words = document.createElement("p");
  words.innerText = `Words: ${house.words ? house.words : "No data"}`;
  words.classList.add("en", lan ? "&nbsp;" : "unactive");
  const currLord = document.createElement("p");
  const currLord1 = document.createElement("p");
  if (house.currentLord) {
    fetch(house.currentLord)
      .then((res) => res.json())
      .then((data) => {
        currLord.innerText = `Current Lord: ${data.name}`;
        currLord1.innerText = `Trenutni Lord: ${data.name}`;
      });
  } else {
    currLord.innerText = "Current Lord: No data";
    currLord1.innerText = "Trenutni Lord: Nema podataka";
  }
  currLord.classList.add("en", lan ? "&nbsp;" : "unactive");
  currLord1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const founder = document.createElement("p");
  const founder1 = document.createElement("p");
  if (house.founder) {
    fetch(house.founder)
      .then((res) => res.json())
      .then((data) => {
        founder.innerText = `Founder: ${data.name}`;
        founder1.innerText = `Osnivac: ${data.name}`;
      });
  } else {
    founder.innerText = "Founder: No data";
    founder1.innerText = "Osnivac: Nema podataka";
  }
  founder.classList.add("en", lan ? "&nbsp;" : "unactive");
  founder1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const diedOut = document.createElement("p");
  diedOut.innerText = `Died out: ${house.diedOut ? house.diedOut : "No data"}`;
  diedOut.classList.add("en", lan ? "&nbsp;" : "unactive");
  const founded = document.createElement("p");
  founded.innerText = `Founded: ${house.founded ? house.founded : "No data"}`;
  founded.classList.add("en", lan ? "&nbsp;" : "unactive");

  //Srpski jezik
  const words1 = document.createElement("p");
  words1.innerText = `Reci: ${house.words ? house.words : "Nema podataka"}`;
  words1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const diedOut1 = document.createElement("p");
  diedOut1.innerText = `Izumrla: ${
    house.diedOut ? house.diedOut : "Nema podataka"
  }`;
  diedOut1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const founded1 = document.createElement("p");
  founded1.innerText = `Osnovana: ${
    house.founded ? house.founded : "Nema podataka"
  }`;
  founded1.classList.add("sr", lan ? "unactive" : "&nbsp;");

  infoP1.append(
    words,
    currLord,
    founder,
    diedOut,
    founded,
    words1,
    currLord1,
    founder1,
    diedOut1,
    founded1
  );

  //Engleski jezik
  const heir = document.createElement("p");
  const heir1 = document.createElement("p");
  if (house.heir) {
    fetch(house.heir)
      .then((res) => res.json())
      .then((data) => {
        heir.innerText = `Heir: ${data.name}`;
        heir1.innerText = `Naslednik: ${data.name}`;
      });
  } else {
    heir.innerText = "Heir: No data";
    heir1.innerText = "Naslednik: Nema podataka";
  }
  heir.classList.add("en", lan ? "&nbsp;" : "unactive");
  heir1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const overlord = document.createElement("p");
  const overlord1 = document.createElement("p");
  if (house.overlord) {
    fetch(house.overlord)
      .then((res) => res.json())
      .then((data) => {
        overlord.innerText = `Overlord: ${data.name}`;
        overlord1.innerText = `Vrhovni gospodar: ${data.name}`;
      });
  } else {
    overlord.innerText = "Overlord: No data";
    overlord1.innerText = "Vrhovni gospodar: Nema podataka";
  }
  overlord.classList.add("en", lan ? "&nbsp;" : "unactive");
  overlord1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const cBranches = document.createElement("p");
  let branchesNames = [];
  branches.map((branch) => {
    branchesNames.push(branch.name);
  });
  cBranches.innerText = `Cadet branches: ${
    branchesNames.length === 0 ? "No data" : branchesNames.toString()
  }`;
  cBranches.classList.add("en", lan ? "&nbsp;" : "unactive");
  const aWeapons = document.createElement("p");
  aWeapons.innerHTML = `Ancestral Weapons: ${
    house.ancestralWeapons[0] === ""
      ? "No data"
      : house.ancestralWeapons.toString()
  }`;
  aWeapons.classList.add("en", lan ? "&nbsp;" : "unactive");
  const region = document.createElement("p");
  region.innerText = `Region: ${house.region}`;
  region.classList.add("en", lan ? "&nbsp;" : "unactive");

  //Srpski jezik
  const cBranches1 = document.createElement("p");
  cBranches1.innerText = `Podgrane kuce: ${
    branchesNames.length === 0 ? "Nema podataka" : branchesNames.toString()
  }`;
  cBranches1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const aWeapons1 = document.createElement("p");
  aWeapons1.innerHTML = `Oruzje predaka: ${
    house.ancestralWeapons[0] === ""
      ? "Nema podataka"
      : house.ancestralWeapons.toString()
  }`;
  aWeapons1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const region1 = document.createElement("p");
  region1.innerText = `Region: ${house.region}`;
  region1.classList.add("sr", lan ? "unactive" : "&nbsp;");

  infoP2.append(
    heir,
    overlord,
    cBranches,
    aWeapons,
    region,
    heir1,
    overlord1,
    cBranches1,
    aWeapons1,
    region1
  );

  //Engleski jezik
  const seats = document.createElement("p");
  seats.innerText = `Seats: ${
    house.seats[0] === "" ? "No data" : house.seats.toString()
  }`;
  seats.classList.add("en", lan ? "&nbsp;" : "unactive");
  const titles = document.createElement("p");
  titles.innerText = `Titles: ${
    house.titles[0] === "" ? "No data" : house.titles.toString()
  }`;
  titles.classList.add("en", lan ? "&nbsp;" : "unactive");
  const cOfArms = document.createElement("p");
  cOfArms.innerText = `Coat of arms: ${
    house.coatOfArms ? house.coatOfArms : "No data"
  }`;
  cOfArms.classList.add("en", lan ? "&nbsp;" : "unactive");

  //Srpski jezik
  const seats1 = document.createElement("p");
  seats1.innerText = `Sedista: ${
    house.seats[0] === "" ? "Nema podataka" : house.seats.toString()
  }`;
  seats1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const titles1 = document.createElement("p");
  titles1.innerText = `Titule: ${
    house.titles[0] === "" ? "Nema podataka" : house.titles.toString()
  }`;
  titles1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  const cOfArms1 = document.createElement("p");
  cOfArms1.innerText = `Grb: ${
    house.coatOfArms ? house.coatOfArms : "Nema podataka"
  }`;
  cOfArms1.classList.add("sr", lan ? "unactive" : "&nbsp;");
  infoP3.append(seats, titles, cOfArms, seats1, titles1, cOfArms1);

  infoCon.append(infoP1, infoP2, infoP3);
};

document.getElementById("prev").addEventListener("click", () => {
  if (page > 1) {
    page--;
    getHouses().then((data) => loadHouses(data));
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (housesRaw.length === 18) {
    page++;
    getHouses().then((data) => loadHouses(data));
  }
});

const yword = document.getElementById("ywords");
const nword = document.getElementById("nwords");
const ytitle = document.getElementById("ytitle");
const ntitle = document.getElementById("ntitle");
const yseat = document.getElementById("yseats");
const nseat = document.getElementById("nseats");
const ydiedOut = document.getElementById("ydiedOut");
const ndiedOut = document.getElementById("ndiedOut");
const yawpn = document.getElementById("yawpn");
const nawpn = document.getElementById("nawpn");

document.getElementById("apply").addEventListener("click", () => {
  let word = "",
    title = "",
    seat = "",
    dOut = "",
    wpn = "";
  if (yword.checked === true) word = "&hasWords=true";
  else if (nword.checked === true) word = "&hasWords=false";
  if (ytitle.checked === true) title = "&hasTitles=true";
  else if (ntitle.checked === true) title = "&hasTitles=false";
  if (yseat.checked === true) seat = "&hasSeats=true";
  else if (nseat.checked === true) seat = "&hasSeats=false";
  if (ydiedOut.checked === true) dOut = "&hasDiedOut=true";
  else if (ndiedOut.checked === true) dOut = "&hasDiedOut=false";
  if (yawpn.checked === true) wpn = "&hasAncestralWeapons=true";
  else if (nawpn.checked === true) wpn = "&hasAncestralWeapons=false";
  filters = word + title + seat + dOut + wpn;
  getHouses().then((data) => loadHouses(data));
});

document.getElementById("reset").addEventListener("click", () => {
  filters = "";
  yword.checked = false;
  nword.checked = false;
  ytitle.checked = false;
  ntitle.checked = false;
  yseat.checked = false;
  nseat.checked = false;
  ydiedOut.checked = false;
  ndiedOut.checked = false;
  yawpn.checked = false;
  nawpn.checked = false;
  getHouses().then((data) => loadHouses(data));
});

getHouses().then((data) => loadHouses(data));

const setLan = (state) => {
  if (state) {
    document.getElementById("btn").innerText = "Filters";
    document.getElementById("next").innerText = "Next";
    document.getElementById("prev").innerText = "Prev";
    document.getElementById("apply").innerText = "Apply";
    document.getElementById("reset").innerText = "Reset";
  } else {
    document.getElementById("btn").innerText = "Filteri";
    document.getElementById("next").innerText = "Sledeca";
    document.getElementById("prev").innerText = "Prethodna";
    document.getElementById("apply").innerText = "Primeni";
    document.getElementById("reset").innerText = "Resetuj";
  }
};

setLan(lan);

document.getElementById("language-toggle").addEventListener("click", (e) => {
  setLan(e.target.checked);
});
