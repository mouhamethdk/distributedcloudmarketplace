// filepath: /Users/emmanuellaodounlami/Documents/distributedcloudmarketplace-main/server/index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import applicationRoutes from './routes/application.js';
import hardwareRoutes from './routes/hardware.js'; // Import des routes hardware
import contentRoutes from './routes/content.js';
import cartRoutes from './routes/cart.js'; 
import cors from 'cors';
dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Connection error:', error);
    process.exit(1); // Arrête le serveur en cas d'erreur de connexion
  });

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/application', applicationRoutes);
app.use('/hardware', hardwareRoutes); // Ajout des routes hardware
app.use('/api/cart', cartRoutes);
app.use('/content', contentRoutes); // Utiliser les routes de contenu

// Middleware pour afficher les requêtes reçues
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});