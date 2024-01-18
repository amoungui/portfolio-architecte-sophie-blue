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

function ajoutListenerData() {
    const formulaireLogin = document.querySelector(".formulaire-work");
    formulaireLogin.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur
        event.preventDefault();
        let categorie = event.target.querySelector("[name=category]").value;
        let categoryId = checkCategoryStatus(categorie);        
        // Création de l’objet de connexion.
        const work = {
            email: event.target.querySelector("[name=imageUpload]").value,
            title: event.target.querySelector("[name=title]").value,
            categoryId: categoryId,
        };
        console.log(work);
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(login);
        console.log(chargeUtile);
        // Récupérer le token du localStorage
        const token = window.localStorage.getItem("token");

        // Envoyer la requête à l'API
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token  // Ajouter l'en-tête Authorization
            },
            body: chargeUtile
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('Erreur lors de l\'insertion des données :', error);
        });
    });
}

ajoutListenerData();

