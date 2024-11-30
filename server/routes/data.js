import express from 'express';
import multer from 'multer';
import { uploadCSV } from '../controllers/dataController.js';

// Configuration de multer pour gérer les fichiers
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Route pour importer un fichier CSV
router.post('/upload', upload.single('file'), uploadCSV);

export default router;
