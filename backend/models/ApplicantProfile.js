import mongoose from 'mongoose';
import Education from './subdocuments/Education.js';
import Experience from './subdocuments/Experience.js';
import Resume from './subdocuments/Resume.js';

const applicantProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name required!'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name required!'],
  },
  education: [Education],
  experience: [Experience],
  skills: {
    type: [String],
    default: [],
  },
  resumes: [Resume],
  profileImage: {
    publicId: String,
    url: String,
  },
  resumeParsed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const ApplicantProfile = mongoose.model('ApplicantProfile', applicantProfileSchema);

export default ApplicantProfile;