import axios from "axios";
import { ENDPOINTS } from "./api.config";

// Configure axios defaults
axios.defaults.withCredentials = true;

const applicationsApi = axios.create({
  baseURL: ENDPOINTS.APPLICATIONS,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
applicationsApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export default applicationsApi;
