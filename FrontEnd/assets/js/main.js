// recup du token dans le session storage
let token = window.sessionStorage.getItem("token");

//Récupération des fiches eventuellement stockées dans le sessionStorage
let fiches = window.sessionStorage.getItem("fiches");
/******* Variables globaux *******/
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".navigation");

// deconnexion
const deconnect = document.getElementById("logout");
deconnect.addEventListener("click", (event) => {
  window.sessionStorage.clear();
});
//cache filtres si login
if (token) {
  let jsEdition = document.querySelectorAll(".jsEdition");
  for (let i = 0; i < jsEdition.length; i++) {
    jsEdition[i].style.display = null;
  }
  // document.getElementById("filtres").style.display = "none"
  document.getElementById("login").style.display = "none";
}

async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
}
getWorks();

// Récupération des fiches depuis l'api
const askApi = await fetch("http://localhost:5678/api/works");
fiches = await askApi.json();


// Création des Fiches Projets
async function genererFiches(fiches) {

  // Récupération de l'élément du DOM qui accueille les fiches
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = ""

  for (let i = 0; i < fiches.length; i++) {
    const works = fiches[i];

    //création de la balise pour les fiches - balise<figure>
    const ficheElement = document.createElement("figure");
    ficheElement.classList.add("figureGallery")
    ficheElement.dataset.index = works.id

    //Création des images
    const imageElement = document.createElement("img");
    imageElement.src = works.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works.title;

    // On rattache la balise <article> a la <div gallery>
    sectionGallery.appendChild(ficheElement);

    //Rattachement de des balises au DOM
    ficheElement.appendChild(imageElement);
    ficheElement.appendChild(titleElement);
  }
}

//Création des fiches
await genererFiches(fiches);

//Filtres
//***************Affichage des boutons par catégories*************/

//récupérer le tableau des catégories
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

getCategories()

// function qui prend une chaine et la met la première lettre
// en majuscule
function capitalize(myString) {
  const capitalizedString = myString.charAt(0).toUpperCase() + myString.slice(1);
  return capitalizedString;
}

async function displayCategoriesLinks() {
  const categories = await getCategories();
  console.log(categories);
  categories.forEach((category) => {
    const btn = document.createElement("a");
    btn.textContent = capitalize(category.name);
    btn.id = category.id;
    btn.href = "#";
    btn.classList.add("nav_link", category.name.replace(/\s+/g, '-')); // Remplace les espaces par des tirets
    
    filters.appendChild(btn);
});
}

await displayCategoriesLinks();

// filtrer au click sur le bouton par catégorie

async function filterByCategory() {
  const links = document.querySelectorAll(".navigation a");
  console.log('liste des liens: ', links)
  links.forEach((link) => {
      link.addEventListener("click", (e) => {
          e.preventDefault();
          const linkId = e.target.id;
          gallery.innerHTML = "";
          if (linkId !== "0") {
              const worksFilterByCategory = fiches.filter((work) => {
              return work.categoryId == linkId;
              });
              genererFiches(worksFilterByCategory);
              
          } else {
            genererFiches(fiches)
          }
          console.log(linkId);
      });
  });
}

filterByCategory();