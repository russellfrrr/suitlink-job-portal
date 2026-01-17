import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../components/Auth/Shared/Logo";
import ResetPasswordHeader from "../../components/Auth/ResetPassword/ResetPasswordHeader";
import ResetPasswordForm from "../../components/Auth/ResetPassword/ResetPasswordForm";
import SecurityTipBox from "../../components/Auth/ResetPassword/SecurityTipBox";
import ResetPasswordMarketingSection from "../../components/Auth/ResetPassword/ResetPasswordMarketingSection";
import { authService } from "../../services/authService";

const ResetPassPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const code = location.state?.code;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if no email or code provided
  useEffect(() => {
    if (!email || !code) {
      navigate("/forgot-password");
    }
  }, [email, code, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Debug: Log what we're sending
    console.log("Resetting password with:", {
      email,
      code,
      newPassword: "***hidden***",
    });

    setLoading(true);

    try {
      // Backend validates the code and resets password
      const response = await authService.resetPassword(
        email,
        code,
        newPassword
      );
      console.log("Reset password response:", response);

      // Success - redirect to success page
      navigate("/forgot-password-success", { state: { email } });
    } catch (err) {
      console.error("Reset password error:", err);

      // Check if error is related to invalid/expired code
      const errorMsg = err.message.toLowerCase();
      if (
        errorMsg.includes("does not exist") ||
        errorMsg.includes("invalid") ||
        errorMsg.includes("expired") ||
        errorMsg.includes("code")
      ) {
        // Code is invalid/expired - redirect back to forgot password to get new code
        alert(
          "Your reset code has expired or is invalid. Please request a new code."
        );
        navigate("/forgot-password");
      } else {
        // Other errors (like weak password, etc.)
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Don't render if redirecting
  if (!email || !code) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo to="/login" />
          </div>

          <ResetPasswordHeader email={email} />

          <ResetPasswordForm
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={handleResetPassword}
            loading={loading}
            error={error}
          />

          <SecurityTipBox />
        </div>
      </div>

      <ResetPasswordMarketingSection />
    </div>
  );
};

export default ResetPassPage;
