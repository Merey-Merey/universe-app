import { ArrowLeft, Check, Eye, EyeOff, LockIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../utils/validation";
import ErrorMsg from "../components/ErrorMsg";

const fieldBorder = (err: string): React.CSSProperties =>
  err ? { border: "1.5px solid #EF4444", borderRadius: 12 } : {};

const btnStyle = (ready: boolean): React.CSSProperties => ({
  opacity: ready ? 1 : 0.45,
  cursor: ready ? "pointer" : "not-allowed",
  transition: "opacity 0.25s ease",
});

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [showCfm,  setShowCfm]  = useState(false);
  const [pwdErr, setPwdErr] = useState("");
  const [cfmErr, setCfmErr] = useState("");
  const [pwdTouched, setPwdTouched] = useState(false);
  const [cfmTouched, setCfmTouched] = useState(false);

  const getStrength = (pwd: string) => {
    let sc = 0;
    if (pwd.length >= 8) sc++;
    if (/[A-Z]/.test(pwd)) sc++;
    if (/[0-9]/.test(pwd)) sc++;
    if (/[^A-Za-z0-9]/.test(pwd)) sc++;
    return sc;
  };
  const strength = getStrength(password);
  const segClass = (i: number) => {
    if (i >= strength) return "";
    if (strength <= 1) return "weak";
    if (strength <= 2) return "medium";
    return "strong";
  };

  const onPwdChange = (v: string) => {
    setPassword(v);
    if (pwdTouched) setPwdErr(validate.password(v));
    if (cfmTouched && confirm) setCfmErr(validate.confirmPassword(v, confirm));
  };

  const onCfmChange = (v: string) => {
    setConfirm(v);
    if (cfmTouched) setCfmErr(validate.confirmPassword(password, v));
  };

  const onPwdBlur = () => {
    setPwdTouched(true);
    setPwdErr(validate.password(password));
  };

  const onCfmBlur = () => {
    setCfmTouched(true);
    setCfmErr(validate.confirmPassword(password, confirm));
  };

  const isReady = !validate.password(password) && !validate.confirmPassword(password, confirm);

  const submit = () => {
    const pe = validate.password(password);
    const ce = validate.confirmPassword(password, confirm);
    setPwdErr(pe); setCfmErr(ce);
    setPwdTouched(true); setCfmTouched(true);
    if (pe || ce) return;
    sessionStorage.removeItem("universe-reset-contact");
    sessionStorage.removeItem("universe-reset-verified");
    navigate("/home");
  };

  const renderPwdField = (mobile?: boolean) => (
    <div className="field-group">
      <label className="field-label">{mobile ? "New Password" : "Новый пароль"}</label>
      <div
        className={mobile ? "field-input-wrap" : "field-wrap"}
        style={fieldBorder(pwdErr)}
      >
        {!mobile && <span className="field-icon"><LockIcon /></span>}
        <input
          className={mobile ? "field-input field-input--icon" : "field-input"}
          style={{ border: "none", boxShadow: "none" }}
          type={showPwd ? "text" : "password"}
          value={password}
          name= "new-password"
          onChange={e => onPwdChange(e.target.value)}
          onBlur={onPwdBlur}
          placeholder={mobile ? "Reset a password" : "Сбросить пароль"}
        />
        <button
          className={mobile ? "field-icon-btn" : "field-eye"}
          type="button"
          tabIndex={-1}
          onClick={() => setShowPwd(s => !s)}
        >
          {showPwd
            ? <EyeOff size={mobile ? 18 : 16} color={mobile ? "#A09DC5" : undefined} />
            : <Eye    size={mobile ? 18 : 16} color={mobile ? "#A09DC5" : undefined} />}
        </button>
      </div>
      {password.length > 0 && (
        <div className="strength-bar" style={{ marginTop: 6 }}>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`strength-bar__seg ${segClass(i)}`}
              style={{ transition: "background 0.3s ease" }}
            />
          ))}
        </div>
      )}
      <ErrorMsg message={pwdErr} />
    </div>
  );

  const renderCfmField = (mobile?: boolean) => (
    <div className="field-group">
      <label className="field-label">{mobile ? "Confirm New Password" : "Повтори пароль"}</label>
      <div
        className={mobile ? undefined : "field-wrap"}
        style={fieldBorder(cfmErr)}
      >
        {!mobile && <span className="field-icon"><LockIcon /></span>}
        <input
          className="field-input"
          style={{ border: "none", boxShadow: "none" }}
          type={showCfm ? "text" : "password"}
          value={confirm}
          onChange={e => onCfmChange(e.target.value)}
          onBlur={onCfmBlur}
          placeholder={mobile ? "Repeat your password" : "Повтори пароль"}
          autoComplete="new-password"
        />
        <button
          className={mobile ? "field-icon-btn" : "field-eye"}
          type="button"
          tabIndex={-1}
          onClick={() => setShowCfm(s => !s)}
          style={mobile ? { position: "absolute", right: 14 } : undefined}
        >
          {showCfm
            ? <EyeOff size={mobile ? 18 : 16} color={mobile ? "#A09DC5" : undefined} />
            : <Eye    size={mobile ? 18 : 16} color={mobile ? "#A09DC5" : undefined} />}
        </button>
      </div>
      <ErrorMsg message={cfmErr} />
    </div>
  );

  return (
    <>
      <div className="page-wrapper mobile-only">
        <div className="auth-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#323232" strokeWidth={1.5} />
          </button>
        </div>
        <div className="auth-illustration auth-illustration--create-pwd" />
        <div className="auth-body auth-body--centered">
          <h2 className="auth-title">Reset Password</h2>
          <div className="auth-fields">
            {renderPwdField(true)}
            {renderCfmField(true)}
          </div>
          <div className="auth-actions">
            <button className="primary-btn" onClick={submit}
              disabled={!isReady} style={btnStyle(isReady)}>
              Reset Password
            </button>
          </div>
        </div>
      </div>

<div className="auth-page desktop-only">
  <div className="auth-left">
    <div className="auth-left__top">
      <div className="auth-tag">Final Step</div>

      <h1 className="auth-h1">
        Reset Your Password
        <br />
        <em>strong password.</em>
      </h1>

      <p className="auth-desc">
        Use at least 8 characters, combining uppercase letters,
        numbers, and special symbols.
      </p>

      <div className="auth-bullets">
        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          Minimum 8 characters
        </div>

        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          Uppercase and lowercase letters
        </div>

        <div className="auth-bullet">
          <div className="auth-bullet__dot" />
          Numbers and special characters
        </div>
      </div>
    </div>

    <div className="auth-left__footer">
      <div className="auth-stat">
        <div className="auth-stat__num">AES</div>
        <div className="auth-stat__label">
          Encrypted
        </div>
      </div>

      <div className="auth-stat">
        <div className="auth-stat__num">0</div>
        <div className="auth-stat__label">
          Data Sold
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

      <h2 className="form-card__title">
        Reset Your Password
      </h2>

      <p className="form-card__subtitle">
        Choose a secure password to protect your account.
      </p>

      {renderPwdField()}

      {renderCfmField()}

      <button
        className="primary-btn"
        style={{
          marginTop: 8,
          ...btnStyle(isReady),
        }}
        onClick={submit}
        disabled={!isReady}
      >
        Reset Your Password <Check size={16} />
      </button>

      <div className="form-footer">
        Already have an account?{" "}
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
