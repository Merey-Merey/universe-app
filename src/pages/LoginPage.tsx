import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="page-wrapper">
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
            <input
              className="field-input"
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="Enter your email"
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="field-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handle}
              placeholder="Enter your password"
            />
          </div>

          <div className="forgot-row">
            <span
              className="auth-link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>
        </div>

        <div className="auth-actions">
          <button className="primary-btn" onClick={() => navigate("/home")}>
            Continue
          </button>

          <div className="divider-row">
            <span className="divider-line" />
            <span className="divider-text">or</span>
            <span className="divider-line" />
          </div>

          <button className="google-btn">
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
              <path d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.4 5.6-5 7.3v6h8.1c4.8-4.4 7.2-10.9 7.2-17.4z" fill="#4285F4"/>
              <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-8.1-6c-2.1 1.4-4.8 2.2-7.8 2.2-6 0-11-4-12.8-9.5H2.9v6.2C6.8 42.5 14.8 48 24 48z" fill="#34A853"/>
              <path d="M11.2 28.9c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-6.2H2.9C1 17.6 0 20.7 0 24s1 6.4 2.9 9.1l8.3-4.2z" fill="#FBBC05"/>
              <path d="M24 9.5c3.4 0 6.4 1.2 8.8 3.4l6.6-6.6C35.9 2.4 30.4 0 24 0 14.8 0 6.8 5.5 2.9 13.9l8.3 6.2C12.9 13.5 18 9.5 24 9.5z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <span
              className="auth-link auth-link--bold"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;