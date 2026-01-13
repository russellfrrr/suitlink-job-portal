import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  fileName: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;