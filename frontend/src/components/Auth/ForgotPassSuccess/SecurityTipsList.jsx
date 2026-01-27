import { CheckCircle } from "lucide-react";

const SecurityTipsList = ({ tips }) => {
  const defaultTips = [
    {
      title: "Use a strong password",
      description:
        "Include uppercase, lowercase, numbers, and special characters",
    },
    {
      title: "Don't share your password",
      description: "Keep your password private and never share it with anyone",
    },
    {
      title: "Enable two-factor authentication",
      description: "Add an extra layer of security to your account",
    },
  ];

  const tipsToDisplay = tips || defaultTips;

  return (
    <div
      className="mt-12 p-6 rounded-xl border border-border text-left"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <h3 className="text-sm text-foreground mb-4 font-medium">
        Security tips
      </h3>
      <div className="space-y-3">
        {tipsToDisplay.map((tip, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: "#d1fae5" }}
            >
              <CheckCircle
                className="w-3.5 h-3.5"
                style={{ color: "#047857" }}
              />
            </div>
            <div>
              <div className="text-sm text-foreground font-medium">
                {tip.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {tip.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityTipsList;
