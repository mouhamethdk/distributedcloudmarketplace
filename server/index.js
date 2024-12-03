import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import applicationRoutes from './routes/application.js';
import hardwareRoutes from './routes/hardware.js'; // Import des routes hardware

import cors from 'cors';

dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/application', applicationRoutes);
app.use('/hardware', hardwareRoutes); // Ajout des routes hardware

// Middleware pour afficher les requêtes reçues
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request received at ${new Date().toISOString()}`
  );
  next();
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
