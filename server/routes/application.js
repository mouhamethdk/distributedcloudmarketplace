import express from 'express';
import multer from 'multer';
import { uploadApplication } from '../controllers/applicationController.js';

// Middleware Multer pour les fichiers
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour l'import des applications
router.post("/upload", upload.single("file"), uploadApplication);

export default router;
