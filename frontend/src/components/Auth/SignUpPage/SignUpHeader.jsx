import { useNavigate } from "react-router-dom";

const SignUpHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-normal mb-2 text-foreground">
        Create account
      </h1>
      <p className="text-sm text-muted-foreground font-normal">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="font-normal hover:opacity-80 transition-opacity underline"
          style={{ color: "#047857" }}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default SignUpHeader;
