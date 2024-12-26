import express from 'express';
import multer from 'multer';
import {authenticateToken} from '../middleware/authenticateToken.js'; // Your token verification middleware
import { uploadHardware, getAllHardware } from '../controllers/hardwareController.js';

// Middleware Multer pour gérer les fichiers (ici non nécessaire, car pas d'upload de fichiers pour hardware)
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour importer les détails du matériel
router.post("/upload", authenticateToken, upload.none(), uploadHardware);

// Route pour récupérer tous les matériels
router.get("/all", getAllHardware);

export default router;
