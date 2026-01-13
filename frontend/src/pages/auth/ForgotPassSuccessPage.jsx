import { Briefcase, CheckCircle, ArrowLeft } from "lucide-react";

const ForgotPassSuccessPage = ({
  onBackToLogin,
  onBackToHome,
  userEmail = "user@example.com",
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Success Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 mb-12 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Briefcase className="size-6 text-emerald-600" />
            <span className="text-xl font-medium">SuitLink</span>
          </button>

          {/* Success Icon with Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center animate-scale-in">
                <CheckCircle className="size-12 text-emerald-700" />
              </div>
              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl mb-3 font-medium text-gray-900">
              Password reset successful!
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Your password has been successfully reset. You can now sign in
              with your new password using the email address{" "}
              <span className="text-gray-900 font-medium">{userEmail}</span>.
            </p>
          </div>

          {/* Back to Sign In Button */}
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 group mb-6 font-medium"
          >
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to sign in</span>
          </button>

          {/* Security Tips */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200 text-left">
            <h3 className="text-sm text-gray-900 mb-4 font-medium">
              Security tips
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="size-3.5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-sm text-gray-900 font-medium">
                    Use a strong password
                  </div>
                  <div className="text-xs text-gray-600">
                    Include uppercase, lowercase, numbers, and special
                    characters
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="size-3.5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-sm text-gray-900 font-medium">
                    Don't share your password
                  </div>
                  <div className="text-xs text-gray-600">
                    Keep your password private and never share it with anyone
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="size-3.5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-sm text-gray-900 font-medium">
                    Enable two-factor authentication
                  </div>
                  <div className="text-xs text-gray-600">
                    Add an extra layer of security to your account
                  </div>
                </div>
              </div>
            </div>
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
              Your account security matters
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              We take your security seriously. Your password has been reset
              securely, and your account is now protected with your new
              credentials.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="size-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">
                  Secure password reset
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="size-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">
                  Encrypted account data
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="size-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">
                  Protected personal information
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassSuccessPage;
