import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(80); // 1:20 in seconds
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")} min left`;
  };

  const handleInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 3) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} color="#323232" strokeWidth={1.5} />
        </button>
      </div>

      <div className="auth-illustration auth-illustration--verify" />

      <div className="auth-body auth-body--centered">
        <h2 className="auth-title auth-title--center">Verification code</h2>
        <p className="auth-subtitle auth-subtitle--center">
          A 4 digit code has been sent to +91 701*****34
        </p>

        <div className="otp-row">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              className="otp-input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>

        <div className="auth-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/create-password")}
          >
            Verify
          </button>

          <div className="resend-row">
            <span
              className="auth-link"
              onClick={() => setTimeLeft(80)}
            >
              Resend Code
            </span>
            <span className="resend-timer">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;