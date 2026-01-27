const SuccessHeader = ({ email }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl mb-3 font-normal text-foreground">
        Password reset successful!
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Your password has been successfully reset. You can now sign in with your
        new password using the email address{" "}
        <span className="text-foreground font-medium">{email}</span>.
      </p>
    </div>
  );
};

export default SuccessHeader;
