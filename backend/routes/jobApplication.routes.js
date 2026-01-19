import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import requireRole from '../middlewares/requireRole.middleware.js';

import {
  applyToJob,
  getApplicantsByJob,
  getApplicationDetail,
  updateApplicationStatus,
  getMyApplications,
} from '../controllers/jobApplication.controller.js';

/*
  ENDPOINTS (api/v1/applications)
    POST /
    GET /me
    GET /job/:jobPostingId
    GET /:applicationId
    PATCH /:applicationId/status
*/

const jobApplicationRouter = Router();

jobApplicationRouter.use(requireAuth);

jobApplicationRouter.post('/', requireRole('applicant'), applyToJob);
jobApplicationRouter.get('/me', requireRole('applicant'), getMyApplications);
jobApplicationRouter.get('/job/:jobPostingId', requireRole('employer'), getApplicantsByJob);
jobApplicationRouter.get('/:applicationId', requireRole('employer'), getApplicationDetail);
jobApplicationRouter.patch('/:applicationId/status', requireRole('employer'), updateApplicationStatus);

export default jobApplicationRouter;
