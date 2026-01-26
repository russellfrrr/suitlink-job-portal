import axios from "axios";
import { ENDPOINTS } from "./api.config";

const notificationsApi = axios.create({
  baseURL: ENDPOINTS.NOTIFICATIONS,
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

export default notificationsApi;
