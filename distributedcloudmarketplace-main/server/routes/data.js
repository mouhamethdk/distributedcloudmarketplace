import express from 'express';
import multer from 'multer';
import { uploadCSV , getAllData} from '../controllers/dataController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

// Configuration de multer pour gérer les fichiers
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour importer un fichier CSV
router.post('/upload',protect, authorize('provider'), upload.single('file'), uploadCSV);

// Route pour récupérer toutes les données
router.get('/all', protect, authorize('user', 'provider'), getAllData);

export default router;
