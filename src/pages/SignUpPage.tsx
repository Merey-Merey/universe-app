/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { validate } from "../utils/validation";
import { formatKzPhone, isKzPhoneComplete } from "../utils/phoneFormat";
import ErrorMsg from "../components/ErrorMsg";
import { useUser, getInitials, getAvatarLetter } from "../context/UserContext";

const fieldBorder = (err: string): React.CSSProperties =>
  err ? { border: "1.5px solid #EF4444", borderRadius: 12 } : {};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [form, setForm]       = useState({ name: "", email: "", phone: "+7 (" });
  const [errors, setErrors]   = useState({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatKzPhone(e.target.value);
    setForm(f => ({ ...f, phone: formatted }));
    if (touched.phone) {
      setErrors(er => ({
        ...er,
        phone: isKzPhoneComplete(formatted) ? "" : "Введи полный номер: +7 (7XX) XXX-XX-XX",
      }));
    }
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!form.phone.startsWith("+7")) {
      setForm(f => ({ ...f, phone: "+7 (" }));
    }
    const el = e.target;
    setTimeout(() => el.setSelectionRange(el.value.length, el.value.length), 0);
  };

  const handlePhoneBlur = () => {
    setTouched(t => ({ ...t, phone: true }));
    setErrors(er => ({
      ...er,
      phone: isKzPhoneComplete(form.phone) ? "" : "Введи полный номер: +7 (7XX) XXX-XX-XX",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors(er => ({ ...er, [name]: (validate as any)[name](value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(er => ({ ...er, [name]: (validate as any)[name](value) }));
  };

  const isFormReady =
    form.name.trim().length >= 2 &&
    !validate.name(form.name) &&
    !validate.email(form.email) &&
    isKzPhoneComplete(form.phone);

  const submit = () => {
    const e = {
      name:  validate.name(form.name),
      email: validate.email(form.email),
      phone: isKzPhoneComplete(form.phone) ? "" : "Введи полный номер: +7 (7XX) XXX-XX-XX",
    };
    setErrors(e);
    setTouched({ name: true, email: true, phone: true });
    if (Object.values(e).some(Boolean)) return;

    // Сохраняем введённые данные в контекст
    setUser(u => ({
      ...u,
      fullName:     form.name.trim(),
      email:        form.email.trim(),
      phone:        form.phone,
      initials:     getInitials(form.name),
      avatarLetter: getAvatarLetter(form.name),
    }));

    navigate("/create-password");
  };

  return (
    <>
      <div className="page-wrapper mobile-only">
        <div className="auth-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#323232" strokeWidth={1.5} />
          </button>
        </div>

        <div className="auth-illustration auth-illustration--signup" />

        <div className="auth-body">
          <h2 className="auth-title">Sign Up</h2>

          <div className="auth-fields">
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input className="field-input" name="name" value={form.name}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Enter your full name"
                style={fieldBorder(errors.name)} />
              <ErrorMsg message={errors.name} />
            </div>

            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input className="field-input" name="email" type="email" value={form.email}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Enter your email"
                style={fieldBorder(errors.email)} />
              <ErrorMsg message={errors.email} />
            </div>

            <div className="field-group">
              <label className="field-label">Phone Number</label>
              <input className="field-input" name="phone" type="tel" value={form.phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onBlur={handlePhoneBlur}
                placeholder="+7 (7XX) XXX-XX-XX"
                style={fieldBorder(errors.phone)} />
              <ErrorMsg message={errors.phone} />
            </div>

            <p className="auth-terms">
              By signing up, you've agree to our{" "}
              <span className="auth-link">terms and conditions</span> and{" "}
              <span className="auth-link">Privacy Policy.</span>
            </p>
          </div>

          <div className="auth-actions">
            <button
              className="primary-btn"
              onClick={submit}
              disabled={!isFormReady}
              style={{
                opacity: isFormReady ? 1 : 0.45,
                cursor: isFormReady ? "pointer" : "not-allowed",
                transition: "opacity 0.25s ease",
              }}
            >
              Create Password
            </button>
            <p className="auth-footer-text">
              Joined us before?{" "}
              <span className="auth-link auth-link--bold" onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-page desktop-only">
        <div className="auth-left">
          <div className="auth-left__top">
            <div className="auth-tag">New here?</div>
            <h1 className="auth-h1">
              Start your<br /><em>student journey.</em>
            </h1>
            <p className="auth-desc">
              Join 50,000+ students who found jobs, housing, and friends through UniVerse.
              Registration takes only 60 seconds.
            </p>
            <div className="auth-bullets">
              <div className="auth-bullet"><div className="auth-bullet__dot" />Free for all students</div>
              <div className="auth-bullet"><div className="auth-bullet__dot" />No spam — we promise</div>
              <div className="auth-bullet"><div className="auth-bullet__dot" />Delete your account anytime</div>
            </div>
          </div>
          <div className="auth-left__footer">
            <div className="auth-stat">
              <div className="auth-stat__num">60 sec</div>
              <div className="auth-stat__label">Registration Time</div>
            </div>
            <div className="auth-stat">
              <div className="auth-stat__num">100%</div>
              <div className="auth-stat__label">Free</div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-card">
            <button className="form-back" onClick={() => navigate("/login")}>
              <ArrowLeft size={14} strokeWidth={2} /> Back to Login
            </button>
            <h2 className="form-card__title">Create Account</h2>
            <p className="form-card__subtitle">Fill in your details to register.</p>

            <div className="field-group">
              <label className="field-label">Full Name</label>
              <div className="field-wrap" style={fieldBorder(errors.name)}>
                <span className="field-icon"><UserIcon /></span>
                <input className="field-input" style={{ border:"none", boxShadow:"none" }}
                  name="name" value={form.name}
                  onChange={handleChange} onBlur={handleBlur}
                  placeholder="Your full name" />
              </div>
              <ErrorMsg message={errors.name} />
            </div>

            <div className="field-group">
              <label className="field-label">Email</label>
              <div className="field-wrap" style={fieldBorder(errors.email)}>
                <span className="field-icon"><MailIcon /></span>
                <input className="field-input" style={{ border:"none", boxShadow:"none" }}
                  name="email" type="email" value={form.email}
                  onChange={handleChange} onBlur={handleBlur}
                  placeholder="you@university.kz" />
              </div>
              <ErrorMsg message={errors.email} />
            </div>

            <div className="field-group">
              <label className="field-label">Phone Number</label>
              <div className="field-wrap" style={fieldBorder(errors.phone)}>
                <span className="field-icon"><PhoneIcon /></span>
                <input className="field-input" style={{ border:"none", boxShadow:"none" }}
                  name="phone" type="tel" value={form.phone}
                  onChange={handlePhoneChange}
                  onFocus={handlePhoneFocus}
                  onBlur={handlePhoneBlur}
                  placeholder="+7 (7XX) XXX-XX-XX" />
              </div>
              <ErrorMsg message={errors.phone} />
            </div>

            <button className="primary-btn"
              style={{ marginTop:12, opacity:isFormReady?1:0.45, cursor:isFormReady?"pointer":"not-allowed", transition:"opacity 0.25s ease" }}
              onClick={submit} disabled={!isFormReady}>
              Create Account <ArrowRight size={16} />
            </button>

            <p className="form-terms">
              By signing up, you agree to our{" "}
              <button className="auth-link" style={{ fontSize:11 }}>Terms of Service</button>{" "}and{" "}
              <button className="auth-link" style={{ fontSize:11 }}>Privacy Policy</button>
            </p>

            <div className="form-footer">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

const UserIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.07 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18v-.08z"/>
  </svg>
);