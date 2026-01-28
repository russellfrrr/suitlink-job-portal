import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const APPLICATION_API_URL = `${API_BASE_URL}/applications`;

// Configure axios defaults
axios.defaults.withCredentials = true;

const applicationsApi = axios.create({
  baseURL: APPLICATION_API_URL,
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
