import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  filename: String,
  description: String,
  // Ajoutez d'autres champs si nécessaire
});

export default mongoose.model('Application', applicationSchema);