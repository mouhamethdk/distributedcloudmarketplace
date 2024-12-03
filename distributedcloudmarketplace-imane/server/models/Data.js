import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  filename: String,
  code: String,
  // Ajoutez d'autres champs si nécessaire
});

export default mongoose.model('Data', dataSchema);