function ajoutListenerLogin() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur
        event.preventDefault();
        // Création de l’objet du nouvel avis.
        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(login); 
        console.log(chargeUtile)
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://127.0.0.1:5500/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        .then(response => {
            if(response.status === 200) {
                // window.location.href = "/home"; // Redirige vers la page d'accueil
                console.log(response.status)
            } else {
                console.log('Erreur de connexion');
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                console.log(response)
                // throw new Error('La réponse du serveur n\'est pas un JSON valide');
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });               
    });
}

ajoutListenerLogin()