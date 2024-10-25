const mainContainer = document.querySelector(".main-container");
const btnGenerate = document.querySelector(".btn-generate");
btnGenerate.addEventListener("click", assembleDataCard);

async function fetchData() {
  try {
    const reponse = await fetch("https://randomuser.me/api/");
    const data = await reponse.json();
    console.log(data.results[0]);
    return data.results[0];
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

function createUserCard(data) {
  clearContainer();

  const userAvatar = document.createElement("img");
  userAvatar.classList.add("user-avatar");
  userAvatar.setAttribute("src", data.picture.large);

  const userGreeting = document.createElement("p");
  userGreeting.classList.add("user-greeting");
  userGreeting.textContent = "Hi, My name is";

  const userName = document.createElement("p");
  userName.classList.add("user-name");
  userName.textContent = `${data.name.first} ${data.name.last}`;

  const divUserData = document.createElement("div");
  divUserData.classList.add("user-data");

  const staticList = document.createElement("ul");
  staticList.classList.add("static-list");

  const staticItemDOB = document.createElement("li");
  staticItemDOB.classList.add("item");
  staticItemDOB.classList.add("static-item");
  staticItemDOB.textContent = "DOB";

  const staticItemAge = document.createElement("li");
  staticItemAge.classList.add("item");
  staticItemAge.classList.add("static-item");
  staticItemAge.textContent = "Age";

  const staticItemEmail = document.createElement("li");
  staticItemEmail.classList.add("item");
  staticItemEmail.classList.add("static-item");
  staticItemEmail.textContent = "Email";

  const staticItemCountry = document.createElement("li");
  staticItemCountry.classList.add("item");
  staticItemCountry.classList.add("static-item");
  staticItemCountry.textContent = "Country";

  const staticItemCity = document.createElement("li");
  staticItemCity.classList.add("item");
  staticItemCity.classList.add("static-item");
  staticItemCity.textContent = "City";

  staticList.append(
    staticItemDOB,
    staticItemAge,
    staticItemEmail,
    staticItemCountry,
    staticItemCity
  );

  const dynamicList = document.createElement("ul");
  dynamicList.classList.add("dynamic-list");

  const dynamicItemDOB = document.createElement("li");
  dynamicItemDOB.classList.add("item");
  dynamicItemDOB.classList.add("dynamic-item");
  dynamicItemDOB.textContent = `${getDateOfBirth(data)}`;

  const dynamicItemAge = document.createElement("li");
  dynamicItemAge.classList.add("item");
  dynamicItemAge.classList.add("dynamic-item");
  dynamicItemAge.textContent = `${data.dob.age}`;

  const dynamicItemEmail = document.createElement("li");
  dynamicItemEmail.classList.add("item");
  dynamicItemEmail.classList.add("dynamic-item");
  dynamicItemEmail.textContent = `${data.email}`;

  const dynamicItemCountry = document.createElement("li");
  dynamicItemCountry.classList.add("item");
  dynamicItemCountry.classList.add("dynamic-item");
  dynamicItemCountry.textContent = `${data.location.country}`;

  const dynamicItemCity = document.createElement("li");
  dynamicItemCity.classList.add("item");
  dynamicItemCity.classList.add("dynamic-item");
  dynamicItemCity.textContent = `${data.location.city}`;

  dynamicList.append(
    dynamicItemDOB,
    dynamicItemAge,
    dynamicItemEmail,
    dynamicItemCountry,
    dynamicItemCity
  );

  divUserData.appendChild(staticList);
  divUserData.appendChild(dynamicList);

  mainContainer.appendChild(userAvatar);
  mainContainer.appendChild(userGreeting);
  mainContainer.appendChild(userName);
  mainContainer.appendChild(divUserData);
}

function errorHandler(error) {
  clearContainer();

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = error;

  mainContainer.appendChild(errorMessage);
}

function clearContainer() {
  while (mainContainer.hasChildNodes()) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

function getDateOfBirth(data) {
  const fullDate = new Date(data.dob.date);
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth();
  const date = fullDate.getDate();
  return `${date} / ${month} / ${year}`;
}

async function assembleDataCard() {
  try {
    const userData = await fetchData();
    createUserCard(userData);
  } catch (error) {
    errorHandler(error);
  }
}

assembleDataCard();
