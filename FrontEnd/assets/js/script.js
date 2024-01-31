// Récupération des fiches eventuellement stockées dans le sessionStorage
let works = window.sessionStorage.getItem("works");

links = {
    "tous": "Tous",
    "objets": "Objets",
    "appartements": "Appartements",
    "hotels_restaurants": "Hotels & restaurants"
}

// Récupération des travaux depuis l'API
const sectionWorks = document.querySelector(".gallery");
works = fetch('http://localhost:5678/api/works')
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
                // Ajouter la classe active au lien cliqué
                this.className += " active";
                // Effectuons les conditions sur les catégories
                if (category === "Tous") {
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

// Fonction pour vérifier l'état de connexion
function checkLoginStatus() {
    const login_value = document.querySelector(".nav_menu.login");
    const logout_value = document.querySelector(".nav_menu.logout_hidden");
    const modify_action = document.querySelector(".js-modal1.modify_action");
    const js_edition = document.querySelector(".js-edition.mask_barre_hidden");
    
    if(localStorage.getItem("auth")) {
        // Si l'utilisateur est connecté
        logout_value.classList.remove("logout_hidden");
        modify_action.classList.remove("modify_hidden");
        js_edition.classList.remove("mask_barre_hidden");
        login_value.classList.add("login_hidden");
    } else {
        // Si l'utilisateur n'est pas connecté
        login_value.classList.remove("login_hidden");
        modify_action.classList.add("modify_hidden");
        logout_value.classList.add("logout_hidden");
        js_edition.classList.add("mask_barre_hidden");
    }
}

// Appeler la fonction chaque fois que la page est chargée
window.onload = checkLoginStatus;

// Ajouter un écouteur d'événements pour le bouton de déconnexion
const logout = document.querySelector(".nav_menu.logout_hidden");
logout.addEventListener("click", function (event) {
    //event.preventDefault();
    // event.stopPropagation(); // Empêche la propagation de l'événement
    localStorage.clear();
    checkLoginStatus();
    window.location.href = "../index.html"; // Redirige vers la page d'accueil
});

document.addEventListener("DOMContentLoaded", function() {
    const listOfWorks = document.querySelector(".modal_gallery");
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            modalData(data);
        });

    async function modalData(data) {
        data.forEach((item, i) => {
            const workElement = document.createElement("figure");
            workElement.classList.add('work-element');
            workElement.dataset.id = item.id; // Ajoutez l'ID de l'élément à l'attribut data-id

            const imageElement = document.createElement("img");
            imageElement.src = item.imageUrl;
            imageElement.style.width = "76.86px";
            imageElement.style.height = "102.57px";

            const trashIcon = document.createElement("i");
            trashIcon.classList.add('fa-regular', 'fa-trash-can', 'trash-icon');

            const linkIcon = document.createElement("a");
            linkIcon.href = "javascript:void(0)";
            linkIcon.classList.add('link-icon');
            linkIcon.appendChild(trashIcon);
            
            linkIcon.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation(); // Ajoutez cette ligne
                await deleteEntryFromDatabase(item, e);
                deleteDomElement(item);
            });
            
            const figcaptionElement = document.createElement("figcaption");
            figcaptionElement.style.fontSize = "14px";

            listOfWorks.appendChild(workElement); // Utilisez listOfWorks au lieu de sectionWorks
            workElement.appendChild(imageElement);
            workElement.appendChild(linkIcon);
            workElement.appendChild(figcaptionElement);
        });
    }        
});

async function deleteEntryFromDatabase(item, event) {
    event.preventDefault();

    console.log('item: ', item);
    var token = window.localStorage.getItem("token")
    console.log(JSON.stringify(token))
   
    const response = await fetch(`http://localhost:5678/api/works/${item.id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });    
    if (!response.ok) {
        throw new Error('Failed to delete entry');
    }
}

function deleteDomElement(item) {
    const element = document.querySelector(`[data-id="${item.id}"]`);
    if (element) {
        element.remove();
    }
}

/*
function deleteImage(item, event) {
    event.preventDefault();

    console.log('item: ', item);
    var token = window.localStorage.getItem("token")
    console.log(JSON.stringify(token))

    var request = new Request(`http://localhost:5678/api/works/${item.id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });

    fetch(request)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Supprimer l'élément du DOM
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}*/

