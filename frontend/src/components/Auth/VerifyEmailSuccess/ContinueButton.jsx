import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ContinueButton = ({ to = "/dashboard", text = "Continue to dashboard" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="w-full text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group mb-6 text-sm font-medium"
      style={{ backgroundColor: "#047857" }}
    >
      <span>{text}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

export default ContinueButton;
