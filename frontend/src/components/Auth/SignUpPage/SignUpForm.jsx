import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "jobseeker",
    agreedToTerms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-normal mb-1.5 text-foreground">
          I am a
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, userType: "jobseeker" })
            }
            disabled={loading}
            className={`py-2.5 px-4 rounded-lg border transition-all text-sm font-normal ${
              formData.userType === "jobseeker"
                ? "bg-accent text-foreground"
                : "border-border hover:bg-accent/50"
            }`}
            style={
              formData.userType === "jobseeker"
                ? {
                    borderColor: "#047857",
                    backgroundColor: "#d1fae5",
                    color: "#047857",
                  }
                : {}
            }
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, userType: "employer" })}
            disabled={loading}
            className={`py-2.5 px-4 rounded-lg border transition-all text-sm font-normal ${
              formData.userType === "employer"
                ? "bg-accent text-foreground"
                : "border-border hover:bg-accent/50"
            }`}
            style={
              formData.userType === "employer"
                ? {
                    borderColor: "#047857",
                    backgroundColor: "#d1fae5",
                    color: "#047857",
                  }
                : {}
            }
          >
            Employer
          </button>
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-normal mb-1.5 text-foreground"
        >
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          placeholder="Enter your full name"
          className="w-full px-3.5 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          autoComplete="name"
          required
          disabled={loading}
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-normal mb-1.5 text-foreground"
        >
          E-mail
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@gmail.com"
          className="w-full px-3.5 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          autoComplete="email"
          required
          disabled={loading}
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-normal mb-1.5 text-foreground"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="••••••"
            className="w-full px-3.5 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            autoComplete="new-password"
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-normal mb-1.5 text-foreground"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="••••••"
          className="w-full px-3.5 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          autoComplete="new-password"
          required
          disabled={loading}
        />
      </div>

      {/* Terms & Conditions */}
      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) =>
              setFormData({
                ...formData,
                agreedToTerms: e.target.checked,
              })
            }
            className="w-4 h-4 mt-0.5 rounded border-border focus:ring-2 focus:ring-ring"
            style={{ accentColor: "#047857" }}
            required
            disabled={loading}
          />
          <span className="text-sm text-foreground font-normal">
            I agree to the{" "}
            <button
              type="button"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "#047857" }}
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "#047857" }}
            >
              Privacy Policy
            </button>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#047857" }}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default SignUpForm;
