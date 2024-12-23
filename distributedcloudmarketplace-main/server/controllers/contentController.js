import mongoose from 'mongoose';
import crypto from 'crypto';
import { addContent } from '../blockchain/attestation.js';

const targetConnection = mongoose.connection.useDb("attestations");

// Fonction pour gérer le dépôt de contenu
export const uploadContent = async (req, res) => {
    const file = req.file; // Handling a single file;
    console.log('Uploading content:', req.file);
    console.log('Uploading content:', req.body);

    console.log('Uploading content:', file.buffer);
    const fileContent = file.buffer;
    const fileName = file.originalname;
    const { type: fileType } = req.body; 

    console.log('File name:', fileName);
    console.log('File type:', fileType);

    if (!fileName || !fileType) {
        return res.status(400).json({ error: 'File name and type are required' });
    }

    try {
        console.log('File content:', fileContent);
        const contentHash = crypto.createHash('sha256').update(fileContent).digest('hex');
        console.log('Generated contentHash:', contentHash);

        // Enregistrer le contenu sur la blockchain
        const username = req.user.name;

        const result = await addContent(contentHash, fileType, username, fileName);
        console.log('Blockchain attestation result:', result);

        // Enregistrer le contenu dans la base de données
        const newContent = {
            username,
            contentHash,
            name: fileName,
            fileType,
            createdAt: new Date(),
        };

        console.log('Saving content to MongoDB:', newContent);
        const collection = targetConnection.collection("attestation");
        await collection.insertOne(newContent);
        console.log('Content saved to MongoDB successfully');

       res.status(201).json({ message: 'Content uploaded and attested successfully', content: newContent });
    } catch (error) {
        console.error('Error uploading content:', error);
        res.status(500).json({ error: 'Failed to upload content' });
    }
};

// Récupérer tous les contenus
export const getAllContents = async (req, res) => {
    try {
        const collection = targetConnection.collection("content");

        // Récupérer tous les documents de la collection "content"
        const contents = await collection.find().toArray();
        console.log("Contents retrieved:", contents);
        res.json(contents);
    } catch (error) {
        console.error("Error retrieving contents:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
