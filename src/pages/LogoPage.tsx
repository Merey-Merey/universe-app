import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const LogoPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 28);

    const timer = setTimeout(() => {
      navigate("/onboarding/1");
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="logo-page">
      <div className="logo-page__blob logo-page__blob--1" />
      <div className="logo-page__blob logo-page__blob--2" />
      <div className="logo-page__blob logo-page__blob--3" />

      <div className="logo-page__inner">
        <div className="logo-page__logo">
          <img src={logoImg} alt="UniVerse" className="logo-page__img" />
        </div>
        <p className="logo-page__tagline">A universe of opportunities for students</p>
        <div className="logo-page__bar-track">
          <div
            className="logo-page__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoPage;