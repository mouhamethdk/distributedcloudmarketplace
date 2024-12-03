import mongoose from "mongoose";

// Select the specific database
const targetConnection = mongoose.connection.useDb("applications");

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

// Récupérer tous les matériels (hardware)
export const getAllHardware = async (req, res) => {
    try {
        const collection = targetConnection.collection("hardwareDetails");

        // Récupérer tous les documents de la collection "hardwareDetails"
        const hardwareDetails = await collection.find().toArray();
        console.log("Matériels récupérés :", hardwareDetails);
        res.json(hardwareDetails);
    } catch (err) {
        console.error("Erreur lors de la récupération des matériels :", err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};
