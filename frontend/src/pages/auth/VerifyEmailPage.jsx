import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../components/Auth/Shared/Logo";
import ErrorMessage from "../../components/Auth/Shared/ErrorMessage";
import SuccessMessage from "../../components/Auth/Shared/SuccessMessage";
import VerificationHeader from "../../components/Auth/VerifyEmail/VerificationHeader";
import VerificationCodeInput from "../../components/Auth/VerifyEmail/VerificationCodeInput";
import ResendCodeButton from "../../components/Auth/VerifyEmail/ResendCodeButton";
import SecurityTipBox from "../../components/Auth/VerifyEmail/SecurityTipBox";
import VerificationMarketingSection from "../../components/Auth/VerifyEmail/VerificationMarketingSection";
import useVerificationCode from "../../components/Auth/VerifyEmail/hooks/useVerificationCode";
import useEmailVerification from "../../components/Auth/VerifyEmail/hooks/useEmailVerification";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const fromLogin = location.state?.fromLogin || false;
  const initialMessage = location.state?.message || "";
  const initialError = location.state?.error || "";

  const {
    code,
    inputRefsArray,
    handleChange,
    handleKeyDown,
    handlePaste,
    resetCode,
    isCodeComplete,
  } = useVerificationCode();

  const {
    loading,
    error,
    success,
    resending,
    handleSubmit,
    handleResendCode,
    setSuccess,
  } = useEmailVerification(email, resetCode, initialError, initialMessage);

  // Clear success message after a few seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    await handleSubmit(verificationCode);
  };

  // Redirect if no email provided
  if (!email) {
    navigate("/signup");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          <Logo />

          <VerificationHeader email={email} fromLogin={fromLogin} />

          <SuccessMessage message={success} />
          <ErrorMessage message={error} />

          {/* Verification Form */}
          <form className="space-y-6" onSubmit={onSubmit}>
            <VerificationCodeInput
              code={code}
              inputRefsArray={inputRefsArray}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              handlePaste={handlePaste}
              disabled={loading}
            />

            {/* Verify Button */}
            <button
              type="submit"
              disabled={!isCodeComplete || loading}
              className={`w-full py-2.5 rounded-lg transition-opacity text-sm font-medium ${
                isCodeComplete && !loading
                  ? "text-white hover:opacity-90"
                  : "cursor-not-allowed opacity-50"
              }`}
              style={{ backgroundColor: "#047857" }}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <ResendCodeButton
              onResend={handleResendCode}
              resending={resending}
              loading={loading}
            />
          </form>

          <SecurityTipBox />
        </div>
      </div>

      <VerificationMarketingSection />
    </div>
  );
};

export default VerifyEmailPage;
