import { CheckCircle } from "lucide-react";

const SuccessIcon = () => {
  return (
    <>
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-scale-in"
            style={{ backgroundColor: "#d1fae5" }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: "#047857" }} />
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}
          />
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
    </>
  );
};

export default SuccessIcon;
