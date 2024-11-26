import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import cors from 'cors';



dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
// Connexion à MongoDB sans les options obsolètes
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
