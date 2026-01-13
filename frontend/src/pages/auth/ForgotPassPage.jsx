import { useState, useRef } from "react";
import { Briefcase, Mail, ArrowLeft, CheckCircle, Shield } from "lucide-react";

const ForgotPassPage = ({ onBackToLogin, onBackToHome, onVerified }) => {
  const [step, setStep] = useState("email"); // 'email' or 'verify'
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefsArray = useRef([]);

  // Email submission handler
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password for:", email);
    setStep("verify");
  };

  // Code input handlers
  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefsArray.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
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

    const nextEmptyIndex = newCode.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefsArray.current[focusIndex]?.focus();
  };

  const handleVerifyCode = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code:", verificationCode);
      // Call the onVerified callback to move to reset password page
      onVerified?.(email, verificationCode);
    }
  };

  const handleResendCode = () => {
    console.log("Resending code to:", email);
    setCode(["", "", "", "", "", ""]);
    // In real app, trigger API call to resend code
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
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

          {step === "email" ? (
            <>
              {/* Email Step - Header */}
              <div className="mb-8">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline mb-6 transition-colors"
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  Back to sign in
                </button>
                <h1 className="text-3xl mb-2 font-medium text-gray-900">
                  Reset password
                </h1>
                <p className="text-gray-600">
                  Enter your email address and we'll send you a verification
                  code to reset your password.
                </p>
              </div>

              {/* Email Step - Form */}
              <form className="space-y-5" onSubmit={handleEmailSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 text-gray-700 font-medium"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-gray-900 placeholder:text-gray-400 transition-colors"
                    autoComplete="email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors font-medium"
                >
                  Send verification code
                </button>
              </form>

              {/* Email Step - Security Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900 font-medium">
                    Security tip:
                  </strong>{" "}
                  For your protection, we'll only send reset instructions to the
                  email address associated with your account.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Verify Step - Header */}
              <div className="mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setCode(["", "", "", "", "", ""]);
                  }}
                  className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline mb-6 transition-colors"
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  Change your email
                </button>
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <Shield className="size-8 text-emerald-700" />
                </div>
                <h1 className="text-3xl mb-2 font-medium text-gray-900">
                  Enter verification code
                </h1>
                <p className="text-gray-600">
                  We've sent a 6-digit verification code to{" "}
                  <span className="text-gray-900 font-medium">{email}</span>
                </p>
              </div>

              {/* Verify Step - Code Input */}
              <div className="space-y-6">
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

                <button
                  onClick={handleVerifyCode}
                  disabled={!isCodeComplete}
                  className={`w-full py-3 rounded-lg transition-colors font-medium ${
                    isCodeComplete
                      ? "bg-emerald-700 text-white hover:bg-emerald-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Verify Code
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </div>

              {/* Verify Step - Security Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900 font-medium">
                    Security tip:
                  </strong>{" "}
                  This code will expire in 10 minutes. Never share it with
                  anyone, even SuitLink support staff.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Side - Marketing Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-800 to-emerald-950 p-12 items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-emerald-950/90" />

        <div className="relative z-10 max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            {step === "email" ? (
              <>
                <h3 className="text-2xl text-white mb-4 font-medium">
                  Your account security matters
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  We take your security seriously. Our password reset process
                  ensures only you can access your account and application data.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="size-4 text-white" />
                    </div>
                    <span className="text-white/90 text-sm">
                      Secure password recovery
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="size-4 text-white" />
                    </div>
                    <span className="text-white/90 text-sm">
                      Protected account data
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="size-4 text-white" />
                    </div>
                    <span className="text-white/90 text-sm">
                      Email verification required
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl text-white mb-4 font-medium">
                  Reset your password securely
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  We use industry-standard verification to ensure only you can
                  reset your password and access your account.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="size-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">
                        Two-factor verification
                      </div>
                      <div className="text-white/80 text-sm">
                        Email code ensures account ownership
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="size-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">
                        Time-limited codes
                      </div>
                      <div className="text-white/80 text-sm">
                        Codes expire for added security
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
