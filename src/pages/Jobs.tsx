/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BriefcaseBusiness,
  Home, Building2, Calendar, User, LogOut,
  Search, Bell, MapPin, Banknote, MoreVertical,
  CheckCircle2, Heart,
} from "lucide-react";

/* ─── Types & Data ───────────────────────────────────────── */
export interface JobItem {
  id: number;
  company: string;
  companyLogo: string; // initials fallback
  companyColor: string;
  title: string;
  location: string;
  type: string;       // Part-time / Full-time
  mode: string;       // Remote / On-site / Hybrid
  experience: string; // 1+ year exp
  salary: string;     // ₸250,000
  salaryPeriod: string;
  about: string;
  skills: string[];
  requirements: string[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const JOBS: JobItem[] = [
  {
    id: 1,
    company: "Kaspi Bank",
    companyLogo: "KB",
    companyColor: "#E84B2A",
    title: "Frontend Developer",
    location: "Shymkent, Kazakhstan",
    type: "Part-time",
    mode: "Remote",
    experience: "1+ year exp",
    salary: "₸250,000",
    salaryPeriod: "Monthly salary",
    about:
      "Build and maintain user-facing features for Kaspi's digital platforms. Work closely with a cross-functional team of designers and backend engineers to ship high-quality products.",
    skills: ["React", "JavaScript", "CSS", "Git", "Figma"],
    requirements: [
      "1+ year of frontend development experience",
      "Strong portfolio with 2+ projects",
      "Kazakh or Russian language — intermediate",
    ],
  },
  {
    id: 2,
    company: "Kolesa Group",
    companyLogo: "KG",
    companyColor: "#2563EB",
    title: "Backend Developer",
    location: "Almaty, Kazakhstan",
    type: "Full-time",
    mode: "On-site",
    experience: "2+ years exp",
    salary: "₸400,000",
    salaryPeriod: "Monthly salary",
    about:
      "Join Kolesa Group's engineering team to build scalable backend services for Kazakhstan's largest automotive marketplace. You'll work with high-load systems serving millions of users.",
    skills: ["Go", "PostgreSQL", "Docker", "Kafka", "Redis"],
    requirements: [
      "2+ years of backend development",
      "Experience with high-load systems",
      "Strong knowledge of Go or Python",
    ],
  },
  {
    id: 3,
    company: "Choco",
    companyLogo: "CH",
    companyColor: "#7C3AED",
    title: "UI/UX Designer",
    location: "Shymkent, Kazakhstan",
    type: "Part-time",
    mode: "Hybrid",
    experience: "No exp required",
    salary: "₸150,000",
    salaryPeriod: "Monthly salary",
    about:
      "Design intuitive and delightful interfaces for Choco's food delivery app. Collaborate with product managers and developers to craft pixel-perfect experiences for our users.",
    skills: ["Figma", "Prototyping", "UX Research", "Illustrator"],
    requirements: [
      "Portfolio with 1+ design projects",
      "Proficiency in Figma",
      "Good eye for aesthetics and detail",
    ],
  },
  {
    id: 4,
    company: "Jusan Bank",
    companyLogo: "JB",
    companyColor: "#059669",
    title: "Data Analyst",
    location: "Nur-Sultan, Kazakhstan",
    type: "Full-time",
    mode: "Remote",
    experience: "1+ year exp",
    salary: "₸320,000",
    salaryPeriod: "Monthly salary",
    about:
      "Analyze product and business data to drive key decisions at Jusan Bank. You'll build dashboards, run experiments, and work closely with product teams to improve our digital banking experience.",
    skills: ["Python", "SQL", "Tableau", "Excel", "Statistics"],
    requirements: [
      "1+ year working with data",
      "Proficiency in SQL and Python",
      "Experience with BI tools (Tableau / Power BI)",
    ],
  },
];

/* ─── Shared nav items ───────────────────────────────────── */
const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} />              },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} />         },
  { id: "events",  label: "Events",  icon: <Calendar size={22} />          },
  { id: "profile", label: "Profile", icon: <User size={22} />              },
];

/* ─── Sidebar ────────────────────────────────────────────── */
const Sidebar: React.FC<{ activeNav: string; setActiveNav: (v: string) => void }> = ({
  activeNav, setActiveNav,
}) => {
  const navigate = useNavigate();
  return (
    <aside className="home-sidebar">
      <div className="home-sidebar__logo">
        <span className="home-sidebar__logo-uni">Uni</span>
        <span className="home-sidebar__logo-verse">Verse</span>
      </div>
      <nav className="home-sidebar__nav">
        {navItems.map(item => (
          <button key={item.id}
            className={`home-sidebar__item ${activeNav === item.id ? "home-sidebar__item--active" : ""}`}
            onClick={() => { setActiveNav(item.id); navigate("/home"); }}>
            {item.icon}{item.label}
            {item.id === "home" && <span className="home-sidebar__item-badge">3</span>}
          </button>
        ))}
      </nav>
      <div className="home-sidebar__bottom">
        <div className="home-sidebar__user">
          <div className="home-sidebar__avatar">AB</div>
          <div>
            <div className="home-sidebar__user-name">Aymakhan Balausa</div>
            <div className="home-sidebar__user-meta">Shymkent · Student</div>
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

/* ════════════════════════════════════════════════════════════
   JOBS LIST PAGE
   ════════════════════════════════════════════════════════════ */
export const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("jobs");
  const [search, setSearch] = useState("");

  const filtered = JOBS.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.type.toLowerCase().includes(search.toLowerCase())
  );

  const CardList = () => (
    <div className="ann-list">
      {filtered.map(j => (
        <div key={j.id} className="ann-list-card job-list-card"
          onClick={() => navigate(`/jobs/${j.id}`)}>
          <div className="ann-list-card__left">
            {/* Company logo */}
            <div className="job-list-card__logo-row">
              <div className="job-logo-sm" style={{ background: j.companyColor }}>
                {j.companyLogo}
              </div>
              <span className="ann-list-card__cat" style={{ marginBottom: 0 }}>
                <BriefcaseBusiness size={13} /> {j.type}
              </span>
            </div>
            <div className="ann-list-card__title" style={{ marginTop: 6 }}>{j.title}</div>
            <div className="ann-list-card__meta">{j.company} · {j.location}</div>
          </div>
          <div className="ann-list-card__right">
            <div className="ann-list-card__amount">{j.salary}</div>
            <div className="ann-list-card__deadline">
              <span className="ann-list-card__dl-label">Mode</span>
              <span className="ann-list-card__dl-val">{j.mode}</span>
            </div>
            <ArrowRight size={16} color="#A78BFA" />
          </div>
        </div>
      ))}
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
          <span className="ann-page-title">Jobs</span>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ padding: "0 16px 12px" }}>
          <div className="ann-search-bar">
            <Search size={15} color="#A09DC5" />
            <input className="ann-search-input" placeholder="Search jobs..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="home-content" style={{ padding: "0 16px 24px" }}>
          <CardList />
        </div>

        <div className="home-navbar">
          {navItems.map(item => (
            <button key={item.id}
              className={`home-nav-item ${activeNav === item.id ? "home-nav-item--active" : "home-nav-item--inactive"}`}
              onClick={() => { setActiveNav(item.id); navigate("/home"); }}>
              {item.icon}
              {item.id === "home" && <span>Home</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ══════ DESKTOP ══════ */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <h1 style={{ marginTop: 8 }}>Jobs</h1>
              <p>Browse all available job listings</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__search">
                <Search size={15} color="#A09DC5" />
                <input className="ann-search-input"
                  placeholder="Search jobs..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#1E1B4B", fontFamily: "Space Grotesk, sans-serif", width: "100%" }} />
              </div>
              <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" />
                <div className="home-topbar__notif-dot" />
              </div>
            </div>
          </div>

          <div className="home-content">
            <div className="ann-desk-grid">
              {filtered.map(j => (
                <div key={j.id} className="ann-desk-card"
                  onClick={() => navigate(`/jobs/${j.id}`)}>
                  <div className="ann-desk-card__top">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="job-logo-sm" style={{ background: j.companyColor, width: 36, height: 36, fontSize: 11 }}>
                        {j.companyLogo}
                      </div>
                      <span className="ann-desk-card__cat">
                        <BriefcaseBusiness size={13} /> {j.type}
                      </span>
                    </div>
                    <span className="ann-desk-card__amount">{j.salary}</span>
                  </div>
                  <div className="ann-desk-card__title">{j.title}</div>
                  <div className="ann-desk-card__meta">{j.company} · {j.location}</div>
                  <div className="ann-desk-card__footer">
                    <div className="ann-desk-card__dl">
                      <span className="ann-desk-card__dl-label">Mode</span>
                      <span className="ann-desk-card__dl-val">{j.mode} · {j.experience}</span>
                    </div>
                    <ArrowRight size={16} color="#A78BFA" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   JOB DETAIL PAGE
   ════════════════════════════════════════════════════════════ */
export const JobDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeNav, setActiveNav] = useState("jobs");
  const [saved, setSaved] = useState(false);

  const job = JOBS.find(j => j.id === Number(id)) ?? JOBS[0];

  const DetailContent = () => (
    <div className="ev-detail-body">

      {/* Header row — logo + title */}
      <div className="job-detail-header">
        <div className="job-detail-header__toprow">
          <div className="job-logo-lg" style={{ background: job.companyColor }}>
            {job.companyLogo}
          </div>
        
        </div>
        <div className="job-detail-header__info">
          <span className="job-detail-company">{job.company}</span>
          <h2 className="job-detail-title">{job.title}</h2>
          <div className="job-detail-location">
            <MapPin size={14} color="#6B7280" strokeWidth={1.5} />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
       {/* Tags */}
        <div className="job-detail-tags">
          <span className="job-tag job-tag--accent">{job.type}</span>
          <span className="job-tag job-tag--accent">{job.mode}</span>
          <span className="job-tag job-tag--muted">{job.experience}</span>
        </div>

      {/* Salary card */}
      <div className="job-salary-card">
        <div className="job-salary-card__left">
          <div className="job-salary-card__label">
            <Banknote size={14} color="#A09DC5" />
            {job.salaryPeriod}
          </div>
          <div className="job-salary-card__amount">{job.salary}</div>
        </div>
        <button className="job-salary-card__apply" onClick={() => navigate(`/jobs/${job.id}/apply`)}>
          Apply <ArrowRight size={14} />
        </button>
      </div>

      {/* About */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">About the role</h3>
        <p className="ann-detail-section__text">{job.about}</p>
      </div>

      {/* Skills */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Skills required</h3>
        <div className="job-skills-row">
          {job.skills.map(s => (
            <span key={s} className="job-skill-tag">{s}</span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Requirements</h3>
        <div className="job-reqs">
          {job.requirements.map((r, i) => (
            <div key={i} className="job-req-row">
              <CheckCircle2 size={18} color="#A78BFA" strokeWidth={1.5} />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="job-cta-row">
        <button
          className={`job-save-btn ${saved ? "job-save-btn--saved" : ""}`}
          onClick={() => setSaved(v => !v)}>
          <Heart size={16} fill={saved ? "#1E1B4B" : "none"} color="#1E1B4B" />
          {saved ? "Saved" : "Save"}
        </button>
        <button className="ann-detail-cta" style={{ flex: 1 }} onClick={() => navigate(`/jobs/${job.id}/apply`)}>Apply now</button>
      </div>

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
          <span className="ann-page-title">Job Details</span>
          <div style={{ width: 40 }} />
          <button className="job-more-btn">
            <MoreVertical size={18} color="#1E1B4B" />
          </button>
        </div>

        <div className="home-content" style={{ padding: "0 16px 32px" }}>
          <DetailContent />
        </div>
      </div>

      {/* ══════ DESKTOP ══════ */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Jobs
              </button>
              <h1 style={{ marginTop: 8 }}>Job Detail</h1>
              <p>Full information about the position</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" />
                <div className="home-topbar__notif-dot" />
              </div>
            </div>
          </div>

          <div className="home-content">
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main">
                <DetailContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Other Jobs</h3>
                {JOBS.filter(j => j.id !== job.id).map(j => (
                  <div key={j.id} className="ann-aside-card"
                    onClick={() => navigate(`/jobs/${j.id}`)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div className="job-logo-xs" style={{ background: j.companyColor }}>
                        {j.companyLogo}
                      </div>
                      <span className="ann-aside-card__cat">
                        <BriefcaseBusiness size={11} /> {j.type}
                      </span>
                    </div>
                    <div className="ann-aside-card__title">{j.title}</div>
                    <div className="ann-aside-card__meta">{j.company} · {j.salary}</div>
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