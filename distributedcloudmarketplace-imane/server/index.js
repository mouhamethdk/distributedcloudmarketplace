import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import applicationRoutes from './routes/application.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js'; // Assurez-vous que cette ligne est présente

dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/application', applicationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // Assurez-vous que cette ligne est présente

// Afficher les requêtes qui sont reçues par le serveur
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request received at ${new Date().toISOString()}`
  );
  next();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));