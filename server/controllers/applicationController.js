import mongoose from "mongoose";

// Sélectionnez la base de données spécifique
const targetConnection = mongoose.connection.useDb("applications");

// Fonction pour gérer l'import d'un fichier unique
export const uploadApplication = async (req, res) => {
    const file = req.file; // Gestion d'un seul fichier
    const { description } = req.body; // Récupération de la description

    if (!file) {
        return res.status(400).json({ error: "Aucun fichier fourni." });
    }

    if (!description) {
        return res.status(400).json({ error: "Une description est requise pour les applications." });
    }

    try {
        const collection = targetConnection.collection("files");

        // Sauvegarder le fichier dans MongoDB
        const fileDocument = {
            filename: file.originalname,
            content: file.buffer,
            type: "application",
            description,
            uploadedAt: new Date(),
        };

        await collection.insertOne(fileDocument);

        res.json({ message: `Fichier "${file.originalname}" importé avec succès.` });
    } catch (err) {
        console.error("Erreur lors de la sauvegarde du fichier :", err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};
