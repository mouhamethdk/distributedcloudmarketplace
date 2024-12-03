import mongoose from "mongoose";

// Définir le schéma du matériel
const hardwareSchema = new mongoose.Schema({
    os: {
        type: String,
        required: true,
    },
    cpu: {
        type: String,
        required: true,
    },
    gpu: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    storage: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "hardware",
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

// Créer un modèle basé sur le schéma
const Hardware = mongoose.model("Hardware", hardwareSchema);

// Exporter le modèle
export default Hardware;
