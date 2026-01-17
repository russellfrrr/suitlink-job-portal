const SecurityTipBox = () => {
  return (
    <div
      className="mt-6 p-4 rounded-lg border border-border"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <p className="text-sm text-muted-foreground">
        <strong className="text-foreground font-medium">Security tip:</strong>{" "}
        Never share your verification code with anyone. Our team will never ask
        for this code.
      </p>
    </div>
  );
};

export default SecurityTipBox;
