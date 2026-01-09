import User from '../models/User.js';
import generateToken from './token.service.js';

class AuthService {

  // Registration
  static async register(name, email, password) {
    const exists = await User.findOne({ email });

    if (exists) {
      throw new Error('Email already exists!');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const userReg = {
      name,
      email,
      passwordHash: password,
      isEmailVerified: false,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: verificationExpiry,
    };

    const user = await User.create(userReg);
  
    return { userId: user._id, email: user.email, verificationCode };
  }

  // Email verification
  static async verifyEmail(email, code) {
    const user = await User.findOne({ email }).select('+emailVerificationCode');

    if (!user) {
      throw new Error('User not found!');
    }

    if (user.isEmailVerified) {
      throw new Error('Email already verified!');
    }

    if (!user.emailVerificationCode || user.emailVerificationCode !== code) {
      throw new Error('Invalid verification code!');
    }

    if (user.emailVerificationExpires < Date.now()) {
      throw new Error('Verification code expired!');
    }

    user.isEmailVerified = true;
    user.emailVerifiedAt = new Date();
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    const token = generateToken(user._id);
    return { user, token };
  }

  // Resend Verification Code
  static async resendVerification(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found!');
    }

    if (user.isEmailVerified) {
      throw new Error('Email already verified!');
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpiry = new Date(Date.now() + 15 * 60 * 1000);

    user.emailVerificationCode = newCode;
    user.emailVerificationExpires = newExpiry;
    await user.save();

    return { email: user.email, verificationCode: newCode };
  }

  // Logging In
  static async login(email, password) {
    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
      throw new Error('User not found!');
    }

    if (user.accStatus !== 'active') {
      throw new Error('Account not active!');
    }

    if (!user.isEmailVerified) {
      throw new Error('Please verify your email first!');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password!');
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user._id);
    return { user, token };
  }
}

export default AuthService;
