document.getElementById("formConnexion").addEventListener("submit", confirmUser);

// Fonction qui vérifie que les données saisie correspondent au données dans le local storage.
function confirmUser(e){
    e.preventDefault(); // Sert à enlever le comportement par défaut du submit du formulaire.
    const email = document.getElementById("email1");
    const password = document.getElementById("password1");
    const data = localStorage.getItem("user");
    const userData = JSON.parse(data);
    if(email.value === userData.email && password.value === userData.password){
        window.location.href = 'profil.html';
    }else{
        alert("Mauvaise adresse mail ou mot de passe");
    };
};