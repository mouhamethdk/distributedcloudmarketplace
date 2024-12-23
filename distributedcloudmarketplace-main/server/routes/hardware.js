import express from 'express';
import multer from 'multer';
import { uploadHardware, getAllHardware } from '../controllers/hardwareController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

// Middleware Multer pour gérer les fichiers (ici non nécessaire, car pas d'upload de fichiers pour hardware)
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour importer les détails du matériel
router.post("/upload", protect, authorize('provider'), upload.none(), uploadHardware);

// Route pour récupérer tous les matériels
router.get("/all", protect, authorize('user', 'provider'), getAllHardware);

export default router;