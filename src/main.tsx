import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import LogoPage from "./pages/LogoPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerificationPage from "./pages/VerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoPage />} />
        <Route path="/onboarding/:step" element={<OnboardingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/create-password" element={<CreatePasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
