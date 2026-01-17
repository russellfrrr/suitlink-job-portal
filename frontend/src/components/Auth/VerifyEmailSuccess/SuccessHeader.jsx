const SuccessHeader = ({ email }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl mb-3 font-normal text-foreground">
        Email verified!
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Your email address{" "}
        <span className="text-foreground font-medium">{email}</span> has been
        successfully verified. You can now access all features of your SuitLink
        account.
      </p>
    </div>
  );
};

export default SuccessHeader;
