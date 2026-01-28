import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const JOBS_API_URL = `${API_BASE_URL}/jobs`;

// Configure axios defaults
axios.defaults.withCredentials = true;

const jobsApi = axios.create({
  baseURL: JOBS_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for consistent error handling
jobsApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export default jobsApi;
