import express from 'express';
import multer from 'multer';
import { uploadApplication, uploadHardware } from '../controllers/applicationController.js';

// Middleware Multer pour gérer les fichiers
const upload = multer({ storage: multer.memoryStorage() }); 

const router = express.Router();

// Route pour l'import des applications 
router.post("/application/upload", upload.single("file"), uploadApplication);

// Route for hardware import
router.post("/hardware/upload", upload.none(), uploadHardware); 

export default router;
