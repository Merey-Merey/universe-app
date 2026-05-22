import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { validate } from "../utils/validation";
import ErrorMsg from "../components/ErrorMsg";

const fieldBorder = (err: string): React.CSSProperties =>
  err ? { border: "1.5px solid #EF4444", borderRadius: 12 } : {};

const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
);
const btnStyle = (ready: boolean): React.CSSProperties => ({
  opacity: ready ? 1 : 0.45,
  cursor: ready ? "pointer" : "not-allowed",
  transition: "opacity 0.25s ease",
});

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [error, setError]     = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const persistResetContact = (value: string) => {
    sessionStorage.setItem("universe-reset-contact", value.trim());
    sessionStorage.setItem("universe-reset-verified", "0");
  };

  const isReady = contact.trim().length > 0 && !validate.contact(contact);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
    setError("");
    if (touched) setError(validate.contact(e.target.value));
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate.contact(contact));
  };

  const submit = async () => {
    const e = validate.contact(contact);
    setError(e);
    setTouched(true);
    if (e) return;

    setSubmitting(true);
    try {
      persistResetContact(contact);
      navigate("/verification", { state: { contact: contact.trim() } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-wrapper mobile-only">
        <div className="auth-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#323232" strokeWidth={1.5} />
          </button>
        </div>
        <div className="auth-illustration auth-illustration--forgot" />
        <div className="auth-body auth-body--spaced">
          <div className="auth-fields">
            <h2 className="auth-title">Forget Password?</h2>
            <p className="auth-subtitle">
              Don't worry! It happens. Please enter the email address associated with your account.
            </p>
            <div className="field-group" style={{ marginTop: 8 }}>
              <label className="field-label">Email Address / Mobile Number</label>
              <input className="field-input" type="text" value={contact}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Enter your email / phone number"
                style={fieldBorder(error)} />
              <ErrorMsg message={error} />
            </div>
          </div>
          <div className="auth-actions">
            <button className="primary-btn" onClick={submit}
              disabled={!isReady || submitting} style={btnStyle(isReady && !submitting)}>
              {submitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

<div className="auth-page desktop-only">
  <div className="auth-left">
    <div className="auth-left__top">
      <div className="auth-tag">Password Recovery</div>

      <h1 className="auth-h1">
        We’ve got
        <br />
        <em>your back.</em>
      </h1>

      <p className="auth-desc">
        It happens to everyone. Enter your email and
        we’ll send you a secure password reset code
        in just a few seconds.
      </p>

      <div className="auth-bullets">
        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          The code is valid for 2 minutes
        </div>

        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          256-bit encryption
        </div>

        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          Recovery takes less than 60 seconds
        </div>
      </div>
    </div>

    <div className="auth-left__footer">
      <div className="auth-stat">
        <div className="auth-stat__num">&lt;60s</div>
        <div className="auth-stat__label">
          Recovery Time
        </div>
      </div>

      <div className="auth-stat">
        <div className="auth-stat__num">256-bit</div>
        <div className="auth-stat__label">
          Encryption
        </div>
      </div>
    </div>
  </div>

  <div className="auth-right">
    <div className="form-card">
      <button
        className="form-back"
        onClick={() => navigate("/login")}
      >
        <ArrowLeft size={14} strokeWidth={2} />
        Back to Login
      </button>

      <h2 className="form-card__title">
        Forgot Password?
      </h2>

      <p className="form-card__subtitle">
        Enter the email or phone number linked to your account —
        we’ll send you a verification code.
      </p>

      <div className="field-group">
        <label className="field-label">
          Email or Phone Number
        </label>

        <div
          className="field-wrap"
          style={fieldBorder(error)}
        >
          <span className="field-icon">
            <MailIcon />
          </span>

          <input
            className="field-input"
            style={{ border: "none", boxShadow: "none" }}
            type="text"
            value={contact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@university.kz or +7 777..."
            onKeyDown={e =>
              e.key === "Enter" && isReady && submit()
            }
          />
        </div>

        <ErrorMsg message={error} />
      </div>

      <button
        className="primary-btn"
        style={{
          marginTop: 8,
          ...btnStyle(isReady && !submitting),
        }}
        onClick={submit}
        disabled={!isReady || submitting}
      >
        {submitting ? "Sending..." : <>Send Code <ArrowRight size={16} /></>}
      </button>

      <div className="form-footer">
        Remembered your password?{" "}
        <button onClick={() => navigate("/login")}>
          Log In
        </button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};


