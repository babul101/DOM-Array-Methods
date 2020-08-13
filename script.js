const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculateWealth = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Fetching random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Doubling the money
function getDouble() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Show only Millionaires
function sortMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// Callculate
function calculate() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

// Updating the DOM
function updateDOM(providedData = data) {
  // Clearing the DIV
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// format the money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners

addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", getDouble);
sort.addEventListener("click", sortByRichest);
showMillionaires.addEventListener("click", sortMillionaires);
calculateWealth.addEventListener("click", calculate);
