import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../components/Auth/Shared/Logo";
import ForgotPasswordEmailStep from "../../components/Auth/ForgotPassword/ForgotPasswordEmailStep";
import ForgotPasswordVerifyStep from "../../components/Auth/ForgotPassword/ForgotPasswordVerifyStep";
import ForgotPasswordMarketingSection from "../../components/Auth/ForgotPassword/ForgotPasswordMarketingSection";
import useVerificationCode from "../../components/Auth/ForgotPassword/hooks/useVerificationCode";
import useForgotPassword from "../../components/Auth/ForgotPassword/hooks/useForgotPassword";

const ForgotPassPage = () => {
  const location = useLocation();

  // Get initial state from navigation (if redirected back from reset page)
  const initialEmail = location.state?.email || "";
  const initialError = location.state?.error || "";

  const [step, setStep] = useState(initialEmail ? "verify" : "email");
  const [email, setEmail] = useState(initialEmail);

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
    resending,
    sendResetCode,
    resendResetCode,
    setError,
  } = useForgotPassword();

  // Set initial error if provided
  useEffect(() => {
    if (initialError) setError(initialError);
  }, [initialError, setError]);

  // Email submission handler
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const success = await sendResetCode(email);
    if (success) {
      setStep("verify");
    }
  };

  // Resend code handler
  const handleResendCode = async () => {
    await resendResetCode(email, resetCode);
  };

  // Back to email step handler
  const handleBackToEmail = () => {
    setStep("email");
    resetCode();
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo to="/login" />
          </div>

          {step === "email" ? (
            <ForgotPasswordEmailStep
              email={email}
              setEmail={setEmail}
              onSubmit={handleEmailSubmit}
              loading={loading}
              error={error}
            />
          ) : (
            <ForgotPasswordVerifyStep
              email={email}
              code={code}
              inputRefsArray={inputRefsArray}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              handlePaste={handlePaste}
              isCodeComplete={isCodeComplete}
              loading={loading}
              error={error}
              resending={resending}
              onResend={handleResendCode}
              onBack={handleBackToEmail}
            />
          )}
        </div>
      </div>

      <ForgotPasswordMarketingSection />
    </div>
  );
};

export default ForgotPassPage;
