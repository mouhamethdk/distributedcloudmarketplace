import express from 'express';
import multer from 'multer';
import {authenticateToken} from '../middleware/authenticateToken.js'; // Your token verification middleware
import { uploadCSV , getAllData} from '../controllers/dataController.js';

// Configuration de multer pour gérer les fichiers
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour importer un fichier CSV
router.post('/upload', authenticateToken, upload.single('file'), uploadCSV);

// Route pour récupérer toutes les données
router.get('/all', getAllData);

export default router;
