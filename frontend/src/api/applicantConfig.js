import axios from "axios";
import { ENDPOINTS } from "../api/api.config";

const applicantApi = axios.create({
  baseURL: ENDPOINTS.APPLICANT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
applicantApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export default applicantApi;
