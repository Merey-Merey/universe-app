import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="page-wrapper">
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
            <input
              className="field-input"
              name="name"
              value={form.name}
              onChange={handle}
              placeholder="Enter your full name"
            />
          </div>

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
            <label className="field-label">Phone Number</label>
            <input
              className="field-input"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handle}
              placeholder="Enter your phone number"
            />
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
            onClick={() => navigate("/verification")}
          >
            Create Password
          </button>
          <p className="auth-footer-text">
            Joined us before?{" "}
            <span
              className="auth-link auth-link--bold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;