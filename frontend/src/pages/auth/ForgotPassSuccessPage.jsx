import { useLocation } from "react-router-dom";
import Logo from "../../components/Auth/Shared/Logo";
import SuccessIcon from "../../components/Auth/ForgotPassSuccess/SuccessIcon";
import SuccessHeader from "../../components/Auth/ForgotPassSuccess/SuccessHeader";
import BackToLoginButton from "../../components/Auth/ForgotPassSuccess/BackToLoginButton";
import SecurityTipsList from "../../components/Auth/ForgotPassSuccess/SecurityTipsList";
import ForgotPassSuccessMarketingSection from "../../components/Auth/ForgotPassSuccess/ForgotPassSuccessMarketingSection";

const ForgotPassSuccessPage = () => {
  const location = useLocation();
  const email = location.state?.email || "user@example.com";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Success Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md text-center">
          <div className="mb-12">
            <Logo />
          </div>

          <SuccessIcon />

          <SuccessHeader email={email} />

          <BackToLoginButton />

          <SecurityTipsList />
        </div>
      </div>

      <ForgotPassSuccessMarketingSection />
    </div>
  );
};

export default ForgotPassSuccessPage;
