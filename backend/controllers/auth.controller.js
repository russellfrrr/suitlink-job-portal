import AuthService from "../services/auth.service.js";
import { sendVerificationEmail } from "../services/mail.service.js";

/* 
  ENDPOINTS:
  POST /register
  POST /verify-email
  POST /resend-verification
  POST /login
  POST /logout
*/

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { userId, verificationCode } = await AuthService.register(name, email, password);
    await sendVerificationEmail(email, verificationCode);

    const responseObj = {
      success: true,
      message: 'Registration successful. Please verify your email.',
    };

    res.status(201).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const { token } = await AuthService.verifyEmail(email, code);

    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    const responseObj = {
      success: true,
      message: 'Email verified successfully. You are now logged in.',
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const { verificationCode } = await AuthService.resendVerification(email);
    await sendVerificationEmail(email, verificationCode);

    const responseObj = {
      success: true,
      message: 'Verification code has been resent. Please check your email.',
    };

    res.status(200).json(responseObj);


  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    })

    const responseObj = {
      success: true,
      message: 'Logged in successfully!',
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

const logout = async (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    })

    const responseObj = {
      success: true,
      message: 'Logged out successfully!',
    };

    res.status(200).json(responseObj); 
}