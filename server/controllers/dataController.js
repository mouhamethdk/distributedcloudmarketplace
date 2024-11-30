import mongoose from "mongoose";

// Connexion à la base de données cible "datas"
const targetConnection = mongoose.connection.useDb("datas");

// Fonction pour gérer l'import d'un fichier CSV en tant que binaire
export const uploadCSV = async (req, res) => {
    const file = req.file; // Gestion d'un seul fichier

    if (!file) {
        return res.status(400).json({ error: "Aucun fichier fourni." });
    }

    try {
        const collection = targetConnection.collection("files");

        // Sauvegarder le fichier dans MongoDB
        const fileDocument = {
            filename: file.originalname,
            content: file.buffer, // Contenu binaire du fichier
            type: "datas",
            uploadedAt: new Date(),
        };

        await collection.insertOne(fileDocument);

        res.json({ message: `Fichier "${file.originalname}" importé avec succès dans la base "datas".` });
    } catch (err) {
        console.error("Erreur lors de la sauvegarde du fichier :", err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};
