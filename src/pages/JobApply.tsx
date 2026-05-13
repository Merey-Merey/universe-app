/* eslint-disable react-hooks/static-components */
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { JOBS } from "./Jobs";

/* ════════════════════════════════════════════════════════════
   APPLY FOR JOB PAGE
   ════════════════════════════════════════════════════════════ */
export const JobApplyPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const job = JOBS.find(j => j.id === Number(id)) ?? JOBS[0];

  const [fullName,     setFullName]     = useState("");
  const [email,        setEmail]        = useState("");
  const [phone,        setPhone]        = useState("");
  const [coverLetter,  setCoverLetter]  = useState("");
  const [cvFile,       setCvFile]       = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    navigate(`/jobs/${job.id}/sent`);
  };

  const Content = () => (
    <div className="apply-body">

      {/* Job mini-card */}
      <div className="apply-job-card">
        <div className="job-logo-sm" style={{ background: job.companyColor, width: 47, height: 47, borderRadius: 12, fontSize: 13 }}>
          {job.companyLogo}
        </div>
        <div className="apply-job-card__info">
          <div className="apply-job-card__title">{job.title}</div>
          <div className="apply-job-card__meta">{job.company} · {job.type} · {job.salary}</div>
        </div>
      </div>

      {/* Full Name */}
      <div className="apply-field-group">
        <label className="apply-label">Full Name</label>
        <input
          className="apply-input"
          type="text"
          placeholder="Aymakhan Balausa"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="apply-field-group">
        <label className="apply-label">Email</label>
        <input
          className="apply-input"
          type="email"
          placeholder="aymakhanbalausa@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="apply-field-group">
        <label className="apply-label">Phone number</label>
        <input
          className="apply-input"
          type="tel"
          placeholder="+7 771 887 33 37"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>

      {/* Cover letter */}
      <div className="apply-field-group">
        <label className="apply-label">Cover letter</label>
        <textarea
          className="apply-input apply-textarea"
          placeholder="I am a motivated frontend developer with strong React skills..."
          value={coverLetter}
          onChange={e => setCoverLetter(e.target.value)}
        />
      </div>

      {/* Upload CV */}
      <div className="apply-field-group">
        <div className="apply-label">Upload your CV</div>
        <div className="apply-cv-hint">We support only PDF max. 2mb</div>
        <button
          className={`apply-upload-zone ${cvFile ? "apply-upload-zone--done" : ""}`}
          onClick={() => fileRef.current?.click()}>
          {cvFile ? (
            <>
              <CheckCircle size={28} color="#A78BFA" strokeWidth={1.5} />
              <span className="apply-upload-label" style={{ color: "#A78BFA" }}>{cvFile.name}</span>
            </>
          ) : (
            <>
              <Upload size={28} color="#1E1B4B" strokeWidth={1.5} />
              <span className="apply-upload-label">Upload</span>
            </>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={e => setCvFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Submit */}
      <button className="apply-submit-btn" onClick={handleSubmit}>
        Submit application
      </button>
    </div>
  );

  return (
    <div className="home-screen">

      {/* ══════ MOBILE ══════ */}
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="ann-page-topbar">
          <button className="ann-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
          </button>
          <span className="ann-page-title">Apply for job</span>
          <div style={{ width: 40 }} />
        </div>

        <div className="home-content" style={{ padding: "0 16px 32px" }}>
          <Content />
        </div>
      </div>

      {/* ══════ DESKTOP ══════ */}
      <div className="home-desktop" style={{ flex: 1 }}>
        {/* Desktop: centered card layout without sidebar */}
        <div className="apply-desk-wrapper">
          <div className="apply-desk-card">
            <button className="ann-desk-back" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
              <ArrowLeft size={16} /> Back to Job
            </button>
            <h1 className="apply-desk-title">Apply for job</h1>
            <p className="apply-desk-sub">Fill in your details below to submit your application</p>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   APPLICATION SENT PAGE
   ════════════════════════════════════════════════════════════ */
export const ApplicationSentPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const job = JOBS.find(j => j.id === Number(id)) ?? JOBS[0];

  return (
    <div className="home-screen">

      {/* ══════ MOBILE ══════ */}
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh" }}>
        <div className="sent-page">
          <div className="sent-icon">
            <svg width="78" height="80" viewBox="0 0 78 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M39 6L46.5 2L54 6L62 4L67 11L75 13L76 21L80 28L76 35L78 43L71 48L69 56L61 59L57 67L49 68L43 74L36 72L29 74L23 68L15 67L11 59L3 56L1 48L-6 43L-4 35L-8 28L-4 21L-3 13L5 11L10 4L18 6L26 2L33 6H39Z" fill="#7B98A8"/>
              <path d="M39 6C43.6 3.2 48.4 3.2 53 6C57.6 3.2 62.4 4.8 66 8.4C70.4 8.4 73.6 11.6 75.2 15.6C78.8 17.2 80.8 21.2 80 25.2C82.8 28.4 82.8 32.8 80 36C82 40 80.8 44.4 78 47.2C78.8 51.2 76.4 55.2 72.8 56.8C72 60.8 68.8 64 64.8 64.4C62.8 68 59.2 70 55.2 69.6C52.4 72.8 48.4 74 44.4 72.8C41.6 75.2 37.6 75.2 34.8 72.8C30.8 74 26.8 72.8 24 69.6C20 70 16.4 68 14.4 64.4C10.4 64 7.2 60.8 6.4 56.8C2.8 55.2 0.4 51.2 1.2 47.2C-1.6 44.4 -2.8 40 -1.2 36C-3.6 32.8 -3.6 28.4 -1.2 25.2C-2 21.2 0 17.2 3.6 15.6C5.2 11.6 8.4 8.4 12.8 8.4C16.4 4.8 21.2 3.2 25.8 6C29.6 3.2 35.2 3.2 39 6Z" fill="#B0C4CE" fillOpacity="0.3"/>
              {/* checkmark */}
              <path d="M27 40L35 48L52 32" stroke="#7B98A8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="sent-text">
            <h2 className="sent-title">Application submitted!</h2>
            <p className="sent-desc">
              Your application has been sent to{" "}
              <strong style={{ color: "#1E1B4B" }}>{job.company}.</strong>{" "}
              They will contact you soon.
            </p>
          </div>
        </div>

        <div className="sent-actions">
          <button className="sent-btn-secondary" onClick={() => navigate("/jobs")}>
            View my applications
          </button>
          <button className="sent-btn-primary" onClick={() => navigate("/jobs")}>
            Back to Jobs
          </button>
        </div>
      </div>

      {/* ══════ DESKTOP ══════ */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <div className="apply-desk-wrapper">
          <div className="apply-desk-card" style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="sent-icon" style={{ marginBottom: 8 }}>
              <svg width="78" height="80" viewBox="0 0 78 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M39 6L46.5 2L54 6L62 4L67 11L75 13L76 21L80 28L76 35L78 43L71 48L69 56L61 59L57 67L49 68L43 74L36 72L29 74L23 68L15 67L11 59L3 56L1 48L-6 43L-4 35L-8 28L-4 21L-3 13L5 11L10 4L18 6L26 2L33 6H39Z" fill="#7B98A8"/>
                <path d="M39 6C43.6 3.2 48.4 3.2 53 6C57.6 3.2 62.4 4.8 66 8.4C70.4 8.4 73.6 11.6 75.2 15.6C78.8 17.2 80.8 21.2 80 25.2C82.8 28.4 82.8 32.8 80 36C82 40 80.8 44.4 78 47.2C78.8 51.2 76.4 55.2 72.8 56.8C72 60.8 68.8 64 64.8 64.4C62.8 68 59.2 70 55.2 69.6C52.4 72.8 48.4 74 44.4 72.8C41.6 75.2 37.6 75.2 34.8 72.8C30.8 74 26.8 72.8 24 69.6C20 70 16.4 68 14.4 64.4C10.4 64 7.2 60.8 6.4 56.8C2.8 55.2 0.4 51.2 1.2 47.2C-1.6 44.4 -2.8 40 -1.2 36C-3.6 32.8 -3.6 28.4 -1.2 25.2C-2 21.2 0 17.2 3.6 15.6C5.2 11.6 8.4 8.4 12.8 8.4C16.4 4.8 21.2 3.2 25.8 6C29.6 3.2 35.2 3.2 39 6Z" fill="#B0C4CE" fillOpacity="0.3"/>
                <path d="M27 40L35 48L52 32" stroke="#7B98A8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="sent-title">Application submitted!</h2>
            <p className="sent-desc">
              Your application has been sent to{" "}
              <strong style={{ color: "#1E1B4B" }}>{job.company}.</strong>{" "}
              They will contact you soon.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", marginTop: 16 }}>
              <button className="sent-btn-secondary" onClick={() => navigate("/jobs")}>View my applications</button>
              <button className="sent-btn-primary" onClick={() => navigate("/jobs")}>Back to Jobs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};