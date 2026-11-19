const LEGUMES6 = ["🍆", "🥕", "🌶️", "🥬", "🥦", "🍄‍🟫"]; // Ce tableau contient les 6 symboles du jeu.

const TOTAL_PAIRS = LEGUMES6.length; // Le nombre de paires à trouver, ici la longueur du tableau donc 6.

const boardEl = document.getElementById('board'); // On récupère le plateau de jeu.

const movesEl = document.getElementById("moves"); // Affichage du nombre de coup dans la page HTML.

let moves = 0; // Le nombre de coups joués. Un coup = deux cartes retournées.

let matchedPairs = 0; // Le nombre de paires déjà trouvées.

let firstCard = null; // La première carte retournée du tour. null = aucune carte retournée pour l'instant.

let lock = false; // Verrou : true = on interdit de cliquer sur les cartes.

// Fonction pour mélanger un tableau
function shuffle(array) {
    // "array" est le tableau à mélanger.
    for (let i = array.length - 1; i > 0; i--) {
        // On part de la dernière case et on recule jusqu'à la case 1.
        const j = Math.floor(Math.random() * (i + 1));
        // un indice au hasard entre 0 et i.
        [array[i], array[j]] = [array[j], array[i]];
        // On échange les deux éléments de place.
    }
    return array;
    // On renvoie le tableau mélangé.
}

// Fonction qui initialise le plateau de jeu.
function initGame(){
    moves = 0;
    movesEl.textContent = moves;
    matchedPairs = 0;
    firstCard = null;
    lock = false;
    boardEl.innerHTML = ''; // innerHTML = '' : on supprime toutes les anciennes cartes du plateau.

    const deck = shuffle([...LEGUMES6, ...LEGUMES6]); // [...LEGUMES, ...LEGUMES] crée un tableau avec chaque emoji en double (12 éléments). shuffle(...) : on le mélange.

    deck.forEach(symbol => {
        // "symbol" est l'emoji de la carte en cours de création.
        const card = document.createElement('button');
        // On crée un nouveau bouton HTML
        card.className = 'memory-card';
        // On lui donne la classe CSS memory-card pour qu'il ait le bon style.
        card.type = 'button';
        // C'est un simple bouton.
        card.dataset.symbol = symbol;
        // dataset : on stocke l'emoji dans la carte (attribut data-symbol).
        // On s'en servira pour savoir si deux cartes sont identiques.
        card.setAttribute('aria-label', 'Carte face cachée');
        // Texte lu par les lecteurs d'écran.
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front">?</div>
                <div class="card-face card-back">${symbol}</div>
            </div>`;
        // On remplit la carte avec ses deux faces : le dos avec "?" et la face avec l'emoji.

        card.addEventListener('click', () => flip(card));
        // Quand on clique sur cette carte, on appelle la fonction flip(card).

        boardEl.appendChild(card);
        // On ajoute la carte au plateau.
    });
};

// Fonction pour le retournement de carte et vérification de paire.
function flip(card) {
    // Appelée à chaque clic sur une carte. "card" est la carte cliquée.

    if (lock || card === firstCard) return;
    // On ignore le clic si :
    // - le plateau est verrouillé (lock), ou
    // - on clique sur la carte déjà retournée ce tour-ci (card === firstCard).

    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    // On ignore aussi le clic si la carte est déjà retournée ou déjà associée.

    card.classList.add('flipped');
    // On ajoute la classe "flipped" : le CSS fait tourner la carte et montre l'emoji.

    // C'est la première carte du tour.
    if (!firstCard) {
        // Vrai si firstCard est null (aucune carte retournée avant).
        firstCard = card;
        // On mémorise cette carte.
        return;
        // On s'arrête : on attend que le joueur choisisse une deuxième carte.
    }

    // C'est la deuxième carte du tour.
    moves++;
    // Ajoute 1 au nombre de coups
    movesEl.textContent = moves;
    // On met à jour l'affichage des coups.
    lock = true;
    // On verrouille le plateau le temps de comparer et d'animer

    if (card.dataset.symbol === firstCard.dataset.symbol) {
        // On compare les emojis des deux cartes.

        // --- C'est une paire ! ---
        [firstCard, card].forEach(c => {
            // On traite les deux cartes l'une après l'autre (c = la carte en cours).
            c.classList.remove('flipped');
            // On retire "flipped".
            c.classList.add('matched');
            // On ajoute "matched" : la carte reste face visible, en vert.
        });
        matchedPairs++;
        // Une paire de plus trouvée.
        firstCard = null;
        // On remet à zéro pour le prochain tour.
        lock = false;
        // On déverrouille le plateau.

        if (matchedPairs === TOTAL_PAIRS) endGame();
        // Si on a trouvé toutes les paires, la partie est gagnée : on appelle endGame().

    } else {
        // --- Ce n'est pas une paire ---
        const previous = firstCard;
        // On garde la première carte dans une variable à part, car firstCard sera remis à null avant que le délai ne se termine.

        setTimeout(() => {
            // Exécute le code ci-dessous après un délai (ici 1000 ms).
            previous.classList.remove('flipped');
            // On recache la première carte.
            card.classList.remove('flipped');
            // On recache la deuxième carte.
            firstCard = null;
            // Plus de carte en attente.
            lock = false;
            // On déverrouille le plateau.
        }, 1000);
        // 1 seconde, pour laisser le temps de voir les deux cartes
    }
}

// Fonction pour la fin de jeu.
function endGame(){
    setTimeout(() => {
        const answer = confirm(`🎉 Bravo !\nVous avez terminé en ${moves} coups.\nSouhaitez-vous rejouer ?`);
        // Lance un pop-up de victoire après 1 seconde pour avoir le temps de voir la dernière paire.
        if(answer) initGame();
        // Initialise le plateau si le joueur confirme.
    }, 1000);
}

window.onload = initGame(); // Initialise le plateau au chargement de la page.

document.addEventListener('keydown', e => {if (e.code === 'Space') initGame();}); // Initialise le plateau quand on appuie sur espace