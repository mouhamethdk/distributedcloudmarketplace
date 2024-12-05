import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function TypeWriterEffect() {
  const words = [
    "re:Inventons",
    "re:Construisons",
    "re:Transformons",
    "re:Innovons",
    "re:Évoluons",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const speed = 150; // Vitesse de dactylographie
  const pauseTime = 2000; // Temps de pause entre les mots

  // Utilisation de useTheme pour obtenir le mode du thème (clair ou sombre)
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark"; // Détecte si le mode est sombre

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Ajouter une lettre
      if (charIndex < currentWord.length) {
        setDisplayedText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        // Commencer à effacer après une pause
        setTimeout(() => setIsDeleting(true), pauseTime); // Utiliser pauseTime ici pour le délai
      }
    } else {
      // Effacer une lettre
      if (charIndex > 0) {
        setDisplayedText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        // Passer au mot suivant
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    const timer = setTimeout(() => {}, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentWordIndex, words]);

  // Séparer "re:" et le reste du mot avec ajustement de couleur pour "re:" selon le mode
  const renderWord = (word) => {
    const prefix = word.substring(0, 3); // "re:"
    const restOfWord = word.substring(3); // Le reste du mot

    return (
      <Typography variant="h1" sx={{ display: "inline", fontSize: "clamp(3rem, 10vw, 3.5rem)" }}>
        <Typography
          component="span"
          variant="h1"
          sx={{
            fontSize: "inherit",
            color: isDarkMode ? "white" : "black", // Applique la couleur blanche en mode sombre, sinon noire
          }}
        >
          {prefix}
        </Typography>
        <Typography
          component="span"
          variant="h1"
          sx={{
            fontSize: "inherit",
            color: "primary.main", // Applique la couleur principale du thème au reste du mot
          }}
        >
          {restOfWord}
        </Typography>
      </Typography>
    );
  };

  return (
    <Typography
      variant="h1"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        fontSize: "clamp(3rem, 10vw, 3.5rem)",
      }}
    >
      {renderWord(displayedText)}
    </Typography>
  );
}


// import React, { useState, useEffect } from "react";
// import Typography from "@mui/material/Typography";

// export default function TypeWriterEffect() {
//   const words = [
//     "re:Inventons",
//     "re:Construisons",
//     "re:Transformons",
//     "re:Innovons",
//     "re:Évoluons",
//   ];
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [displayedText, setDisplayedText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [charIndex, setCharIndex] = useState(0);
//   const speed = 150; // Vitesse de dactylographie
//   const pauseTime = 2000; // Temps de pause entre les mots

//   useEffect(() => {
//     const currentWord = words[currentWordIndex];

//     if (!isDeleting) {
//       // Ajouter une lettre
//       if (charIndex < currentWord.length) {
//         setDisplayedText(currentWord.substring(0, charIndex + 1));
//         setCharIndex((prev) => prev + 1);
//       } else {
//         // Commencer à effacer après une pause
//         setTimeout(() => setIsDeleting(true), pauseTime); // Utiliser pauseTime ici pour le délai
//       }
//     } else {
//       // Effacer une lettre
//       if (charIndex > 0) {
//         setDisplayedText(currentWord.substring(0, charIndex - 1));
//         setCharIndex((prev) => prev - 1);
//       } else {
//         // Passer au mot suivant
//         setIsDeleting(false);
//         setCurrentWordIndex((prev) => (prev + 1) % words.length);
//       }
//     }

//     const timer = setTimeout(() => {}, speed);
//     return () => clearTimeout(timer);
//   }, [charIndex, isDeleting, currentWordIndex, words]);

//   // Séparer "re:" et le reste du mot
//   const renderWord = (word) => {
//     const prefix = word.substring(0, 3); // "re:"
//     const restOfWord = word.substring(3); // Le reste du mot
//     return (
//       <Typography variant="h1" sx={{ display: 'inline', fontSize: 'clamp(3rem, 10vw, 3.5rem)' }}>
//         <Typography
//           component="span"
//           variant="h1"
//           sx={{
//             fontSize: 'inherit',
//             color: 'black', // Applique la couleur noire au "re:"
//           }}
//         >
//           {prefix}
//         </Typography>
//         <Typography
//           component="span"
//           variant="h1"
//           sx={{
//             fontSize: 'inherit',
//             color: 'primary.main', // Applique la couleur principale du thème au reste du mot
//           }}
//         >
//           {restOfWord}
//         </Typography>
//       </Typography>
//     );
//   };

//   return (
//     <Typography
//       variant="h1"
//       sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         alignItems: 'center',
//         fontSize: 'clamp(3rem, 10vw, 3.5rem)',
//       }}
//     >
//       {renderWord(displayedText)}
//     </Typography>
//   );
// }








// import React, { useState, useEffect } from "react";
// import Typography from "@mui/material/Typography";

// export default function TypeWriterEffect() {
//   const words = [
//     "re:Inventons",
//     "re:Construisons",
//     "re:Transformons",
//     "re:Innovons",
//     "re:Évoluons",
//   ];
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [displayedText, setDisplayedText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [charIndex, setCharIndex] = useState(0);
//   const speed = 150; // Vitesse de dactylographie (ajuster pour le temps de frappe)
//   const pauseTime = 2000; // Temps de pause entre les mots (2 secondes)

//   useEffect(() => {
//     const currentWord = words[currentWordIndex];

//     if (!isDeleting) {
//       // Ajouter une lettre
//       if (charIndex < currentWord.length) {
//         setDisplayedText(currentWord.substring(0, charIndex + 1));
//         setCharIndex((prev) => prev + 1);
//       } else {
//         // Commencer à effacer après une pause
//         setTimeout(() => setIsDeleting(true), pauseTime); // Utiliser pauseTime ici pour le délai
//       }
//     } else {
//       // Effacer une lettre
//       if (charIndex > 0) {
//         setDisplayedText(currentWord.substring(0, charIndex - 1));
//         setCharIndex((prev) => prev - 1);
//       } else {
//         // Passer au mot suivant
//         setIsDeleting(false);
//         setCurrentWordIndex((prev) => (prev + 1) % words.length);
//       }
//     }

//     const timer = setTimeout(() => {}, speed);
//     return () => clearTimeout(timer);
//   }, [charIndex, isDeleting, currentWordIndex, words]);

//   return (
//     <Typography
//       variant="h1"
//       sx={{
//         fontSize: "clamp(3rem, 10vw, 3.5rem)",
//         color: "primary.main",
//       }}
//     >
//       {displayedText}
//     </Typography>
//   );
// }
