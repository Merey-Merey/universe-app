import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";
import { useUser } from "../context/UserContext";

const btnStyle = (ready: boolean): React.CSSProperties => ({
  opacity: ready ? 1 : 0.45,
  cursor: ready ? "pointer" : "not-allowed",
  transition: "opacity 0.25s ease",
});

const maskPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return phone;
  const country = digits.slice(0, 1);   
  const code    = digits.slice(1, 4);  
  const last2   = digits.slice(-2);    
  return `+${country} ${code} *** ** ${last2}`;
};

const maskContact = (contact: string): string => {
  if (!contact) return "your contact";
  if (contact.includes("@")) {
    const [name, domain] = contact.split("@");
    if (!domain) return contact;
    const visibleName = name.length <= 2 ? `${name[0] ?? ""}*` : `${name.slice(0, 2)}***`;
    return `${visibleName}@${domain}`;
  }
  return maskPhone(contact);
};

export const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const [code, setCode]           = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft]   = useState(80);
  const [codeError, setCodeError] = useState("");
  const [shake, setShake]         = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const pendingContact = (location.state as { contact?: string } | null)?.contact
    ?? sessionStorage.getItem("universe-reset-contact")
    ?? user.phone
    ?? "";
  const maskedPhone = maskContact(pendingContact);

  useEffect(() => { inputs.current[0]?.focus(); }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60), sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")} min left`;
  };

  const handleInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code]; next[i] = val;
    setCode(next); setCodeError("");
    if (val && i < 3) setTimeout(() => inputs.current[i + 1]?.focus(), 0);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const next = ["", "", "", ""];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setCode(next); setCodeError("");
    setTimeout(() => inputs.current[Math.min(pasted.length, 3)]?.focus(), 0);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (code[i]) { const next = [...code]; next[i] = ""; setCode(next); }
      else if (i > 0) inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft"  && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 3) inputs.current[i + 1]?.focus();
  };

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 500); };

  const allFilled = code.every(d => d !== "");

  const verify = () => {
    if (!allFilled) { setCodeError("Enter all 4 digits"); triggerShake(); return; }
    sessionStorage.setItem("universe-reset-verified", "1");
    navigate("/reset-password");
  };

  const resetCode = () => {
    setTimeLeft(80); setCode(["", "", "", ""]); setCodeError("");
    sessionStorage.setItem("universe-reset-contact", pendingContact);
    setTimeout(() => inputs.current[0]?.focus(), 0);
  };

  const renderOtpRow = () => (
    <div className="otp-row" style={shake ? { animation: "otp-shake 0.4s ease" } : {}}>
      {code.map((digit, i) => (
        <input key={i} ref={el => { inputs.current[i] = el; }}
          className="otp-input" type="text" inputMode="numeric" maxLength={1} value={digit}
          onChange={e => handleInput(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          style={{
            borderColor: codeError ? "#EF4444" : digit ? "#7C3AED" : undefined,
            borderWidth: "1.5px", borderStyle: "solid",
            transform: digit ? "scale(1.06)" : "scale(1)",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes otp-shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-7px); }
          40%      { transform: translateX(7px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
      `}</style>

      <div className="page-wrapper mobile-only">
        <div className="auth-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#323232" strokeWidth={1.5} />
          </button>
        </div>
        <div className="auth-illustration auth-illustration--verify" />
        <div className="auth-body auth-body--centeredd">
          <h2 className="auth-titlee">Verification code</h2>
          <p className="auth-subtitlee">A 4-digit code has been sent to {maskedPhone}</p>
          {renderOtpRow()}
          {codeError && <div style={{ marginTop:-4, marginBottom:4 }}><ErrorMsg message={codeError} /></div>}
          <div className="auth-actions">
            <button className="primary-btn" onClick={verify}
              disabled={!allFilled} style={btnStyle(allFilled)}>
              Verify
            </button>
            <div className="resend-row">
              <span className="auth-link" onClick={resetCode}>Resend Code</span>
              <span className="resend-timer">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-page desktop-only">
        <div className="auth-left">
          <div className="auth-left__top">
            <div className="auth-tag">Almost Done</div>
            <h1 className="auth-h1">Check<br /><em>your phone.</em></h1>
            <p className="auth-desc">
              We sent a 4-digit code to your phone number.
              Enter it to verify your identity and protect your account.
            </p>
            <div className="auth-bullets">
              <div className="auth-bullet"><div className="auth-bullet__dot" />The code expires in 2 minutes</div>
              <div className="auth-bullet"><div className="auth-bullet__dot" />Didn't receive it? Check your spam folder</div>
              <div className="auth-bullet"><div className="auth-bullet__dot" />You can request a new code</div>
            </div>
          </div>
          <div className="auth-left__footer">
            <div className="auth-stat">
              <div className="auth-stat__num">2FA</div>
              <div className="auth-stat__label">Two-Factor Authentication</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat__num">2 min</div>
              <div className="auth-stat__label">Code Expiration</div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-card">
            <button className="form-back" onClick={() => navigate(-1)}>
              <ArrowLeft size={14} strokeWidth={2} /> Back
            </button>
            <h2 className="form-card__title" style={{ textAlign:"center" }}>Verification Code</h2>
            <p className="form-card__subtitle" style={{ textAlign:"center" }}>
              A 4-digit code was sent to {maskedPhone}
            </p>

            {renderOtpRow()}

            {codeError && (
              <div style={{ textAlign:"center", marginTop:-8, marginBottom:8 }}>
                <ErrorMsg message={codeError} />
              </div>
            )}

            <div className="resend-row">
              <button className="auth-link" onClick={resetCode}>Resend Code</button>
              <span className="resend-timer">{formatTime(timeLeft)}</span>
            </div>

            <button className="primary-btn" onClick={verify}
              disabled={!allFilled} style={btnStyle(allFilled)}>
              Verify <Check size={16} />
            </button>

            <div className="form-footer">
              Wrong number?{" "}
              <button onClick={() => navigate("/sign-up")}>Change</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
