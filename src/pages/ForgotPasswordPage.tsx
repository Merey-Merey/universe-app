import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState("");

  return (
    <div className="page-wrapper">
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
            Don't worry! It happens. Please enter the email address associated
            with your account.
          </p>

          <div className="field-group" style={{ marginTop: 8 }}>
            <label className="field-label">Email Address/ Mobile Number</label>
            <input
              className="field-input"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your email / phone number"
            />
          </div>
        </div>

        <div className="auth-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/verification")}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;