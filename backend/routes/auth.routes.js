import { Router } from 'express';

import {
  register,
  verifyEmail,
  resendVerification,
  login,
  logout
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/resend-verification', resendVerification);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;