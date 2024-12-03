import express from 'express';
import multer from 'multer';
import { uploadCSV, getAllData } from '../controllers/dataController.js';
import Data from '../models/Data.js';

// Configuration de multer pour gérer les fichiers
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour importer un fichier CSV
router.post('/upload', upload.single('file'), uploadCSV);

// Route pour récupérer toutes les données
router.get('/all', getAllData);

// Route pour récupérer toutes les données (nouvelle fonctionnalité)
router.get('/', async (req, res) => {
  try {
    const dataFiles = await Data.find();
    res.json(dataFiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour ajouter une nouvelle donnée (optionnel)
router.post('/', async (req, res) => {
  const data = new Data({
    filename: req.body.filename,
    code: req.body.code,
    // Ajoutez d'autres champs si nécessaire
  });

  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;