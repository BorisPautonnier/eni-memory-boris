document.getElementById("password").addEventListener("input", passwordControl);
document.getElementById("password_confirm").addEventListener("input", passwordConfirmControl);

function passwordControl(){
    const value = this.value;
    const lettre = document.getElementById("lettre");
    const chiffre = document.getElementById("chiffre");
    const special = document.getElementById("special");
    const nbCaracteres = document.getElementById("nbCaracteres");
    const moyen = document.getElementById("moyen");
    const fort = document.getElementById("fort");

    if(value.match("[A-Za-z]")){
        lettre.style.color = "green";
    }else{
        lettre.style.color = "red";
    };

    if(value.match("[0-9]")){
        chiffre.style.color = "green";
    }else{
        chiffre.style.color = "red";
    };

    if(value.match("[^a-zA-Z0-9À-ÖØ-öø-ÿ]")){
        special.style.color = "green";
    }else{
        special.style.color = "red";
    };

    if(value.length >= 6){
        nbCaracteres.style.color = "green";
    }else{
        nbCaracteres.style.color = "red";
    };

    if(value.length >= 6 && value.match("[0-9]") || value.length >= 6 && value.match("[^a-zA-Z0-9À-ÖØ-öø-ÿ]")){
        moyen.classList.remove('invisible');
    }else{
        moyen.classList.add('invisible');
    };

    if(value.length >= 9 && value.match("[0-9]") && value.match("[^a-zA-Z0-9À-ÖØ-öø-ÿ]")){
        fort.classList.remove('invisible');
    }else{
        fort.classList.add('invisible');
    };
};

function passwordConfirmControl(){
    const value = this.value;
    const mdp = document.getElementById("password");
    const mdpConfirm = document.getElementById("password_confirm_control");
    if(value === mdp.value){
        mdpConfirm.classList.remove('invisible');
    }else{
        mdpConfirm.classList.add('invisible');
    };
};

const name = getElementById("name");
const email = getElementById("email");
const password = getElementById("password")
