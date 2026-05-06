import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const CreatePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="page-wrapper">
      <div className="auth-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} color="#323232" strokeWidth={1.5} />
        </button>
      </div>

      <div className="auth-illustration auth-illustration--create-pwd" />

      <div className="auth-body auth-body--centered">
        <h2 className="">Create New Password</h2>

        <div className="auth-fields">
          <div className="field-group">
            <label className="field-label">New Password</label>
            <div className="field-input-wrap">
              <input
                className="field-input field-input--icon"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              <button
                className="field-icon-btn"
                onClick={() => setShowPwd(!showPwd)}
                type="button"
              >
                {showPwd ? (
                  <EyeOff size={18} color="#A09DC5" />
                ) : (
                  <Eye size={18} color="#A09DC5" />
                )}
              </button>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Confirm New Password</label>
            <input
              className="field-input"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
            />
          </div>
        </div>

        <div className="auth-actions">
          <button className="primary-btn" onClick={() => navigate("/home")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordPage;