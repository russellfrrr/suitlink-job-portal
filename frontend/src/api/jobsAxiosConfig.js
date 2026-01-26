import axios from "axios";
import { ENDPOINTS } from "./api.config";

// Configure axios defaults
axios.defaults.withCredentials = true;

const jobsApi = axios.create({
  baseURL: ENDPOINTS.JOBS,
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
