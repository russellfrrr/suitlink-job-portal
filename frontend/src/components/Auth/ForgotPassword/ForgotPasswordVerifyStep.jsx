import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Shared/ErrorMessage";
import ForgotPasswordVerifyHeader from "./ForgotPasswordVerifyHeader";
import VerificationCodeInput from "./VerificationCodeInput";
import ResendCodeButton from "./ResendCodeButton";
import SecurityTipBox from "./SecurityTipBox";

const ForgotPasswordVerifyStep = ({
  email,
  code,
  inputRefsArray,
  handleChange,
  handleKeyDown,
  handlePaste,
  isCodeComplete,
  loading,
  error,
  resending,
  onResend,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleVerifyCode = () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      return;
    }
    navigate("/reset-password", {
      state: { email, code: verificationCode },
    });
  };

  return (
    <>
      <ForgotPasswordVerifyHeader email={email} onBack={onBack} />

      <ErrorMessage message={error} />

      <div className="space-y-6">
        <VerificationCodeInput
          code={code}
          inputRefsArray={inputRefsArray}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handlePaste={handlePaste}
          disabled={loading}
        />

        <button
          onClick={handleVerifyCode}
          disabled={!isCodeComplete || loading}
          className={`w-full py-2.5 rounded-lg transition-opacity text-sm font-medium ${
            isCodeComplete && !loading
              ? "text-white hover:opacity-90"
              : "cursor-not-allowed opacity-50"
          }`}
          style={{ backgroundColor: "#047857" }}
        >
          Continue
        </button>

        <ResendCodeButton
          onResend={onResend}
          resending={resending}
          loading={loading}
        />
      </div>

      <SecurityTipBox message="This code will expire in 15 minutes. Never share it with anyone, even SuitLink support staff." />
    </>
  );
};

export default ForgotPasswordVerifyStep;
