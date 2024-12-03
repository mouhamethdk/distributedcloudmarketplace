import express from 'express';
import multer from 'multer';
import { uploadApplication, getAllApplications } from '../controllers/applicationController.js';

// Middleware Multer pour les fichiers
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour l'import des applications
router.post("/upload", upload.single("file"), uploadApplication);

// Route pour récupérer toutes les applications
router.get("/all", getAllApplications);

export default router;
