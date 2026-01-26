import { CheckCircle } from "lucide-react";

const VerificationMarketingSection = () => {
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
          <h3 className="text-2xl font-medium text-white mb-4">
            Secure your account
          </h3>
          <p className="text-white/80 mb-6 leading-relaxed">
            Email verification helps us ensure your account security and allows
            us to send you important updates about your job applications.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
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
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-medium mb-1">Stay informed</div>
                <div className="text-white/80 text-sm">
                  Get real-time application updates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationMarketingSection;
