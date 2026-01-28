import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const NOTIFICATION_API_URL = `${API_BASE_URL}/notifications`;

const notificationsApi = axios.create({
  baseURL: NOTIFICATION_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
notificationsApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export default notificationsApi
