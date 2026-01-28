import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const APPLICANT_PROFILE_API_URL = `${API_BASE_URL}/applicant`;

// Create axios instance with credentials
const applicantProfileApi = axios.create({
  baseURL: APPLICANT_PROFILE_API_URL,
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
