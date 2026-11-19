document.getElementById("password").addEventListener("input", passwordControl);
document.getElementById("passwordConfirm").addEventListener("input", passwordConfirmControl);
document.getElementById("formInscription").addEventListener("submit", storageAccount);

// Fonction pour l'affichage des conditions du mot de passe.
function passwordControl(){
    const value = this.value;
    const lettre = document.getElementById("lettre");
    const chiffre = document.getElementById("chiffre");
    const special = document.getElementById("special");
    const nbCaracteres = document.getElementById("nbCaracteres");
    const moyen = document.getElementById("moyen");
    const fort = document.getElementById("fort");

    if(value.match("[A-Za-z]")){
        lettre.style.color = "green"; // Affiche en vert la condition de lettre.
    }else{
        lettre.style.color = "red";
    };

    if(value.match("[0-9]")){
        chiffre.style.color = "green"; // Affiche en vert la condition de chiffre.
    }else{
        chiffre.style.color = "red";
    };

    if(value.match("[^a-zA-Z0-9À-ÖØ-öø-ÿ]")){
        special.style.color = "green"; // Affiche en vert la condition de caractère spécial.
    }else{
        special.style.color = "red";
    };

    if(value.length >= 6){
        nbCaracteres.style.color = "green"; // Affiche en vert la condition de longueur de 6 caractères.
    }else{
        nbCaracteres.style.color = "red";
    };

    if(value.length >= 6 && value.match("[0-9]") || value.length >= 6 && value.match("[^a-zA-Z0-9À-ÖØ-öø-ÿ]")){
        moyen.classList.remove('invisible'); // Affiche le niveau moyen si mot de passe supérieur à 6 caractères et un chiffre ou un caractère spécial.
    }else{
        moyen.classList.add('invisible');
    };

    if(value.length >= 9 && value.match("[0-9]") && value.match("[^a-zA-Z0-9À-ÖØ-öø-ÿ]")){
        fort.classList.remove('invisible'); // Affiche le niveau fort si mot de passe supérieur à 9 caractères et un chiffre et un caractère spécial.
    }else{
        fort.classList.add('invisible');
    };
};

// Fonction pour afficher si la confirmation du mot de passe est identique au mot de passe saisie.
function passwordConfirmControl(){
    const value = this.value;
    const password = document.getElementById("password");
    const passwordConfirmControl = document.getElementById("passwordConfirmControl");
    if(value === password.value){
        passwordConfirmControl.classList.remove('invisible');
    }else{
        passwordConfirmControl.classList.add('invisible');
    };
};

// Fonction pour le stockage des données saisie dans le local storage.
function storageAccount(e){
    e.preventDefault(); // Sert à enlever le comportement par défaut du submit du formulaire.
    const pseudo = document.getElementById("pseudo");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const userData = {pseudo: `${pseudo.value}`, email: `${email.value}`, password: `${password.value}`,}
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = 'connexion.html';
};