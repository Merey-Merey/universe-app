/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/static-components */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, BriefcaseBusiness,
  Home, Building2, Calendar, User, LogOut,
  Search, MapPin, Heart, CheckCircle2,
} from "lucide-react";
import { useUser } from "../context/UserContext";

export interface JobItem {
  id: number;
  company: string;
  companyLogo: string;
  companyColor: string;
  title: string;
  location: string;
  type: string;
  mode: string;
  experience: string;
  salary: string;
  salaryShort: string;
  salaryPeriod: string;
  about: string;
  skills: string[];
  requirements: string[];
  accentColor: string;
}

export const JOBS: JobItem[] = [
  {
    id: 1,
    company: "Kaspi Bank",
    companyLogo: "K",
    companyColor: "#E84B2A",
    title: "Frontend Developer",
    location: "Shymkent, Kazakhstan",
    type: "Part-time",
    mode: "Remote",
    experience: "2+ yrs",
    salary: "₸250,000",
    salaryShort: "₸250K",
    salaryPeriod: "per month · negotiable",
    about:
      "We are looking for a skilled Frontend Developer to join Kaspi Bank's product team. You will build and maintain high-performance web interfaces used by millions of Kazakhstanis every day. The role is part-time and fully remote.",
    skills: ["React.js", "TypeScript", "CSS / Tailwind", "Git", "REST API", "Figma"],
    requirements: [
      "2+ years of experience with React or Vue.js",
      "Strong knowledge of HTML5, CSS3, JavaScript (ES6+)",
      "Experience with REST APIs and version control (Git)",
      "Understanding of UI/UX principles and responsive design",
      "Kazakh or Russian language — intermediate or higher",
    ],
    accentColor: "#4C1D95",
  },
  {
    id: 2,
    company: "Kolesa Group",
    companyLogo: "KG",
    companyColor: "#2563EB",
    title: "UX/UX Designer",
    location: "Remote",
    type: "Freelance",
    mode: "Remote",
    experience: "1+ yr",
    salary: "₸200,000",
    salaryShort: "₸200K",
    salaryPeriod: "per month",
    about:
      "Join Kolesa Group as a UX/UX Designer and craft intuitive experiences for Kazakhstan's largest automotive marketplace.",
    skills: ["Figma", "Prototyping", "UX Research", "Illustrator"],
    requirements: [
      "Portfolio with 2+ design projects",
      "Proficiency in Figma",
      "Good eye for aesthetics and detail",
    ],
    accentColor: "#C4B5FD",
  },
  {
    id: 3,
    company: "Chocofamily",
    companyLogo: "CH",
    companyColor: "#7C3AED",
    title: "Data Analyst Intern",
    location: "Office · Full-time",
    type: "Full-time",
    mode: "On-site",
    experience: "No exp",
    salary: "₸340,000",
    salaryShort: "₸340K",
    salaryPeriod: "per month",
    about:
      "Analyze product and business data to drive decisions at Chocofamily. Build dashboards and run experiments.",
    skills: ["Python", "SQL", "Tableau", "Excel"],
    requirements: [
      "Enrolled or recent graduate in a relevant field",
      "Basic SQL knowledge",
      "Eagerness to learn data tools",
    ],
    accentColor: "#C4B5FD",
  },
  {
    id: 4,
    company: "Sajda",
    companyLogo: "SJ",
    companyColor: "#059669",
    title: "Mobile Developer",
    location: "Remote",
    type: "Internship",
    mode: "Remote",
    experience: "No exp",
    salary: "₸120,000",
    salaryShort: "₸120K",
    salaryPeriod: "per month",
    about:
      "Build mobile features for Sajda's Islamic lifestyle app. Great for students looking for real-world experience.",
    skills: ["React Native", "JavaScript", "Git"],
    requirements: [
      "Basic knowledge of React Native or Flutter",
      "Available 20+ hrs/week",
    ],
    accentColor: "#C4B5FD",
  },
  {
    id: 5,
    company: "Jusan Bank",
    companyLogo: "JB",
    companyColor: "#0891B2",
    title: "Content Manager",
    location: "Almaty",
    type: "Part-time",
    mode: "Hybrid",
    experience: "1+ yr",
    salary: "₸180,000",
    salaryShort: "₸180K",
    salaryPeriod: "per month",
    about:
      "Create and manage content for Jusan Bank's digital channels. Work with marketing and product teams.",
    skills: ["Copywriting", "SEO", "Figma", "Analytics"],
    requirements: [
      "1+ year of content experience",
      "Strong written Kazakh or Russian",
      "Experience with CMS platforms",
    ],
    accentColor: "#C4B5FD",
  },
];

const cityFilters = ["Remote", "Shymkent", "Almaty", "Astana", "Taraz"];
const typeFilters = ["All", "Part-time", "Full-time", "Internship"];

const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} /> },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} /> },
  { id: "events",  label: "Events",  icon: <Calendar size={22} /> },
  { id: "profile", label: "Profile", icon: <User size={22} /> },
];

const Sidebar: React.FC<{ activeNav: string; setActiveNav: (v: string) => void }> = ({
  activeNav, setActiveNav,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <aside className="homee-sidebar">
      <div className="home-sidebar__logo">
        <span className="home-sidebar__logo-uni">Uni</span>
        <span className="home-sidebar__logo-verse">Verse</span>
      </div>
      <nav className="home-sidebar__nav">
        {navItems.map(item => (
          <button key={item.id}
            className={`home-sidebar__item ${activeNav === item.id ? "home-sidebar__item--active" : ""}`}
            onClick={() => {
              setActiveNav(item.id);
              if (item.id === "home") navigate("/home");
              if (item.id === "jobs") navigate("/jobs");
              if (item.id === "housing") navigate("/housing");
              if (item.id === "events") navigate("/events");
              if (item.id === "profile") navigate("/profile");
            }}>
            {item.icon}{item.label}
          </button>
        ))}
      </nav>
      <div className="home-sidebar__bottom">
        <div className="home-sidebar__user">
          <div className="home-sidebar__avatar">
            {user.initials || <User size={18} />}
          </div>
          <div>
            <div className="home-sidebar__user-name">{user.fullName || "—"}</div>
            <div className="home-sidebar__user-meta">
              {[user.city, user.role].filter(Boolean).join(" · ") || "Student"}
            </div>
          </div>
        </div>
        <button className="home-sidebar__item"
          style={{ marginTop: 4, color: "rgba(255,255,255,0.4)" }}
          onClick={() => navigate("/login")}>
          <LogOut size={20} /> Log out
        </button>
      </div>
    </aside>
  );
};

export const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, toggleSavedJob } = useUser();
  const [activeNav, setActiveNav] = useState("jobs");
  const [search, setSearch] = useState("");
  const [activeCity, setActiveCity] = useState("Remote");
  const [activeType, setActiveType] = useState("All");

  const topPick = JOBS[0];

  const filtered = JOBS.slice(1).filter(j => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "All" || j.type === activeType;
    return matchSearch && matchType;
  });

  const JobListItem: React.FC<{ job: JobItem }> = ({ job }) => {
    const isSaved = (user.savedJobIds ?? []).includes(job.id);
    return (
      <div className="new-job-row" onClick={() => navigate(`/jobs/${job.id}`)}
        style={{ borderLeft: `3px solid ${job.accentColor}` }}>
        <div className="new-job-row__info">
          <div className="new-job-row__title">{job.title}</div>
          <div className="new-job-row__meta">{job.company} · {job.location}</div>
          <span className="new-job-row__tag">{job.type}</span>
        </div>
        <div className="new-job-row__right">
          <div className="new-job-row__salary">{job.salary}<span>/mo</span></div>
          <button style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}
            onClick={e => { e.stopPropagation(); toggleSavedJob(job.id); }}>
            <Heart size={16} fill={isSaved ? "#462370" : "none"} color="#462370" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    );
  };

  const MainContent = () => (
    <div className="new-jobs-page">
      <p className="new-jobs-page__count">234 open positions</p>
      <h1 className="new-jobs-page__heading">Find your job</h1>

      <div className="new-jobs-search">
        <Search size={16} color="#A09DC5" />
        <input className="new-jobs-search__input" placeholder="Job title, company"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="new-jobs-filters">
        {cityFilters.map(f => (
          <button key={f}
            className={`new-jobs-filter ${activeCity === f ? "new-jobs-filter--active" : ""}`}
            onClick={() => setActiveCity(f)}>{f}</button>
        ))}
      </div>

      <div className="new-jobs-filters" style={{ marginTop: 6 }}>
        {typeFilters.map(f => (
          <button key={f}
            className={`new-jobs-filter ${activeType === f ? "new-jobs-filter--active" : ""}`}
            onClick={() => setActiveType(f)}>{f}</button>
        ))}
      </div>

      <p className="new-jobs-section-label">TOP PICK</p>
      <div className="new-job-top-pick" onClick={() => navigate(`/jobs/${topPick.id}`)}>
        <div className="new-job-top-pick__top">
          <div>
            <div className="new-job-top-pick__title">{topPick.title}</div>
            <div className="new-job-top-pick__company">{topPick.company}</div>
          </div>
          <span className="new-job-top-pick__badge">TOP PICK</span>
        </div>
        <div className="new-job-top-pick__bottom">
          <div className="new-job-top-pick__tags">
            <span className="new-job-top-pick__tag">{topPick.mode}</span>
            <span className="new-job-top-pick__tag">{topPick.type}</span>
          </div>
          <span className="new-job-top-pick__salary">{topPick.salaryShort}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "18px 0 10px" }}>
        <span className="new-jobs-section-jobs-title">Jobs</span>
      </div>

      <div className="new-jobs-list">
        {filtered.map(j => <JobListItem key={j.id} job={j} />)}
      </div>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}><MainContent /></div>
        <div className="home-navbar">
          {navItems.map(item => {
            const isActive = activeNav === item.id;
            return (
              <button key={item.id}
                className={`home-nav-item ${isActive ? "home-nav-item--active" : "home-nav-item--inactive"}`}
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.id === "home") navigate("/home");
                  if (item.id === "jobs") navigate("/jobs");
                  if (item.id === "housing") navigate("/housing");
                  if (item.id === "events") navigate("/events");
                  if (item.id === "profile") navigate("/profile");
                }}>
                {item.icon}
                <span className={`home-nav-label ${isActive ? "home-nav-label--show" : "home-nav-label--hide"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div className="home-content"><MainContent /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JobDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeNav] = useState("jobs");
  const { user, toggleSavedJob, applyToJob } = useUser();

  const job = JOBS.find(j => j.id === Number(id)) ?? JOBS[0];
  const isSaved   = (user.savedJobIds   ?? []).includes(job.id);
  const isApplied = (user.appliedJobIds ?? []).includes(job.id);

  const handleApply = () => {
    applyToJob(job.id);
    navigate(`/jobs/${job.id}/apply`);
  };

  const DetailContent = () => (
    <div className="new-job-detail">
      <div className="new-job-detail__card">
        <div className="new-job-detail__card-top">
          <div className="new-job-detail__logo-wrap">
            <div className="new-job-detail__logo" style={{ background: job.companyColor }}>
              {job.companyLogo}
            </div>
            <div>
              <div className="new-job-detail__card-title">{job.title}</div>
              <div className="new-job-detail__card-company">{job.company} · {job.location}</div>
            </div>
          </div>
          <span className="new-job-detail__top-badge">TOP PICK</span>
        </div>
        <div className="new-job-detail__card-tags">
          <span className="new-job-detail__card-tag">{job.mode}</span>
          <span className="new-job-detail__card-tag">{job.type}</span>
          <span className="new-job-detail__card-tag">React</span>
        </div>
        <div className="new-job-detail__card-salary-row">
          <div>
            <div className="new-job-detail__salary">{job.salary}</div>
            <div className="new-job-detail__salary-sub">{job.salaryPeriod}</div>
          </div>
          <button className="new-job-detail__quick-apply" onClick={handleApply}
            style={isApplied ? { background: "#059669", color: "#fff" } : undefined}>
            {isApplied ? "Applied ✓" : "Quick Apply"}
          </button>
        </div>
      </div>

      <div className="new-job-detail__info-tiles">
        <div className="new-job-detail__tile">
          <div className="new-job-detail__tile-value">{job.experience}</div>
          <div className="new-job-detail__tile-label">EXPERIENCE</div>
        </div>
        <div className="new-job-detail__tile">
          <div className="new-job-detail__tile-value">{job.type}</div>
          <div className="new-job-detail__tile-label">SCHEDULE</div>
        </div>
        <div className="new-job-detail__tile">
          <div className="new-job-detail__tile-value">Open</div>
          <div className="new-job-detail__tile-label">STATUS</div>
        </div>
      </div>

      <div className="new-job-detail__section">
        <h3 className="new-job-detail__section-title">About the role</h3>
        <p className="new-job-detail__section-text">{job.about}</p>
      </div>

      <div className="new-job-detail__section">
        <h3 className="new-job-detail__section-title">Requirements</h3>
        <div className="new-job-detail__reqs">
          {job.requirements.map((r, i) => (
            <div key={i} className="new-job-detail__req-row">
              <CheckCircle2 size={18} color="#A78BFA" strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="new-job-detail__section">
        <h3 className="new-job-detail__section-title">Skills</h3>
        <div className="new-job-detail__skills">
          {job.skills.map(s => <span key={s} className="new-job-detail__skill-tag">{s}</span>)}
        </div>
      </div>

      <div className="new-job-detail__section">
        <h3 className="new-job-detail__section-title">About the company</h3>
        <div className="new-job-detail__company-card">
          <div className="new-job-detail__logo new-job-detail__logo--sm" style={{ background: "#1E1B4B" }}>
            {job.companyLogo}
          </div>
          <div style={{ flex: 1 }}>
            <div className="new-job-detail__company-name">{job.company}</div>
            <div className="new-job-detail__company-meta">Fintech · 5,000+ employees · Almaty</div>
          </div>
          <MapPin size={20} color="#1E1B4B" />
        </div>
      </div>

      <div className="new-job-detail__section">
        <h3 className="new-job-detail__section-title">Similar jobs</h3>
        {JOBS.filter(j => j.id !== job.id).slice(0, 2).map(j => (
          <div key={j.id} className="new-job-detail__similar-row" onClick={() => navigate(`/jobs/${j.id}`)}>
            <div className="new-job-detail__logo new-job-detail__logo--sm" style={{ background: "#1E1B4B" }}>
              {j.companyLogo}
            </div>
            <div style={{ flex: 1 }}>
              <div className="new-job-detail__company-name">{j.title}</div>
              <div className="new-job-detail__company-meta">{j.company} · {j.mode} · {j.type}</div>
            </div>
            <div className="new-job-detail__similar-salary">{j.salaryShort}</div>
          </div>
        ))}
      </div>

      <div className="new-job-detail__cta-row">
        <button
          className={`new-job-detail__save-btn ${isSaved ? "new-job-detail__save-btn--saved" : ""}`}
          onClick={() => toggleSavedJob(job.id)}>
          <Heart size={16} fill={isSaved ? "#1E1B4B" : "none"} color="#1E1B4B" />
          {isSaved ? "Saved" : "Save"}
        </button>
        <button className="new-job-detail__apply-btn" onClick={handleApply}
          style={isApplied ? { background: "#059669" } : undefined}>
          {isApplied ? "Applied ✓" : "Apply now"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="ann-page-topbar">
          <button className="ann-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
          </button>
          <span className="ann-page-title">Job Details</span>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}>
          <DetailContent />
        </div>
      </div>

      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Jobs
              </button>
              <h1 style={{ marginTop: 8 }}>Job Detail</h1>
              <p>Full information about the position</p>
            </div>
          </div>
          <div className="home-content" style={{ overflowY: "auto" }}>
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main"><DetailContent /></div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Other Jobs</h3>
                {JOBS.filter(j => j.id !== job.id).map(j => (
                  <div key={j.id} className="ann-aside-card" onClick={() => navigate(`/jobs/${j.id}`)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div className="job-logo-xs" style={{ background: j.companyColor }}>{j.companyLogo}</div>
                      <span className="ann-aside-card__cat"><BriefcaseBusiness size={11} /> {j.type}</span>
                    </div>
                    <div className="ann-aside-card__title">{j.title}</div>
                    <div className="ann-aside-card__meta">{j.company} · {j.salaryShort}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};