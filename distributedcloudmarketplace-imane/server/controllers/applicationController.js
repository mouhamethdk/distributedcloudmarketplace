import mongoose from "mongoose";

// Select the specific database
const targetConnection = mongoose.connection.useDb("applications");

// Function to handle the import of a single file
export const uploadApplication = async (req, res) => {
    const file = req.file; // Handling a single file
    const { description } = req.body; // Get the description

    if (!file) {
        return res.status(400).json({ error: "No file provided." });
    }

    if (!description) {
        return res.status(400).json({ error: "A description is required for applications." });
    }

    try {
        const collection = targetConnection.collection("files");

        // Save the file in MongoDB
        const fileDocument = {
            filename: file.originalname,
            content: file.buffer,
            type: "application",
            description,
            uploadedAt: new Date(),
        };

        await collection.insertOne(fileDocument);

        res.json({ message: `File "${file.originalname}" successfully uploaded.` });
    } catch (err) {
        console.error("Error while saving the file:", err);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Récupérer toutes les applications
export const getAllApplications = async (req, res) => {
    try {
        const collection = targetConnection.collection("files");

        // Récupérer tous les documents de la collection "files"
        const files = await collection.find().toArray();
        console.log("Fichiers récupérés :", files);
        res.json(files);
    } catch (err) {
        console.error("Erreur lors de la récupération des fichiers :", err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};