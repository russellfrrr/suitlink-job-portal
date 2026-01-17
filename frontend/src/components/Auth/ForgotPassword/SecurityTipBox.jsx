const SecurityTipBox = ({ message }) => {
  const defaultMessage =
    "For your protection, we'll only send reset instructions to the email address associated with your account.";

  return (
    <div
      className="mt-6 p-4 rounded-lg border border-border"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <p className="text-sm text-muted-foreground">
        <strong className="text-foreground font-medium">Security tip:</strong>{" "}
        {message || defaultMessage}
      </p>
    </div>
  );
};

export default SecurityTipBox;
