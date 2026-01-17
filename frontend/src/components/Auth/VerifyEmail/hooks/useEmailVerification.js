import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../../services/authService";

const useEmailVerification = (email, resetCode, initialError = "", initialSuccess = "") => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [success, setSuccess] = useState(initialSuccess);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (verificationCode) => {
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.verifyEmail(email, verificationCode);
      navigate("/verify-email-success", { state: { email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setSuccess("");
    setResending(true);

    try {
      await authService.resendVerification(email);
      resetCode();
      setSuccess("Verification code resent successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return {
    loading,
    error,
    success,
    resending,
    handleSubmit,
    handleResendCode,
    setError,
    setSuccess,
  };
};

export default useEmailVerification;
