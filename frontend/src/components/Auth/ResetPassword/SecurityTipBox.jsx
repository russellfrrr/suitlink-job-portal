const SecurityTipBox = () => {
  return (
    <div
      className="mt-6 p-4 rounded-lg border border-border"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <p className="text-sm text-muted-foreground">
        <strong className="text-foreground font-medium">Security tip:</strong>{" "}
        Choose a strong password with a mix of letters, numbers, and special
        characters.
      </p>
    </div>
  );
};

export default SecurityTipBox;
