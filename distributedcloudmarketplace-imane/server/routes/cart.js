import express from 'express';
import { executeContract } from '../blockchain/contract.js';

const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { cart } = req.body;

  console.log('Received checkout request with cart:', cart);

  try {
    // Logique pour gérer le checkout et interagir avec le contrat intelligent
    const result = await executeContract(cart);
    console.log('Contract execution result:', result);
    res.json(result);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
});

export default router;