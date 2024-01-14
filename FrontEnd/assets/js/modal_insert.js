
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
