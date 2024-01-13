const focusableSelector = 'button, a, input, textarea'
let modal = null
let focusables = []
let previouslyFocusedElement = null

const openModal = async function (e) {
    e.preventDefault()
    const target = e.target.getAttribute('href')
    if (target.startsWith('#')) {
        modal = document.querySelector(target)
    } else {
        modal = await loadModal(target)
    }
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
    focusables[0].focus()
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return 
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    /* Animation-direction reversed
    modal.style.display = "none"
    modal.offsetWidth
    modal.style.display = null
     */
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    const hideModal = function () {
        modal.style.display = "none"
        modal.removeEventListener('animationend', hideModal)
        modal = null
    }
    modal.addEventListener('animationend', hideModal)
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

const loadModal = async function (url) {
    // TODO : Afficher un loader
    const target = '#' + url.split('#')[1]
    const exitingModal = document.querySelector(target)
    if (exitingModal !== null) return exitingModal
    const html = await fetch(url).then(response => response.text())
    const element = document.createRange().createContextualFragment(html).querySelector(target)
    if (element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
    document.body.append(element)
    return element
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})

// fonction qui vérifie si la catégorie saisie existe dans la liste des
// catégories de l'api
async function checkCategoryStatus(categorie){
    // Récupération des travaux depuis l'API
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    for (let i = 0; i < categories.length; i++) {
        if (categorie === categories[i].name){
            return categories[i].id;
        }
    }
    return null;
}

// Ajouter un écouteur d'événements pour le bouton de d'ajout de travaux
const formulairemodale = document.querySelector(".form-img");
formulairemodale.addEventListener("submit", async function (event) {
    event.preventDefault();
    // vérifions que tous les champs du formulaire sont remplis
    if (
        event.target.querySelector("[name=title]").value !== "" && 
        event.target.querySelector("[name=category]").value !== "" &&
        event.target.querySelector("[name=imageUpload]").value !== ""
    ){
        let categorie = event.target.querySelector("[name=category]").value;
        let categoryId = await checkCategoryStatus(categorie);
        if (categoryId !== null){
            // Création de l’objet du nouvel travail.
            const work = {
                title: event.target.querySelector("[name=title]").value,
                categoryId: categoryId,
                imageUrl: event.target.querySelector("[name=imageUpload]").value,
                userId: 1 // Comme nous avons mentionné que l'utilisateur connecté est unique et a l'id 1
            };
            // Création de la charge utile au format JSON
            const chargeUtile = JSON.stringify(work); 
            console.log(chargeUtile)
            // Appel de la fonction fetch avec toutes les informations nécessaires
            await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            })
        } else {
            console.log("La catégorie saisie n'existe pas.");
        }
    }    
    window.location.href = "../index.html"; // Redirige vers la page d'accueil
});
