import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ResetPasswordHeader = ({ email }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate("/forgot-password", { state: { email } })}
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back
      </button>
      <h1 className="text-2xl mb-2 font-normal text-foreground">
        Create new password
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter a new password for{" "}
        <span className="text-foreground font-medium">{email}</span>
      </p>
    </div>
  );
};

export default ResetPasswordHeader;
