import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const APPLICATION_API_URL = `${API_BASE_URL}/applications`;

const employerApplicationsApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
employerApplicationsApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export const employerApplicationsService = {
  // Get applicants for a specific job (employer only)
  getApplicantsByJob: async (jobPostingId) => {
    return employerApplicationsApi.get(`/job/${jobPostingId}`);
  },

  // Update application status (employer only)
  updateApplicationStatus: async (applicationId, status) => {
    return employerApplicationsApi.patch(`/${applicationId}/status`, {
      status,
    });
  },

  getApplicantDetail: async (applicationId) => {
    return employerApplicationsApi.get(`/${applicationId}`);
  },
};

export default employerApplicationsService;
