import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required!'],
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'Email required!'],
    trim: true, 
    lowercase: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password required!'],
    select: false,
  },
  role: {
    type: String,
    enum: ['applicant', 'employer', 'admin'],
    default: 'applicant',
  },
  accStatus: {  
    type: String,
    enum: ['active', 'suspended', 'banned', 'deactivated'],
    default: active,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLoginAt: {
    type: Date,
    default: null,
  }
}, { timestamps: true });

// Password Hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }

  const salt = await bcrypt.genSalt(13);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
})

//Password Comparison
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};


const User = mongoose.model('User', userSchema);

export default User;