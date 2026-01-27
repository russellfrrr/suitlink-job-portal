import { CheckCircle } from "lucide-react";

const ForgotPasswordMarketingSection = () => {
  return (
    <div
      className="hidden lg:flex w-full lg:w-1/2 p-8 lg:p-12 items-center justify-center relative overflow-hidden min-h-[500px] lg:min-h-screen"
      style={{ backgroundColor: "#065f46" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(6, 95, 70, 0.9) 0%, rgba(4, 47, 46, 0.95) 100%)",
        }}
      />

      <div className="relative z-10 max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl text-white mb-4 font-medium">
            Your account security matters
          </h3>
          <p className="text-white/80 mb-6 leading-relaxed">
            We take your security seriously. Our password reset process ensures
            only you can access your account and application data.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90 text-sm">
                Secure password recovery
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90 text-sm">
                Protected account data
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90 text-sm">
                Email verification required
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordMarketingSection;
