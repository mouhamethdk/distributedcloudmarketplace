import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
});

export default mongoose.model('Application', applicationSchema);