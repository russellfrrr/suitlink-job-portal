import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;