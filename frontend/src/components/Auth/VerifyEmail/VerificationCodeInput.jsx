const VerificationCodeInput = ({
  code,
  inputRefsArray,
  handleChange,
  handleKeyDown,
  handlePaste,
  disabled,
}) => {
  return (
    <div>
      <label className="block text-sm mb-2 text-foreground font-normal">
        Enter verification code
      </label>
      <div className="flex gap-2 justify-between">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefsArray.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className="w-full aspect-square text-center text-2xl font-medium border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground transition-shadow bg-input-background"
          />
        ))}
      </div>
    </div>
  );
};

export default VerificationCodeInput;
