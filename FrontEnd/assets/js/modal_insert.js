const formulairemodale = document.querySelector(".form-img");
const notification = document.querySelector("#notification");

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
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            })
            if (response.ok) {
                notification.textContent = "L'insertion des données a réussi !";
                notification.style.color = "green";
            } else {
                notification.textContent = "L'insertion des données a échoué.";
                notification.style.color = "red";
            }
        } else {
            console.log("La catégorie saisie n'existe pas.");
            notification.textContent = "La catégorie saisie n'existe pas.";
            notification.style.color = "red";
        }
    }    
    window.location.href = "../index.html"; // Redirige vers la page d'accueil
});
