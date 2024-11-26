import express from 'express';
import { upload } from '../middlewares/multer.js';
import { handleFileUpload } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', upload.single('file'), handleFileUpload);

export default router;
