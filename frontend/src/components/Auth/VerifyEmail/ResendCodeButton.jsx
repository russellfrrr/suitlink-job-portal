const ResendCodeButton = ({ onResend, resending, loading }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={resending || loading}
          className="hover:opacity-80 transition-opacity font-normal disabled:opacity-50"
          style={{ color: "#047857" }}
        >
          {resending ? "Resending..." : "Resend"}
        </button>
      </p>
    </div>
  );
};

export default ResendCodeButton;
