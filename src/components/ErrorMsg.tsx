import React from "react";

interface Props {
  message: string;
}

const ErrorMsg: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        color: "#EF4444",
        marginTop: 4,
        fontFamily: "inherit",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </span>
  );
};

export default ErrorMsg;