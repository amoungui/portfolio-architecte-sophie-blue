// Déclaration de deux variables globales modal1 et modal2 initialisées à null
let modal1 = null
let modal2 = null

// Fonction asynchrone permettant d'ouvrir la première modale
const openModal1 = async function (e) {
    e.preventDefault() // Empêche l'action par défaut de l'événement
    // Sélectionne l'élément cible
    const target = document.querySelector(e.target.getAttribute('href'))
    // Réinitialise la propriété d'affichage
    target.style.display = null
    // Supprime l'attribut 'aria-hidden'
    target.removeAttribute('aria-hidden')
    // Ajoute l'attribut 'aria-modal' avec la valeur 'true'
    target.setAttribute('aria-modal', 'true') 
    // Affecte l'élément cible à la variable modal1
    modal1 = target 
    // Ajoute un écouteur d'événement 'click' qui appelle la fonction closeModal1
    modal1.addEventListener('click', closeModal1) 
    // Ajoute un écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-close' qui appelle la fonction closeModal1
    modal1.querySelector('.js-modal-close').addEventListener('click', closeModal1) 
    // Ajoute un écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-stop' qui appelle la fonction stopPropagation
    modal1.querySelector('.js-modal-stop').addEventListener('click', stopPropagation) 
}

// Fonction permettant de fermer la première modale
const closeModal1 = function (e) {
    if (modal1 === null) return // Si modal1 est null, la fonction s'arrête
    // Empêche l'action par défaut de l'événement
    e.preventDefault()
    // Change la propriété d'affichage à 'none'
    modal1.style.display = "none" 
    // Ajoute l'attribut 'aria-hidden' avec la valeur 'true'
    modal1.setAttribute('aria-hidden', 'true')
    // Supprime l'attribut 'aria-modal'
    modal1.removeAttribute('aria-modal') 
    // Supprime l'écouteur d'événement 'click' qui appelle la fonction closeModal1
    modal1.removeEventListener('click', closeModal1) 
    // Supprime l'écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-close' qui appelle la fonction closeModal1
    modal1.querySelector('.js-modal-close').removeEventListener('click', closeModal1)
    // Supprime l'écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-stop' qui appelle la fonction stopPropagation
    modal1.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation) 
    // Réinitialise la variable modal1 à null
    modal1 = null
}

// Evenement de click pour lancer la modal1
document.querySelectorAll('.js-modal1').forEach(a => {
    a.addEventListener('click', openModal1)

})


// Fonction asynchrone permettant d'ouvrir la deuxième modale
const openModal2 = async function (e) {
    // Empêche l'action par défaut de l'événement
    e.preventDefault()
    // Sélectionne l'élément cible
    const target = document.querySelector(e.target.getAttribute('href'))
    // Réinitialise la propriété d'affichage
    target.style.display = null
    // Supprime l'attribut 'aria-hidden'
    target.removeAttribute('aria-hidden')
    // Ajoute l'attribut 'aria-modal' avec la valeur 'true'
    target.setAttribute('aria-modal', 'true')
    // Affecte l'élément cible à la variable modal2
    modal2 = target
    // Ajoute un écouteur d'événement 'click' qui appelle la fonction closeModal2
    modal2.addEventListener('click', closeModal2)
    // Ajoute un écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-close' qui appelle la fonction closeModal2
    modal2.querySelector('.js-modal-close').addEventListener('click', closeModal2) 
    // Ajoute un écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-stop' qui appelle la fonction stopPropagation
    modal2.querySelector('.js-modal-stop').addEventListener('click', stopPropagation) 
}

// Fonction permettant de fermer la deuxième modale
const closeModal2 = function (e) {
    if (modal2 === null) return // Si modal2 est null, la fonction s'arrête
    e.preventDefault() // Empêche l'action par défaut de l'événement
    modal2.style.display = "none" // Change la propriété d'affichage à 'none'
    // Ajoute l'attribut 'aria-hidden' avec la valeur 'true'
    modal2.setAttribute('aria-hidden', 'true')
    // Supprime l'attribut 'aria-modal' 
    modal2.removeAttribute('aria-modal')
    // Supprime l'écouteur d'événement 'click' qui appelle la fonction closeModal2
    modal2.removeEventListener('click', closeModal2) 
    // Supprime l'écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-close' qui appelle la fonction closeModal2
    modal2.querySelector('.js-modal-close').removeEventListener('click', closeModal2)
    // Supprime l'écouteur d'événement 'click' sur l'élément avec la classe '.js-modal-stop' qui appelle la fonction stopPropagation
    modal2.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation) 
    modal2 = null // Réinitialise la variable modal2 à null
}

// Evenement de click pour lancer la modal2
document.querySelectorAll('.js-modal2').forEach(a => {
    a.addEventListener('click', openModal2)

})

// fonction permettant de fermer toutes les fenêtres modales
const closeAllModals = function (e) {
    e.preventDefault() // Empêche l'action par défaut de l'événement
    if (modal1 !== null) closeModal1(e) // Si modal1 n'est pas null, appelle la fonction closeModal1
    if (modal2 !== null) closeModal2(e) // Si modal2 n'est pas null, appelle la fonction closeModal2
}

// Evenement de click pour fermer toutes les fenêtres modales
document.querySelectorAll('.js-modal-close-all').forEach(a => {
    a.addEventListener('click', closeAllModals)
})

const stopPropagation = function (e) {
    e.stopPropagation()
}

//Ajout de photo à la galerie
// Récupération du formulaire
const insertPhotoForm = document.getElementById("insert-photos");

// Récupération des éléments du formulaire
const title = document.getElementById("title");
const category = document.getElementById("category");
const imageUpload = document.getElementById("imageUpload");
const submitButton = document.querySelector(".insert-work");

// Fonction pour vérifier si tous les champs sont remplis
function checkForm() {
    // Si le champ 'title', 'category' sont remplis et un fichier est téléchargé pour 'imageUpload'
    if (title.value && category.value && imageUpload.files.length > 0) {
        console.log(submitButton); // Affiche l'objet 'submitButton' dans la console
        submitButton.id = "btn-active-work"; // Change l'id de 'submitButton' à 'btn-active-work'
    } else {
        // Si les conditions ne sont pas remplies, réinitialise l'id de 'submitButton'
        submitButton.id = ""; 
    }
}


// Ajout des écouteurs d'événements
title.addEventListener("input", checkForm);
category.addEventListener("change", checkForm);
imageUpload.addEventListener("change", checkForm);

// Ajoute un écouteur d'événement 'change' à l'élément avec l'id 'insert-photos'
document.getElementById('insert-photos').addEventListener('change', function(e) {
    var file = e.target.files[0]; // Récupère le premier fichier téléchargé
    var reader = new FileReader(); // Crée un nouvel objet FileReader
    reader.onloadend = function() { // Définit une fonction à exécuter lorsque la lecture du fichier est terminée
        var img = document.createElement('img'); // Crée un nouvel élément img
        img.src = reader.result; // Définit l'attribut src de l'élément img avec le résultat de la lecture du fichier
        var container = document.querySelector('.container-load'); // Sélectionne l'élément avec la classe '.container-load'
        container.innerHTML = ''; // Vide le contenu HTML de l'élément container
        container.appendChild(img); // Ajoute l'élément img à l'élément container
    }
    if (file) { // Si un fichier a été téléchargé
        reader.readAsDataURL(file); // Lit le fichier comme une URL de données
    }
});

// Ajout de l'événement 'submit' au formulaire
insertPhotoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const dataAjout = new FormData();
    if (title.value && category.value && imageUpload.files[0]) {
        // Création d'un objet FormData pour stocker les données du formulaire
        dataAjout.append("title", title.value);
        dataAjout.append("category", Number(category.value));
        dataAjout.append("image", imageUpload.files[0]);
        submitButton.classList.add("btn-active-work"); // Utilisez submitButton ici
    }

    token = window.localStorage.getItem("token")
    // Effectuer la requête POST
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: dataAjout,
    });

    // Vérification de la réponse
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
    } else {
        // Si la requête a réussi, on peut réinitialiser le formulaire et fermer la modale
        document.getElementById("title").value = "";
        document.getElementById("category").value = "Objets";
        document.getElementById("modal2").style.display = "none";
    }
});
