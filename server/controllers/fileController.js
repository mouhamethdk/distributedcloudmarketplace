import mongoose from 'mongoose';
import path from 'path';

// Modèles MongoDB
const DataModel = mongoose.model('Data');
const ApplicationModel = mongoose.model('Application');

export const handleFileUpload = async (req, res) => {
  const file = req.file;
  const { fileType } = req.body;

  if (!file || !fileType) {
    return res.status(400).json({ error: 'Fichier ou type de fichier manquant.' });
  }

  const filePath = file.path;
  const fileName = file.originalname;

  try {
    if (fileType === 'dataset') {
      await DataModel.create({ name: fileName, filePath });
      return res.status(200).json({ message: 'Jeu de données ajouté avec succès dans "datas".' });
    } else if (fileType === 'application') {
      await ApplicationModel.create({ name: fileName, filePath });
      return res.status(200).json({ message: 'Application ajoutée avec succès dans "applications".' });
    } else {
      return res.status(400).json({ error: 'Type de fichier non supporté.' });
    }
  } catch (error) {
    console.error('Erreur lors de l’insertion dans MongoDB:', error);
    return res.status(500).json({ error: 'Erreur serveur lors du traitement du fichier.' });
  }
};
