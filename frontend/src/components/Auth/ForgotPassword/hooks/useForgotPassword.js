import { useState } from "react";
import { authService } from "../../../../services/authService";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const sendResetCode = async (email) => {
    setError("");
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resendResetCode = async (email, resetCode) => {
    setError("");
    setResending(true);

    try {
      await authService.resendResetPassword(email);
      resetCode();
      
      // Show success notification
      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50";
      successMsg.innerHTML = `<p class="text-sm text-green-600">Reset code resent successfully!</p>`;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
      
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setResending(false);
    }
  };

  return {
    loading,
    error,
    resending,
    sendResetCode,
    resendResetCode,
    setError,
  };
};

export default useForgotPassword;
