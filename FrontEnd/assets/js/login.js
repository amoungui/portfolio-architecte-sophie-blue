// Récupération des éléments du formulaire de connexion
const loginForm = document.getElementById("loginForm");
const connect = document.getElementById("connect");
const email = document.getElementById("email");
const password = document.getElementById("password");
const notification = document.getElementById("notification");

// Ajout d'un écouteur d'événement sur le bouton de connexion pour sélectionner le champ de mot de passe
connect.addEventListener("click", (event) => {
  document.getElementById("password").select();
});

// Ajout d'un écouteur d'événement sur le formulaire de connexion pour gérer la soumission du formulaire
loginForm.addEventListener("submit", async (event) => {
  // Prévention du comportement par défaut du formulaire
  event.preventDefault();

  // Vérification si les champs email et password ne sont pas vides
  if (email.value !== "" && password.value !== ""){
    // Création d'un objet JSON avec les valeurs des champs email et password du formulaire
    const bodyJson = JSON.stringify({
      email: email.value,
      password: password.value,
    });
    console.log(bodyJson);
    // Envoi de la requête de connexion à l'API
    const login = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyJson,
      // ajouter la partie cache
    });

    // Récupération de la réponse de l'API
    const data = await login.json();

    // Si la réponse ne contient pas de token, on affiche une alerte avec le statut de la réponse
    if (data.token == null) {
      notification.innerHTML = "This user is  "+login.statusText;
      notification.style.display = null;
    } else {
      // Sinon, on stocke le token dans le sessionStorage et on redirige l'utilisateur vers la page index.html
      window.sessionStorage.setItem("token", data.token);
      window.location.href = "./index.html";
    }
  }else{
    notification.innerHTML = "Un des champs est vide ou a mal été renseigné!";
    notification.style.display = null;
  }
});
