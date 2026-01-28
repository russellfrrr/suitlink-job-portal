import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordEmailHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to sign in
      </button>
      <h1 className="text-2xl mb-2 font-normal text-foreground">
        Reset password
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your email address and we'll send you a verification code to reset
        your password.
      </p>
    </div>
  );
};

export default ForgotPasswordEmailHeader;
