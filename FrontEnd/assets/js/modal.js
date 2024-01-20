let modal1 = null
let modal2 = null

// fonction permettant d'ouvrir la première modale
const openModal1 = async function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))    
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal1 = target
    modal1.addEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-close').addEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

// fonction permettant de fermer la première modale
const closeModal1 = function (e) {
    if (modal1 === null) return
    e.preventDefault()
    modal1.style.display = "none"
    modal1.setAttribute('aria-hidden', 'true')
    modal1.removeAttribute('aria-modal')
    modal1.removeEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-close').removeEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal1 = null
}

// Evenement de click pour lancer la modal1
document.querySelectorAll('.js-modal1').forEach(a => {
    a.addEventListener('click', openModal1)

})

// fonction permettant d'ouvrir la deuxième modale
const openModal2 = async function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))    
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal2 = target
    modal2.addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-close').addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

// fonction permettant de fermer la première modale
// fonction permettant de fermer la deuxième modale
const closeModal2 = function (e) {
    if (modal2 === null) return
    e.preventDefault()
    modal2.style.display = "none"
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')
    modal2.removeEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-close').removeEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal2 = null
}

// Evenement de click pour lancer la modal2
document.querySelectorAll('.js-modal2').forEach(a => {
    a.addEventListener('click', openModal2)

})

// fonction permettant de fermer toutes les fenêtres modales
const closeAllModals = function (e) {
    e.preventDefault()
    if (modal1 !== null) closeModal1(e)
    if (modal2 !== null) closeModal2(e)
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

// Ajout de l'événement 'submit' au formulaire
insertPhotoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Création d'un objet FormData pour stocker les données du formulaire
    const dataAjout = new FormData();
    dataAjout.append("title", document.getElementById("title").value);
    dataAjout.append("category", Number(document.getElementById("category").value));
    dataAjout.append("image", document.getElementById("imageUpload").files[0]);

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
