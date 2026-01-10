import { Router } from 'express';

import {
  register,
  verifyEmail,
  resendVerification,
  login,
  logout,
  forgotPassword,
  resetPassword,
  resendResetPassword
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/resend-verification', resendVerification);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/resend-reset-password', resendResetPassword);

export default authRouter;