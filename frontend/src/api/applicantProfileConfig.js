import axios from "axios";
import { ENDPOINTS } from "../config/api.config";

// Create axios instance with credentials
const applicantProfileApi = axios.create({
  baseURL: ENDPOINTS.APPLICANT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
applicantProfileApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export default applicantProfileApi;
