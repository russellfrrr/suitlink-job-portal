import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const JOB_API_URL = `${API_BASE_URL}/jobs`;

// Create axios instance for job-specific endpoints
const jobsApi = axios.create({
  baseURL: JOB_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
jobsApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export const jobService = {
  // Create a new job posting
  createJob: async (jobData) => {
    return jobsApi.post("/", jobData);
  },

  // Update existing job
  updateJob: async (jobId, jobData) => {
    return jobsApi.patch(`/${jobId}`, jobData);
  },

  // Get job by ID
  getJobById: async (jobId) => {
    return jobsApi.get(`/${jobId}`);
  },

  // Get all jobs for current employer (CORRECTED)
  getMyJobs: async (params = {}) => {
    return jobsApi.get("/my-jobs", { params });
  },

  // Delete job
  deleteJob: async (jobId) => {
    return jobsApi.delete(`/${jobId}`);
  },

  // Close job posting
  closeJob: async (jobId) => {
    return jobsApi.patch(`/${jobId}/close`);
  },

  // Reopen closed job posting
  reopenJob: async (jobId) => {
    return jobsApi.patch(`/${jobId}/open`);
  },

  // Get all jobs (public browsing)
  getJobs: async (params = {}) => {
    return jobsApi.get("/", { params });
  },
};

export default jobService;
