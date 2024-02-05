/******* Variables globaux *******/
// recup du token dans le session storage
let token = window.sessionStorage.getItem("token");

//Récupération des fiches eventuellement stockées dans le sessionStorage
let works = window.sessionStorage.getItem("works");
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

// Récupération des fiches depuis l'api
const askApi = await fetch("http://localhost:5678/api/works");
works = await askApi.json();


// Création des Fiches Projets
async function genererWorks(works) {

  // Récupération de l'élément du DOM qui accueille les fiches
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = ""

  works.forEach((work) => {
    //création de la balise pour les fiches - balise<figure>
    const ficheElement = document.createElement("figure");
    ficheElement.classList.add("figureGallery")
    ficheElement.dataset.index = works.id

    //Création des images
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = work.title;

    // On rattache la balise <article> a la <div gallery>
    sectionGallery.appendChild(ficheElement);

    //Rattachement de des balises au DOM
    ficheElement.appendChild(imageElement);
    ficheElement.appendChild(titleElement);
  })
}

//Création des fiches
await genererWorks(works);

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

          // Supprimer la classe active de tous les liens
          links.forEach((link) => {
            link.classList.remove("active");
          });

          // Ajouter la classe active au lien cliqué
          e.target.classList.add("active");

          const linkId = e.target.id;
          gallery.innerHTML = "";
          if (linkId !== "0") {
              const worksFilterByCategory = works.filter((work) => {
              return work.categoryId == linkId;
              });
              genererWorks(worksFilterByCategory);
              
          } else {
            genererWorks(works)
          }
          console.log(linkId);
      });
  });
}

filterByCategory();
