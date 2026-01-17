import { CheckCircle } from "lucide-react";

const NextStepsList = ({ steps }) => {
  const defaultSteps = [
    {
      title: "Complete your profile",
      description: "Add your skills and experience",
    },
    {
      title: "Browse job listings",
      description: "Discover opportunities that match your skills",
    },
    {
      title: "Track applications",
      description: "Monitor your application status in real-time",
    },
  ];

  const stepsToDisplay = steps || defaultSteps;

  return (
    <div
      className="mt-12 p-6 rounded-xl border border-border text-left"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <h3 className="text-sm text-foreground mb-4 font-medium">What's next?</h3>
      <div className="space-y-3">
        {stepsToDisplay.map((step, index) => (
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
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextStepsList;
