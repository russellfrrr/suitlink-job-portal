import { useState, useRef } from "react";

const useVerificationCode = (length = 6) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const inputRefsArray = useRef([]);

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputRefsArray.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefsArray.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefsArray.current[focusIndex]?.focus();
  };

  const resetCode = () => {
    setCode(Array(length).fill(""));
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return {
    code,
    inputRefsArray,
    handleChange,
    handleKeyDown,
    handlePaste,
    resetCode,
    isCodeComplete,
  };
};

export default useVerificationCode;
