import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/protected', protect, authorize('provider'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour les providers' });
});

export default router;