import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  filename: { type: String, required: true },
  content: { type: Buffer, required: true },
  type: { type: String, required: true, default: 'datas' },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Data', dataSchema);