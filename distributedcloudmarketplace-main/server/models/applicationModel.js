import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  content: { type: Buffer, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Application', applicationSchema);