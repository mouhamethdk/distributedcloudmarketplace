/* ---------------- Navbar ---------------- */




/* ---------------- Header ---------------- */


// Liste des mots à alterner
const words = ["re:Inventons", "re:Construisons", "re:Transformons", "re:Innovons", "re:Évoluons"];
let currentWordIndex = 0;
let isDeleting = false;
let i = 0;  // Index pour l'écriture et l'effacement du mot
let speed = 150;  // Vitesse identique pour l'écriture et l'effacement

// Fonction pour effacer et écrire un mot
function typeWriterEffect() {
    const changingWordElement = document.getElementById("changingWord");
    const currentWord = words[currentWordIndex];

    // Si nous ne sommes pas en train d'effacer
    if (!isDeleting) {
        // Ajouter une lettre
        changingWordElement.textContent = currentWord.substring(0, i + 1);
        i++;

        // Si tout le mot est écrit, commencer à effacer après une pause
        if (i === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriterEffect, 1000); // Pause avant de commencer à effacer
        } else {
            setTimeout(typeWriterEffect, speed); // Vitesse d'écriture
        }
    } else {
        // Effacer une lettre
        changingWordElement.textContent = currentWord.substring(0, i - 1);
        i--;

        // Si tout le mot est effacé, passer au mot suivant
        if (i === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;  // Passer au mot suivant
            setTimeout(typeWriterEffect, 500); // Pause avant de commencer à écrire le prochain mot
        } else {
            setTimeout(typeWriterEffect, speed); // Vitesse d'effacement
        }
    }
}

// Appeler la fonction pour démarrer l'effet
typeWriterEffect();



/* ---------------- Body ---------------- */




/* ---------------- Footer ---------------- */



