// Récupération du token depuis le sessionStorage
let token = window.sessionStorage.getItem("token");

// Récupération des works depuis le sessionStorage
let works = window.sessionStorage.getItem("works");

// Récupération des éléments du DOM pour la galerie et les filtres
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".navigation");

// Ajout d'un écouteur d'événement sur le bouton de déconnexion pour vider le sessionStorage
const deconnect = document.getElementById("logout");
deconnect.addEventListener("click", (event) => {
  window.sessionStorage.clear();
});

// Si un token est présent, on affiche les éléments d'édition et on cache le bouton de connexion
if (token) {
  let jsEdition = document.querySelectorAll(".jsEdition");
  for (let i = 0; i < jsEdition.length; i++) {
    jsEdition[i].style.display = null;
  }
  filters.style.display = "none";
  document.getElementById("login").style.display = "none";
}

// Récupération des works depuis l'API
const askApi = await fetch("http://localhost:5678/api/works");
works = await askApi.json();

// Fonction pour générer les works dans la galerie
async function genererWorks(works) {
  // Récupération de l'élément du DOM qui accueillera les works
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = ""

  // Pour chaque work, on crée une balise <figure> avec une image et un titre
  works.forEach((work) => {
    const ficheElement = document.createElement("figure");
    ficheElement.classList.add("figureGallery")
    ficheElement.dataset.index = works.id

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = work.title;

    sectionGallery.appendChild(ficheElement);
    ficheElement.appendChild(imageElement);
    ficheElement.appendChild(titleElement);
  })
}

// Génération des works
await genererWorks(works);

// Fonction pour récupérer les catégories depuis l'API
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

// Fonction pour mettre la première lettre d'une chaîne en majuscule
function capitalize(myString) {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
}

// Fonction pour afficher les liens de catégories
async function displayCategoriesLinks() {
  const categories = await getCategories();
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

// Fonction pour filtrer les works par catégorie
async function filterByCategory() {
  const links = document.querySelectorAll(".navigation a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Suppression de la classe active de tous les liens
      links.forEach((link) => {
        link.classList.remove("active");
      });

      // Ajout de la classe active au lien cliqué
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
    });
  });
}

filterByCategory();
