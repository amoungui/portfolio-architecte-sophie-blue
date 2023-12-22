// Récupération des travaux depuis l'API
const sectionWorks = document.querySelector(".gallery");
const works = fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    console.log(data);
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
  });

