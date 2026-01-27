import ErrorMessage from "../../Shared/ErrorMessage";
import ForgotPasswordEmailHeader from "./ForgotPasswordEmailHeader";
import SecurityTipBox from "./SecurityTipBox";

const ForgotPasswordEmailStep = ({
  email,
  setEmail,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <>
      <ForgotPasswordEmailHeader />

      <ErrorMessage message={error} />

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm mb-1.5 text-foreground font-normal"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground placeholder:text-muted-foreground transition-shadow bg-input-background"
            autoComplete="email"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50"
          style={{ backgroundColor: "#047857" }}
        >
          {loading ? "Sending..." : "Send verification code"}
        </button>
      </form>

      <SecurityTipBox />
    </>
  );
};

export default ForgotPasswordEmailStep;
