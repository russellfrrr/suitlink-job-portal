import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

const VerificationHeader = ({ email, fromLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate(fromLogin ? "/login" : "/signup")}
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        {fromLogin ? "Back to sign in" : "Back to sign up"}
      </button>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "#d1fae5" }}
      >
        <Mail className="w-8 h-8" style={{ color: "#047857" }} />
      </div>
      <h1 className="text-2xl font-normal mb-2 text-foreground">
        Verify your email
      </h1>
      <p className="text-sm text-muted-foreground">
        We've sent a 6-digit verification code to{" "}
        <span className="text-foreground font-medium">{email}</span>
      </p>
    </div>
  );
};

export default VerificationHeader;
