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
        console.log(links[1].classList[1])
        // Ajout d'un gestionnaire d'événements click à chaque lien
        links.forEach(link => {
            console.log(link.classList[1])
            link.addEventListener("click", function (event) {
                event.preventDefault();
                // Nous recuperons chaque categorie en fonction de sa clé
                const category = getCategoryByKey(link.classList[1]);
                // Effectuons les conditions sur les catégories
                if (category === "tous") {
                    fetchData(data, null);
                } else {
                    fetchData(data, category);
                }
            });
        });
    });

function getCategoryByKey(key) {
    if (key in links) {
        return links[key];
    } else {
        return null;
    }
}


function capitalize(myString) {
    const capitalizedString = myString.charAt(0).toUpperCase() + myString.slice(1);
    return capitalizedString;
}


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
        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = item.imageUrl;
        // Idem pour le nom ... 
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerHTML = item.title;
        // On rattache la balise article à la section Fiches
        sectionWorks.appendChild(workElement);
        // On rattache l’image à pieceElement (la balise article)
        workElement.appendChild(imageElement);
        workElement.appendChild(figcaptionElement);
    });
}


async function defaultData(data) {
    for (let i = 0; i < data.length; i++) {
        // Récupération de l'élément du DOM qui accueillera les travaux
        const sectionWorks = document.querySelector(".gallery");
        // Création d’une balise dédiée à un travail
        const workElement = document.createElement("figure");
        // On crée l’élément img.
        const imageElement = document.createElement("img");
        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = data[i].imageUrl;
        // Idem pour le nom ... 
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerHTML = data[i].title;
        // On rattache la balise article à la section Fiches
        sectionWorks.appendChild(workElement);
        // On rattache l’image à pieceElement (la balise article)
        workElement.appendChild(imageElement);
        workElement.appendChild(figcaptionElement);
    }
    return sectionWorks
}  