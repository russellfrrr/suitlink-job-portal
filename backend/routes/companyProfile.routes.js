import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import { companyLogoUpload } from '../config/companyLogoUpload.config.js';

import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  uploadCompanyLogo
} from '../controllers/companyProfile.controller.js';

const companyProfileRouter = Router();

companyProfileRouter.post('/profile', requireAuth, createProfile);
companyProfileRouter.get('/profile', requireAuth, getProfile);
companyProfileRouter.patch('/profile', requireAuth, updateProfile);
companyProfileRouter.delete('/profile', requireAuth, deleteProfile);
companyProfileRouter.put('/profile/logo', requireAuth, companyLogoUpload.single('logo'), uploadCompanyLogo);

export default companyProfileRouter;