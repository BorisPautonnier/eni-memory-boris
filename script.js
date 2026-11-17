const LEGUMES = ["🍆", "🥕", "🌶️", "🥬", "🥦", "🍄‍🟫"]; // Ce tableau contient les 6 symboles du jeu.

const TOTAL_PAIRS = LEGUMES.length; // Le nombre de paires à trouver, ici la longueur du tableau donc 6.

let moves = 0; // Le nombre de coups joués. Un coup = deux cartes retournées.

let movesEl = document.getElementById("moves"); // Affichage du nombre de coup dans la page HTML.

let matchedPairs = 0; // Le nombre de paires déjà trouvées.

let firstCard = null; // La première carte retournée du tour. null = aucune carte retournée pour l'instant.

let lock = false; // Verrou : true = on interdit de cliquer sur les cartes.

// Fonction qui initialise le plateau de jeu.
function initGame(){
    moves = 0;
    movesEl.textContent = `${moves}`;
    matchedPairs = 0;
    firstCard = null;
    lock = false;
    for(let i = 0; i < 12; i++){
        const CASE = document.getElementById("i");
        CASE.textContent = LEGUMES[Math.floor(Math.random()*LEGUMES.length)];
    };
};

window.onload = initGame; // Initialise le plateau au chargement de la page.

document.addEventListener('keydown', e => {if (e.code === 'Space') initGame();}); // Initialise le plateau quand on appuie sur espace.