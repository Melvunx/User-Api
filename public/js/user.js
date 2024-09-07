const cardContent = document.querySelector("div.card-content");

const arrayImg = [
  "desert.jpg",
  "hills.jpg",
  "beach.jpg",
  "savana.avif",
  "taïga.jpg",
  "cerisier.avif",
  "forest.webp",
  "jungle.webp",
];

const sortedImg = arrayImg.sort();

const randomImage = (array) => {
  let path = "./public/img/";
  let randomIndex = Math.floor(Math.random() * array.length);
  // console.log("index: ", randomIndex);
  let image = path + array[randomIndex];
  // console.log("Image choisie: ", image);
  return image;
};

let userData = [];

async function fetchUser() {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData[0]);
}

async function userDisplay() {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);
    let diffDay = Math.ceil(Math.abs(todayTimestamp - timestamp) / 8.64e7);

    return diffDay;
  };

  document.body.innerHTML = userData
    .map(
      (user) =>
        // <img src="${randomImage(sortedImg)}" alt ="Image de fond">
        `
    <div class="card">
    <div class="card-content">
        <div class="card-img">
          <img src="${user.picture.large}" alt="Image de ${user.name.last}">
        </div>
        <h3>${user.name.first}</h3>
        <p class="nat">Nationalité : ${user.nat}</p>
        <div class="cordonate">
          <p>${user.location.country}</p>
          <p>${user.location.city}</p>
          <p>Téléphone : ${user.cell.split("-").join("  ")}</p>
          <p>${user.email}</p>
        </div>
        <p>${dateParser(user.dob.date)}</p>
        <p>Membre depuis ${dayCalc(user.registered.date)} jours</p>
      </div>
    </div>
    `
    )
    .sort()
    .join(" ");

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.backgroundImage = `url('${randomImage(sortedImg)}')`;
    card.style.backgroundPosition = "center";
    card.style.backgroundSize = "cover";
  });
}
//${}
userDisplay();
