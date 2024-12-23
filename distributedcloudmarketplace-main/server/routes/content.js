import express from 'express';
import { uploadContent, getAllContents } from '../controllers/contentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });





// Route pour déposer du contenu (aucun fichier, seulement JSON)
router.post('/upload', protect,authorize('provider'),upload.single('file'), // Middleware pour analyser les requêtes JSON
  uploadContent
);

// Route pour récupérer tous les contenus
router.get('/', protect, authorize('user'), getAllContents);

export default router;
