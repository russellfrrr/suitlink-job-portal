import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackToLoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/login")}
      className="w-full text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group mb-6 text-sm font-medium"
      style={{ backgroundColor: "#047857" }}
    >
      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      <span>Back to sign in</span>
    </button>
  );
};

export default BackToLoginButton;
