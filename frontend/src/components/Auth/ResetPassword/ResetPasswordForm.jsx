import ErrorMessage from "../Shared/ErrorMessage";

const ResetPasswordForm = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <>
      <ErrorMessage message={error} />

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm mb-1.5 text-foreground font-normal"
          >
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground placeholder:text-muted-foreground transition-shadow bg-input-background"
            autoComplete="new-password"
            required
            disabled={loading}
            minLength={8}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Must be at least 8 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm mb-1.5 text-foreground font-normal"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground placeholder:text-muted-foreground transition-shadow bg-input-background"
            autoComplete="new-password"
            required
            disabled={loading}
            minLength={8}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#047857" }}
        >
          {loading ? "Resetting password..." : "Reset password"}
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
