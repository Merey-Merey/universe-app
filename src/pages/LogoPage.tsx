import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const LogoPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding/1");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page-wrapper">
      <div className="logo-center">
        <img src={logoImg} alt="UniVerse" style={{ width: 230, height: "auto" }} />
      </div>
    </div>
  );
};

export default LogoPage;
