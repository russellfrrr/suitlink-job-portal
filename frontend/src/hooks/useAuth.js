import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);

      const response = await authService.getCurrentUser();

      if (response?.success && response?.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      // Suppress 401 errors (user not logged in - expected behavior)
      if (err.status !== 401 && err.response?.status !== 401) {
        console.error("Auth check failed:", err);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isEmployer: user?.role === "employer",
    isApplicant: user?.role === "applicant",
    checkAuth,
    logout,
  };
};

export default useAuth;
