import express from 'express';
import { addToCart, getCart, checkout } from '../controllers/cartController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour ajouter un élément au panier
router.post('/add', protect, authorize('user'), addToCart);

// Route pour récupérer le panier de l'utilisateur
router.get('/', protect, authorize('user'), getCart);

// Route pour gérer le checkout et interagir avec le contrat intelligent
router.post('/checkout', protect, authorize('user'), checkout);

export default router;