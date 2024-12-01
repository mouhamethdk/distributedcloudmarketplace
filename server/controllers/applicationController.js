import mongoose from "mongoose";

// Sélectionner la base de données spécifique
const targetConnection = mongoose.connection.useDb("applications");

// Fonction pour gérer l'import d'un fichier 
export const uploadApplication = async (req, res) => {
    const file = req.file; 
    const { description } = req.body; 
    
    // Vérifier si le fichier est présent et si la description est fournie
    if (!file || !description) {
        return res.status(400).json({ error: "Please provide both a file and a description for applications." });
    }

    try {
        // Enregistrer le fichier dans MongoDB 
        const collection = targetConnection.collection("files");

        const fileDocument = {
            filename: file.originalname,
            content: file.buffer,
            type: "application", 
            description,
            uploadedAt: new Date(),
        };

        await collection.insertOne(fileDocument);
        return res.json({ message: `File "${file.originalname}" successfully uploaded.` });
    } catch (err) {
        console.error("Error while saving the file:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

// Hardware Import
export const uploadHardware = async (req, res) => {
    const { os, cpu, gpu, ram, storage } = req.body; 

    //Check the hardware details
    if (!os || !cpu || !gpu || !ram || !storage) {
        return res.status(400).json({ error: "Please provide all hardware details (OS, CPU, GPU, RAM, Storage)." });
    }

    try {
        // Save the hardware in MongoDB 
        const hardwareCollection = targetConnection.collection("hardwareDetails");

        const hardwareDocument = {
            os,
            cpu,
            gpu,
            ram,
            storage,
            type: "hardware",
            uploadedAt: new Date(),
        };

        await hardwareCollection.insertOne(hardwareDocument);
        return res.json({ message: "Hardware details successfully uploaded." });
    } catch (err) {
        console.error("Error while saving hardware details:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};
