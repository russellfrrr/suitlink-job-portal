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
    await transporter(email, verificationCode)

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
