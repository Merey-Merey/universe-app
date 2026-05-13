import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import './home.css'

import LogoPage from "./pages/LogoPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";
import { CreatePasswordPage } from "./pages/CreatePasswordPage";
import LoginPage from "./pages/LoginPage";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage";
import {VerificationPage} from "./pages/VerificationPage";
import HomePage from "./pages/HomePage";
import { AnnouncementDetailPage, AnnouncementsPage } from "./pages/AnnouncementsPages";
import { EventDetailPage, EventsPage } from "./pages/EventsPages";
import { JobDetailPage, JobsPage } from "./pages/Jobs";
import { ApplicationSentPage, JobApplyPage } from "./pages/JobApply";
import { ContactOwnerPage, HousingDetailPage, HousingPage } from "./pages/Housing";


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
        <Route path="/home" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
<Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
<Route path="/events" element={<EventsPage />} />
<Route path="/events/:id" element={<EventDetailPage />} />
<Route path="/jobs"     element={<JobsPage />} />
<Route path="/jobs/:id" element={<JobDetailPage />} />

<Route path="/jobs/:id/apply" element={<JobApplyPage />} />
<Route path="/jobs/:id/sent"  element={<ApplicationSentPage />} />
<Route path="/housing"            element={<HousingPage />} />
<Route path="/housing/:id"        element={<HousingDetailPage />} />
<Route path="/housing/:id/contact" element={<ContactOwnerPage />} />



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
