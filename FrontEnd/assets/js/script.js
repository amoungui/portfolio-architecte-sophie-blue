links = {
    "tous": "Tous",
    "objets": "Objets",
    "appartements": "Appartements",
    "hotels_restaurants": "Hotels & restaurants"
}

// Récupération des travaux depuis l'API
const sectionWorks = document.querySelector(".gallery");
const works = fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Afficher par defaut toutes les données sur les travaux
        defaultData(data);
        // Récupération des liens de navigation
        const links = document.querySelectorAll(".nav_link");
        var all = document.querySelectorAll("tous");
        console.log(links[1].classList[1])
        // Ajout d'un gestionnaire d'événements click à chaque lien
        links.forEach(link => {
            console.log(link.classList[1])
            link.addEventListener("click", function (event) {
                event.preventDefault();
                // Retirer la classe active de tous les liens tous
                for (let j = 0; j < links.length; j++) {
                    links[j].className = links[j].className.replace(" active", "");
                    links[j].classList.remove("active");
                }                
                // Nous recuperons chaque categorie en fonction de sa clé
                const category = getCategoryByKey(link.classList[1]);
                // all.classList.remove("active");
                // Ajouter la classe active au lien cliqué
                this.className += " active";
                // Effectuons les conditions sur les catégories
                if (category === "tous") {
                    fetchData(data, null);
                } else {
                    fetchData(data, category);
                }
            });
        });
    });


// fonction qui prend la class comme clé et retourne la categorie correspondante
// dans le tableau links, tableau qui fait la correspondance 
// entre la class et la categorie    
function getCategoryByKey(key) {
    if (key in links) {
        return links[key];
    } else {
        return null;
    }
}

// function qui prend une chaine et la met la première lettre
// en majuscule
function capitalize(myString) {
    const capitalizedString = myString.charAt(0).toUpperCase() + myString.slice(1);
    return capitalizedString;
}

// function permet de retourner les données de l'API en fonction
// de la categorie qui lui est passée
async function fetchData(data, category) {
    let filteredData;
    if (category !== null) {
        filteredData = data.filter(item => item.category.name === category);
    } else {
        filteredData = data
    }

    // Récupération de l'élément du DOM qui accueillera les travaux
    const sectionWorks = document.querySelector(".gallery");

    // Suppression des travaux existants
    sectionWorks.innerHTML = "";

    // Création d'une balise dédiée à chaque travail
    filteredData.forEach(item => {
        const workElement = document.createElement("figure");
        // On crée l’élément img.
        const imageElement = document.createElement("img");
        // On accède à l’indice i de la liste des travaux pour configurer la source de l’image.
        imageElement.src = item.imageUrl;
        // Idem pour le titre 
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerHTML = item.title;
        // On rattache la balise figure à la section gallery
        sectionWorks.appendChild(workElement);
        // On rattache l’image à workElement (la balise figure)
        workElement.appendChild(imageElement);
        workElement.appendChild(figcaptionElement);
    });
}

// fonction qui affiche la liste de travaux par défaut sur la page d'acceuille
async function defaultData(data) {
    for (let i = 0; i < data.length; i++) {
        // Récupération de l'élément du DOM qui accueillera les travaux
        const sectionWorks = document.querySelector(".gallery");
        // Création d’une balise dédiée à un travail
        const workElement = document.createElement("figure");
        // On crée l’élément img.
        const imageElement = document.createElement("img");
        // On accède à l’indice i de la liste destravaux pour configurer la source de l’image.
        imageElement.src = data[i].imageUrl;
        // Idem pour le nom ... 
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerHTML = data[i].title;
        // On rattache la balise figure à la section gallery
        sectionWorks.appendChild(workElement);
        // On rattache l’image à workElement
        workElement.appendChild(imageElement);
        workElement.appendChild(figcaptionElement);
    }
    return sectionWorks
}  