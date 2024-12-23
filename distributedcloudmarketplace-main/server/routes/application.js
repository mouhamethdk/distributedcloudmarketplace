import express from 'express';
import multer from 'multer';
import { uploadApplication, getAllApplications } from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

// Middleware Multer pour les fichiers
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route pour l'import des applications
router.post("/upload", protect, authorize('provider'),  upload.single("file"), uploadApplication);

// Route pour récupérer toutes les applications
router.get("/all", protect, authorize('user', 'provider'), getAllApplications);

export default router;