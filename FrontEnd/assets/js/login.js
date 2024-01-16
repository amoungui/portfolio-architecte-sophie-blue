function ajoutListenerLogin() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur
        event.preventDefault();
        // Création de l’objet de connexion.
        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(login);
        console.log(chargeUtile)
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://127.0.0.1:5678/api/users/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        .then(response => response.json())
        .then(data => {
            if(data.token) {
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("auth", chargeUtile);
                window.location.href = "../index.html"; // Redirige vers la page d'accueil
            } else {
                console.log('Erreur de connexion');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
    });
}

ajoutListenerLogin();
