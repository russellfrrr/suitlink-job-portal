import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

// Shared Components
import AuthContainer from "../../components/Auth/Shared/AuthContainer";
import AuthFormContainer from "../../components/Auth/Shared/AuthFormContainer";
import AuthMarketingSection from "../../components/Auth/Shared/AuthMarketingSection";
import Logo from "../../components/Auth/Shared/Logo";
import ErrorMessage from "../../components/Auth/Shared/ErrorMessage";
import AuthDivider from "../../components/Auth/Shared/AuthDivider";
import SocialLoginButtons from "../../components/Auth/Shared/SocialLoginButtons";

// Page-specific Components
import SignUpHeader from "../../components/Auth/SignUpPage/SignUpHeader";
import SignUpForm from "../../components/Auth/SignUpPage/SignUpForm";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate terms agreement
    if (!formData.agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const role = formData.userType === "employer" ? "employer" : "applicant";

      console.log("Signup attempt with role:", role);
      console.log("UserType was:", formData.userType);

      await authService.register(
        formData.fullName,
        formData.email,
        formData.password,
        role
      );

      // Registration successful
      navigate("/verify-email", {
        state: { email: formData.email },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const marketingContent = {
    title: "Join a transparent hiring platform",
    description:
      "Whether you're seeking your next opportunity or building your team, experience hiring with complete accountability and structure.",
    features: [
      "Smart resume management",
      "Focused job discovery",
      "Auditability by design",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  };

  return (
    <AuthContainer>
      <AuthFormContainer>
        <Logo to="/" />

        <div className="mt-8">
          <SignUpHeader />
          <ErrorMessage message={error} />
          <SignUpForm onSubmit={handleSubmit} loading={loading} />

          <AuthDivider />
          <SocialLoginButtons disabled={loading} />
        </div>
      </AuthFormContainer>

      <AuthMarketingSection
        title={marketingContent.title}
        description={marketingContent.description}
        features={marketingContent.features}
        imageUrl={marketingContent.imageUrl}
      />
    </AuthContainer>
  );
};

export default SignUpPage;
