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


// lien pour ouvrir la modal1
document.querySelectorAll(".jsModifier").forEach((a) => {
	a.addEventListener("click", openModal1);
});
// lien pour ouvrir la modal2
document.querySelector(".btnAjouterPhotoModal1").addEventListener("click", openModal2)

// gestion touche escape
window.addEventListener("keydown", function (e) {
	if (e.key === "Escape" || e.key === "Esc") {
		closeModal1(e);
		closeModal2(e);
	}
	if (e.key === "Tab" && modal1 !== null) {
		focusInModal(e);
	}
});

//galerie Modal1
// Création des works
async function genererWorksToModal(works) {
	const askApiModal = await fetch("http://localhost:5678/api/works");
	works = await askApiModal.json();

	// Récupération de l'élément du DOM qui accueillera les works
	const sectionGalleryModal = document.querySelector(".galleryModal");
	sectionGalleryModal.innerHTML = ""

	works.forEach((worksModal) => {
		//création de la balise pour les works - balise<figure>
		const ficheElement = document.createElement("figure");
		ficheElement.classList.add("figureGallery")
		ficheElement.dataset.index = worksModal.id
		ficheElement.innerHTML = `<button class="fa-sharp fa-solid fa-arrows-up-down-left-right btnCross" ></button><button class="fa-sharp fa-solid fa-trash-can btnTrash"></button>`

		//Création des images
		const imageElement = document.createElement("img");
		imageElement.src = worksModal.imageUrl;

		// On rattache la balise article a la div galleryModal
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
			window.sessionStorage.removeItem("works")
			genererWorksToModal()
		})
	})
}

//Création des works
await genererWorksToModal();

//Todo Faire édition galerie

// Changement modal modal1--> modal2
const loadModal = async function (url) {
	const target = "#" + url.split("#")[1];
	const existingModal1 = document.querySelector(target);
	if (existingModal1 !== null) return existingModal1;
	const html = await fetch(url).then((reponse) => reponse.text());
	const element = document.createRange().createContextualFragment(html).querySelector(target).setAttribute("aria-hidden", "false")
	existingModal1.document.getElementById("modal1").style.display = "none"
	if (element === null)
		throw "L'element ${target} na pas été trouvé dans la page ${url}";
	document.body.append(element);
	return target;
};

//modal 2
//preview image
const imgPreview = document.getElementById("cadreBleu");
//const choixImage = document.getElementById("btnAjouterPhoto");
const photo = document.getElementById("btnAjouterPhoto")
const insertPhotoForm = document.getElementById("insertPhotos");
const title = document.getElementById("titrePhoto")
const categorie = document.getElementById("categoriePhoto")
const elementGris = document.getElementById("validerAjoutPhoto")

//gestion du bouton valider
elementGris.disabled = true
elementGris.style.backgroundColor = "grey"
photo.addEventListener("change", function () {
	elementGris.removeAttribute("style")
	elementGris.disabled = false
	getImgData();
});

//Recupere et affiche la photo choisie
function getImgData() {
	const files = btnAjouterPhoto.files[0];
	if (files) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(files);
		fileReader.addEventListener("load", function () {
			imgPreview.style.display = "block";
			imgPreview.innerHTML = '<img src="' + this.result + '" />';
		});
	}
}

//Ajout de photo à la galerie
insertPhotoForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const dataAjout = new FormData()
	dataAjout.append("title", title.value)
	dataAjout.append("category", categorie.value)
	dataAjout.append("image", photo.files[0])

	const projet = await fetch("http://localhost:5678/api/works", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`
		},
		body: dataAjout,

	});
	window.sessionStorage.removeItem("works")
	title.value = ""
	categorie.value = "1"

	//reconstruction de l'ajout photo
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

	elementGris.disabled = true
	elementGris.style.backgroundColor = "grey"
	inputAjouterPhoto.addEventListener("change", function () {
		elementGris.removeAttribute("style")
		elementGris.disabled = false
		getImgData(inputAjouterPhoto);
	});

	genererWorksToModal()
	closeModal2()
	openModal1()
});