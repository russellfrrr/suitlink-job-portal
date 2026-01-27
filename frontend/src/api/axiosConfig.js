import axios from "axios";

// Generic API base - use env variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8888/api/v1";

// Axios instance with default config for general API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 304) {
      console.warn("Received 304 Not Modified - data may be stale");
      return null;
    }

    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
);

export default api;
