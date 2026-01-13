import { useState, useRef } from "react";
import { Briefcase, Mail, ArrowLeft } from "lucide-react";

const VerifyEmailPage = ({
  email = "user@example.com",
  onVerify,
  onResendCode,
  onBackToHome,
  onBackToLogin,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefsArray = useRef([]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefsArray.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefsArray.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefsArray.current[focusIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code:", verificationCode);
      onVerify?.();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 mb-12 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Briefcase className="size-6 text-emerald-600" />
            <span className="text-xl font-medium">SuitLink</span>
          </button>

          {/* Header */}
          <div className="mb-8">
            <button
              type="button"
              onClick={onBackToLogin}
              className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline mb-6 transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to sign in
            </button>
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
              <Mail className="size-8 text-emerald-700" />
            </div>
            <h1 className="text-3xl mb-2 font-medium text-gray-900">
              Verify your email
            </h1>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to{" "}
              <span className="text-gray-900 font-medium">{email}</span>
            </p>
          </div>

          {/* Verification Form */}
          <div className="space-y-6">
            {/* 6-Digit Code Input */}
            <div>
              <label className="block text-sm mb-3 text-gray-700 font-medium">
                Enter verification code
              </label>
              <div className="flex gap-2 justify-between">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefsArray.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-full aspect-square text-center text-2xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600 text-gray-900 transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleSubmit}
              disabled={!isCodeComplete}
              className={`w-full py-3 rounded-lg transition-colors font-medium ${
                isCodeComplete
                  ? "bg-emerald-700 text-white hover:bg-emerald-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Verify Email
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={onResendCode}
                  className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900 font-medium">
                Security tip:
              </strong>{" "}
              Never share your verification code with anyone. Our team will
              never ask for this code.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Marketing Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-800 to-emerald-950 p-12 items-center justify-center relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-emerald-950/90" />

        <div className="relative z-10 max-w-md">
          {/* Feature Card - Translucent Design */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <h3 className="text-2xl text-white mb-4 font-medium">
              Secure your account
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Email verification helps us ensure your account security and
              allows us to send you important updates about your job
              applications.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="size-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">
                    Protected account
                  </div>
                  <div className="text-white/80 text-sm">
                    Your data is encrypted and secure
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="size-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">
                    Stay informed
                  </div>
                  <div className="text-white/80 text-sm">
                    Get real-time application updates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
