import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, ArrowRight } from "lucide-react";
import { validate } from "../utils/validation";
import ErrorMsg from "../components/ErrorMsg";

const fieldBorder = (err: string): React.CSSProperties =>
  err ? { border: "1.5px solid #EF4444", borderRadius: 12 } : {};

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48">
    <path d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.4 5.6-5 7.3v6h8.1c4.8-4.4 7.2-10.9 7.2-17.4z" fill="#4285F4"/>
    <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-8.1-6c-2.1 1.4-4.8 2.2-7.8 2.2-6 0-11-4-12.8-9.5H2.9v6.2C6.8 42.5 14.8 48 24 48z" fill="#34A853"/>
    <path d="M11.2 28.9c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-6.2H2.9C1 17.6 0 20.7 0 24s1 6.4 2.9 9.1l8.3-4.2z" fill="#FBBC05"/>
    <path d="M24 9.5c3.4 0 6.4 1.2 8.8 3.4l6.6-6.6C35.9 2.4 30.4 0 24 0 14.8 0 6.8 5.5 2.9 13.9l8.3 6.2C12.9 13.5 18 9.5 24 9.5z" fill="#EA4335"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      const err = name === "email" ? validate.email(value) : validate.password(value);
      setErrors(er => ({ ...er, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const err = name === "email" ? validate.email(value) : validate.password(value);
    setErrors(er => ({ ...er, [name]: err }));
  };

  const submit = async () => {
    const e = {
      email:    validate.email(form.email),
      password: validate.password(form.password),
    };
    setErrors(e);
    setTouched({ email: true, password: true });
    if (Object.values(e).some(Boolean)) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    navigate("/home");
  };

  return (
    <>
      <div className="page-wrapper mobile-only">
        <div className="auth-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#323232" strokeWidth={1.5} />
          </button>
        </div>

        <div className="auth-illustration auth-illustration--login" />

        <div className="auth-body">
          <h2 className="auth-title">Login</h2>

          <div className="auth-fields">
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input className="field-input" name="email" type="email" value={form.email}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Enter your email" style={fieldBorder(errors.email)} />
              <ErrorMsg message={errors.email} />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-input-wrap" style={fieldBorder(errors.password)}>
                <input className="field-input field-input--icon"
                  style={{ border: "none", boxShadow: "none" }}
                  name="password" type={showPwd ? "text" : "password"} value={form.password}
                  onChange={handleChange} onBlur={handleBlur}
                  placeholder="Enter your password" />
                <button className="field-icon-btn" onClick={() => setShowPwd(!showPwd)} type="button">
                  {showPwd ? <EyeOff size={18} color="#A09DC5" /> : <Eye size={18} color="#A09DC5" />}
                </button>
              </div>
              <ErrorMsg message={errors.password} />
            </div>

            <div className="forgot-row">
              <span className="auth-link" onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
            </div>
          </div>

          <div className="auth-actions">
            <button className="primary-btn" onClick={submit}>{loading ? "Loading..." : "Continue"}</button>
            <div className="divider-row">
              <span className="divider-line" /><span className="divider-text">or</span><span className="divider-line" />
            </div>
            <button className="google-btn"><GoogleIcon />Login with Google</button>
            <p className="auth-footer-text">
              Don't have an account?{" "}
              <span className="auth-link auth-link--bold" onClick={() => navigate("/sign-up")}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>

<div className="auth-page desktop-only">
  <div className="auth-left">
    <div className="auth-left__top">
      <div className="auth-tag">Welcome Back</div>

      <h1 className="auth-h1">
        Glad to see
        <br />
        you <em>again.</em>
      </h1>

      <p className="auth-desc">
        Your jobs, listings, and events are waiting.
        Log in and continue where you left off.
      </p>

      <div className="auth-bullets">
        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          Personalized job recommendations
        </div>

        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          Saved housing searches and alerts
        </div>

        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          Upcoming events in your city
        </div>
      </div>
    </div>

    <div className="auth-left__footer">
      <div className="auth-stat">
        <div className="auth-stat__num">4.9 ★</div>
        <div className="auth-stat__label">
          App Store Rating
        </div>
      </div>

      <div className="auth-stat">
        <div className="auth-stat__num">50K+</div>
        <div className="auth-stat__label">
          Active Students
        </div>
      </div>
    </div>
  </div>

  <div className="auth-right">
    <div className="form-card">
      <button
        className="form-back"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={14} strokeWidth={2} />
        Back
      </button>

      <h2 className="form-card__title">Log In</h2>

      <p className="form-card__subtitle">
        Enter your email and password to continue.
      </p>

      <div className="field-group">
        <label className="field-label">Email</label>

        <div
          className="field-wrap"
          style={fieldBorder(errors.email)}
        >
          <span className="field-icon">
            <MailIcon />
          </span>

          <input
            className="field-input"
            style={{ border: "none", boxShadow: "none" }}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@university.kz"
            onKeyDown={e => e.key === "Enter" && submit()}
          />
        </div>

        <ErrorMsg message={errors.email} />
      </div>

      <div className="field-group">
        <label className="field-label">Password</label>

        <div
          className="field-wrap"
          style={fieldBorder(errors.password)}
        >
          <span className="field-icon">
            <LockIcon />
          </span>

          <input
            className="field-input"
            style={{ border: "none", boxShadow: "none" }}
            name="password"
            type={showPwd ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your password"
            onKeyDown={e => e.key === "Enter" && submit()}
          />

          <button
            className="field-eye"
            onClick={() => setShowPwd(!showPwd)}
            type="button"
          >
            {showPwd ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>

        <ErrorMsg message={errors.password} />
      </div>

      <div className="forgot-row">
        <button
          className="auth-link"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </button>
      </div>

      <button
        className="primary-btn"
        onClick={submit}
        disabled={loading}
      >
        {loading ? (
          "Signing In..."
        ) : (
          <>
            <span>Continue</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="divider-row">
        <span className="divider-line" />
        <span className="divider-text">or</span>
        <span className="divider-line" />
      </div>

      <button className="google-btn">
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="form-footer">
        Don’t have an account?{" "}
        <button onClick={() => navigate("/sign-up")}>
          Sign Up
        </button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default LoginPage;