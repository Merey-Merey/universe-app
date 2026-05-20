import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import './home.css'
import { UserProvider } from "./context/UserContext";
import LogoPage from "./pages/LogoPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";
import { CreatePasswordPage } from "./pages/CreatePasswordPage";
import LoginPage from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import HomePage from "./pages/HomePage";
import { AnnouncementDetailPage, AnnouncementsPage } from "./pages/AnnouncementsPages";
import { JobDetailPage, JobsPage } from "./pages/Jobs";
import { ApplicationSentPage, JobApplyPage } from "./pages/JobApply";
import { ContactOwnerPage, HousingDetailPage, HousingFilterPage, HousingPage, HousingResultsPage } from "./pages/Housing";
import { EventRegisteredPage, EventRegisterPage, EventsPage } from "./pages/Events";
import { BasicInfoPage, MyApplicationsPage, NotificationsPage, PrivacySecurityPage, ProfilePage, SavedPage, SettingsPage } from "./pages/Profile";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
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
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/jobs/:id/apply" element={<JobApplyPage />} />
          <Route path="/jobs/:id/sent" element={<ApplicationSentPage />} />
          <Route path="/housing" element={<HousingPage />} />
          <Route path="/housing/filter" element={<HousingFilterPage />} />
          <Route path="/housing/results" element={<HousingResultsPage />} />
          <Route path="/housing/:id" element={<HousingDetailPage />} />
          <Route path="/housing/:id/contact" element={<ContactOwnerPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id/register" element={<EventRegisterPage />} />
          <Route path="/events/:id/success" element={<EventRegisteredPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/basic-info" element={<BasicInfoPage />} />
          <Route path="/profile/applications" element={<MyApplicationsPage />} />
          <Route path="/profile/notifications" element={<NotificationsPage />} />
          <Route path="/profile/privacy" element={<PrivacySecurityPage />} />
          <Route path="/profile/saved" element={<SavedPage />} />
          <Route path="/profile/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);