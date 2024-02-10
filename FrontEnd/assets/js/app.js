// Récupération des works éventuellement stockées dans le sessionStorage
let works = window.sessionStorage.getItem("works");

// Récupération du token dans le sessionStorage
let token = window.sessionStorage.getItem("token");

// Déclaration des modales
let modal1 = document.getElementById("modal1");
let modal2 = document.getElementById("modal2");

// Sélecteur pour les éléments pouvant recevoir le focus
const focusableSelector = "button, a, input, textarea";

// Initialisation du tableau qui contiendra les éléments pouvant recevoir le focus
let focusables = [];

// Initialisation de la variable qui contiendra l'élément ayant le focus avant l'ouverture de la modale
let focusElementPrecedent = null;

// Fonction pour ouvrir la modale1
const openModal1 = async function (e) {
	// Prévention du comportement par défaut si un événement est passé en paramètre
	if (e) e.preventDefault();

	// Récupération des éléments pouvant recevoir le focus dans la modale1
	focusables = Array.from(modal1.querySelectorAll(focusableSelector));

	// Stockage de l'élément actuellement focus
	focusElementPrecedent = document.querySelector(":focus");

	// Affichage de la modale1
	modal1.style.display = null;

	// Focus sur le premier élément pouvant recevoir le focus dans la modale1
	focusables[0].focus();

	// Suppression de l'attribut "aria-hidden" de la modale1
	modal1.removeAttribute("aria-hidden");

	// Ajout de l'attribut "aria-modal" à la modale1
	modal1.setAttribute("aria-modal", "true");

	// Ajout d'un écouteur d'événement pour fermer la modale1 lors d'un clic en dehors
	modal1.addEventListener("click", closeModal1);

	// Ajout d'un écouteur d'événement pour fermer la modale1 lors d'un clic sur le bouton de fermeture
	modal1.querySelector(".jsCloseModal").addEventListener("click", closeModal1);

	// Ajout d'un écouteur d'événement pour stopper la propagation de l'événement lors d'un clic à l'intérieur de la modale1
	modal1.querySelector(".jsModalStop").addEventListener("click", stopEvent);
};

// Fonction pour ouvrir la modale2
const openModal2 = async function (e) {
	// Prévention du comportement par défaut si un événement est passé en paramètre
	if (e) e.preventDefault();

	// Récupération des éléments pouvant recevoir le focus dans la modale2
	focusables = Array.from(modal2.querySelectorAll(focusableSelector));

	// Stockage de l'élément actuellement focus
	focusElementPrecedent = document.querySelector(":focus");

	// Affichage de la modale2
	modal2.style.display = null;

	// Focus sur le premier élément pouvant recevoir le focus dans la modale2
	focusables[0].focus();

	// Suppression de l'attribut "aria-hidden" de la modale2
	modal2.removeAttribute("aria-hidden");

	// Ajout de l'attribut "aria-modal" à la modale2
	modal2.setAttribute("aria-modal", "true");

	// Ajout d'un écouteur d'événement pour fermer la modale2 lors d'un clic en dehors
	modal2.addEventListener("click", closeModal2);

	// Ajout d'un écouteur d'événement pour fermer la modale2 lors d'un clic sur le bouton de fermeture
	modal2.querySelector(".jsCloseModal").addEventListener("click", closeModal2);

	// Ajout d'un écouteur d'événement pour stopper la propagation de l'événement lors d'un clic à l'intérieur de la modale2
	modal2.querySelector(".jsModalStop").addEventListener("click", stopEvent);

	// Fermeture de la modale1
	closeModal1()
};

// Fonction pour fermer la modale1
const closeModal1 = function (e) {
	// Si un événement est passé en paramètre, on prévient son comportement par défaut
	if (e) { e.preventDefault() };

	// On cache la modale1
	modal1.style.display = "none"
}

// Fonction pour fermer la modale2
const closeModal2 = function (e) {
	// Si un événement est passé en paramètre, on prévient son comportement par défaut
	if (e) { e.preventDefault() };

	// On cache la modale2
	modal2.style.display = "none"
}

// Récupération du bouton de retour
const btnBack = document.querySelector(".back");

// Ajout d'un écouteur d'événement sur le bouton de retour
btnBack.addEventListener("click", (e) => {
	// On ferme la modale2
	closeModal2()

	// On ouvre la modale1
	openModal1()
});

// Fonction pour bloquer la propagation d'un événement
const stopEvent = function (e) {
	e.stopPropagation();
};

// Fonction pour gérer le focus dans la modale
const focusInModal = function (e) {
	// On prévient le comportement par défaut de l'événement
	e.preventDefault();

	// On récupère l'index de l'élément actuellement focus dans la modale1
	let index = focusables.findIndex((f) => f === modal1.querySelector(":focus"));

	// Si la touche Shift est enfoncée, on décrémente l'index, sinon on l'incrémente
	if (e.shiftKey === true) {
		index--
	} else {
		index++;
	}

	// Si l'index est supérieur ou égal à la longueur du tableau des éléments pouvant recevoir le focus, on le réinitialise à 0
	if (index >= focusables.length) {
		index = 0;
	}

	// Si l'index est inférieur à 0, on le met à la longueur du tableau des éléments pouvant recevoir le focus moins 1
	if (index < 0) {
		index = focusables.length - 1;
	}

	// On donne le focus à l'élément correspondant à l'index
	focusables[index].focus();
};


// Ajout d'un écouteur d'événement sur tous les éléments avec la classe ".jsModifier" pour ouvrir la modale1
document.querySelectorAll(".jsModifier").forEach((a) => {
	a.addEventListener("click", openModal1);
});

// Ajout d'un écouteur d'événement sur l'élément avec la classe ".btnAjouterPhotoModal1" pour ouvrir la modale2
document.querySelector(".btnAjouterPhotoModal1").addEventListener("click", openModal2)

// Ajout d'un écouteur d'événement sur la fenêtre pour gérer la touche Escape et Tab
window.addEventListener("keydown", function (e) {
	// Si la touche Escape est pressée, on ferme les modales
	if (e.key === "Escape" || e.key === "Esc") {
		closeModal1(e);
		closeModal2(e);
	}
	// Si la touche Tab est pressée et que la modale1 est ouverte, on gère le focus dans la modale
	if (e.key === "Tab" && modal1 !== null) {
		focusInModal(e);
	}
});

// Fonction pour générer les works dans la galerie
async function genererWorksToGallery() {
	// Appel à l'API pour récupérer les works
	const askApiModal = await fetch("http://localhost:5678/api/works");
	works = await askApiModal.json();

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

await genererWorksToGallery()

// Fonction pour générer les works dans la modale1
async function genererWorksToModal(works) {
	// Appel à l'API pour récupérer les works
	const askApiModal = await fetch("http://localhost:5678/api/works");
	works = await askApiModal.json();

	// Récupération de l'élément du DOM qui accueillera les works
	const sectionGalleryModal = document.querySelector(".galleryModal");
	sectionGalleryModal.innerHTML = ""

	// Pour chaque work, on crée une balise <figure> avec une image et un bouton de suppression
	works.forEach((worksModal) => {
		//création de la balise pour les works - balise<figure>
		const ficheElement = document.createElement("figure");
		ficheElement.classList.add("figureGallery")
		ficheElement.dataset.index = worksModal.id
		ficheElement.innerHTML = `<button class="fa-sharp fa-solid fa-arrows-up-down-left-right btnCross" ></button><button class="fa-sharp fa-solid fa-trash-can btnTrash"></button>`

		//Création des images
		const imageElement = document.createElement("img");
		imageElement.src = worksModal.imageUrl;

		// On rattache la balise <figure> à la div .galleryModal
		sectionGalleryModal.appendChild(ficheElement);

		//Rattachement de les balises au DOM
		ficheElement.appendChild(imageElement);
	})

	//Supprime projet
	//Todo Ajouter message de confirmation de suppression
	const deleteProjet = document.querySelectorAll(".btnTrash")
	deleteProjet.forEach((btn) => {
		btn.addEventListener("click", async (e) => {
			e.preventDefault();
			const id = e.target.parentNode.dataset.index
			const projetDelete = await fetch(`http://localhost:5678/api/works/${id}`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`
				},
			})
			genererWorksToModal()
			// cette fonction permet de génèrer la galerie
			genererWorksToGallery()
		})
	})

}

// Appel de la fonction pour générer les works
await genererWorksToModal();

// Fonction pour charger une modale à partir d'une URL
const loadModal = async function (url) {
	// Extraction de l'identifiant de la modale à partir de l'URL
	const target = "#" + url.split("#")[1];

	// Recherche de la modale dans le document actuel
	const existingModal1 = document.querySelector(target);

	// Si la modale existe déjà, on la retourne directement
	if (existingModal1 !== null) return existingModal1;

	// Sinon, on récupère le code HTML de la page contenant la modale
	const html = await fetch(url).then((reponse) => reponse.text());

	// On crée un fragment de document à partir du code HTML et on y recherche la modale
	const element = document.createRange().createContextualFragment(html).querySelector(target).setAttribute("aria-hidden", "false")

	// On cache la modale1 existante
	existingModal1.document.getElementById("modal1").style.display = "none"

	// Si la modale n'a pas été trouvée dans le code HTML, on lance une exception
	if (element === null)
		throw "L'element ${target} na pas été trouvé dans la page ${url}";

	// On ajoute la modale au corps du document
	document.body.append(element);

	// On retourne l'identifiant de la modale
	return target;
};


// Récupération des éléments du DOM nécessaires pour la modale2
const imgPreview = document.getElementById("cadreBleu");
const photo = document.getElementById("btnAjouterPhoto");
const insertPhotoForm = document.getElementById("insertPhotos");
const title = document.getElementById("titrePhoto");
const categorie = document.getElementById("categoriePhoto");
const elementGris = document.getElementById("validerAjoutPhoto");
let newPhoto = null;

// Désactivation du bouton de validation et changement de sa couleur en gris
elementGris.disabled = true
elementGris.style.backgroundColor = "grey"

// Fonction pour vérifier si tous les champs sont remplis
function checkFields() {
    return title.value && categorie.value && newPhoto;
}

// Ajout d'un écouteur d'événement sur le champ de sélection de photo
photo.addEventListener("change", function () {
    // Appel de la fonction pour récupérer et afficher la photo choisie
    getImgData();

    // Vérifiez si tous les champs sont remplis
    if (checkFields()) {
        // Si tous les champs sont remplis, réactivez le bouton de validation et supprimez son style personnalisé
        elementGris.removeAttribute("style");
        elementGris.disabled = false;
    }
});

// Ajout d'écouteurs d'événements sur les autres champs du formulaire
title.addEventListener('input', checkForm);
categorie.addEventListener('input', checkForm);

function checkForm() {
    if (checkFields()) {
        // Si tous les champs sont remplis, réactivez le bouton de validation et supprimez son style personnalisé
        elementGris.removeAttribute("style");
        elementGris.disabled = false;
    } else {
        // Si tous les champs ne sont pas remplis, désactivez le bouton de validation et changez sa couleur en gris
        elementGris.style.backgroundColor = "grey";
        elementGris.disabled = true;
    }
}


// Fonction pour récupérer et afficher la photo choisie
async function getImgData() {
    // Récupération du fichier choisi
    const file = btnAjouterPhoto.files[0];
	newPhoto = file
	console.log('getImage file: ', newPhoto);

    // Si un fichier a été choisi
    if (file) {
        // Options pour la compression de l'image
        const options = {
            maxSizeMB: 1, // (max file size in MB)
            maxWidthOrHeight: 1920, // (max width or height in pixel)
            useWebWorker: true // (optional, use multi-threading for better performance)
        }

        try {
            // Compression de l'image
            const compressedFile = await imageCompression(file, options);

            // Création d'un nouvel objet FileReader
            const fileReader = new FileReader();

            // Lecture du fichier en tant que Data URL
            fileReader.readAsDataURL(compressedFile);

            // Ajout d'un écouteur d'événement pour afficher la photo une fois qu'elle est chargée
            fileReader.addEventListener("load", function () {
                // Affichage de la photo dans l'élément imgPreview
				console.log('la reference de image courante: ', this.result);
                imgPreview.style.display = "block";
                imgPreview.innerHTML = `<img src="${this.result}" />`;
            });
        } catch (error) {
            console.error('Erreur lors de la compression de l\'image : ', error);
        }	
    }
}


// Ajout d'un écouteur d'événement sur le formulaire d'insertion de photo
insertPhotoForm.addEventListener("submit", async (event) => {
	// Prévention du comportement par défaut du formulaire
	event.preventDefault();
	// console.log('au sein de l\'événement d\'insertion', newPhoto);
	// Création d'un nouvel objet FormData pour stocker les données du formulaire
	const dataAjout = new FormData()
	dataAjout.append("title", title.value)
	dataAjout.append("category", categorie.value)
	dataAjout.append("image", newPhoto)

	// Génération d'un timestamp unique
	const timestamp = Date.now();

	// Envoi des données du formulaire à l'API avec le timestamp comme paramètre
	const projet = await fetch(`http://localhost:5678/api/works?timestamp=${timestamp}`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`
		},
		body: dataAjout,
	});

	// Suppression des works du sessionStorage
	window.sessionStorage.removeItem("works")

	// Réinitialisation des champs du formulaire insertPhotos
	document.getElementById('insertPhotos').reset();

	// Reconstruction de l'ajout de photo
	imgPreview.style.display = null
	imgPreview.innerHTML = ""
	const imgIconePicture = document.createElement("img")
	imgIconePicture.src = "./assets/icons/picture.png"
	imgIconePicture.alt = "picture"
	const labelAjouterPhoto = document.createElement("label")
	labelAjouterPhoto.id = "btnAjoutPhoto"
	labelAjouterPhoto.HTMLfor = "btnAjouterPhoto"
	labelAjouterPhoto.innerHTML = "+ Ajouter photo"
	const inputAjouterPhoto = document.createElement("input")
	inputAjouterPhoto.id = "btnAjouterPhoto"
	inputAjouterPhoto.className = "btnAjouterPhoto"
	inputAjouterPhoto.type = "file"
	inputAjouterPhoto.name = "btnAjouterPhoto"
	inputAjouterPhoto.accept = ".jpg, .png"
	inputAjouterPhoto.value = ""
	const pAJouterPhoto = document.createElement("p")
	pAJouterPhoto.innerHTML = "jpg, png : 4mo max"
	imgPreview.appendChild(imgIconePicture)
	imgPreview.appendChild(labelAjouterPhoto)
	imgPreview.appendChild(pAJouterPhoto)
	labelAjouterPhoto.appendChild(inputAjouterPhoto)

	// Désactivation du bouton de validation et changement de sa couleur en gris
	elementGris.disabled = true
	elementGris.style.backgroundColor = "grey"

	// Ajout d'un écouteur d'événement sur le champ de sélection de photo
	inputAjouterPhoto.addEventListener("change", function () {
		// Réactivation du bouton de validation et suppression de son style personnalisé
		elementGris.removeAttribute("style")
		elementGris.disabled = false

		// Appel de la fonction pour récupérer et afficher la photo choisie
		getImgData(inputAjouterPhoto);
	});

	// Génération des works dans la modale
	genererWorksToModal()
	// cette fonction permet de génèrer la galerie
	genererWorksToGallery()
	// Fermeture de la modale2 et ouverture de la modale1
	closeModal2()
	openModal1()
});