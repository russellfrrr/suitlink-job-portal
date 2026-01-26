import { useLocation } from "react-router-dom";
import Logo from "../../components/Auth/Shared/Logo";
import SuccessIcon from "../../components/Auth/VerifyEmailSuccess/SuccessIcon";
import SuccessHeader from "../../components/Auth/VerifyEmailSuccess/SuccessHeader";
import ContinueButton from "../../components/Auth/VerifyEmailSuccess/ContinueButton";
import NextStepsList from "../../components/Auth/VerifyEmailSuccess/NextStepsList";
import SuccessMarketingSection from "../../components/Auth/VerifyEmailSuccess/SuccessMarketingSection";

const VerifyEmailSuccessPage = () => {
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

          <ContinueButton />

          <NextStepsList />
        </div>
      </div>

      <SuccessMarketingSection />

    </div>
  );
};

export default VerifyEmailSuccessPage;
