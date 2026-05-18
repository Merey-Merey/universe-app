/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BookOpen,
  Home, BriefcaseBusiness, Building2, Calendar, User, LogOut,
  Search, 
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
export interface AnnouncementItem {
  id: number;
  category: string;
  title: string;
  organizer: string;
  date: string;
  deadline: string;
  amount: string;
  type: string;
  about: string;
  requirements: string[];
  contact: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    category: "Academic",
    title: "Scholarship program open for applications",
    organizer: "SKSU",
    date: "May 1, 2026",
    deadline: "May 20, 2026",
    amount: "₸500,000",
    type: "Academic",
    about:
      "The SKSU Scholarship Program 2026 supports outstanding students with financial assistance for their academic journey.",
    requirements: [
      "GPA 3.5 or higher",
      "Full-time enrolled student",
      "Recommendation letter required",
    ],
    contact: "scholarship@sksu.edu.kz",
  },
  {
    id: 2,
    category: "Language",
    title: "Free English courses for students of UniVerse",
    organizer: "UniVerse Hub",
    date: "May 3, 2026",
    deadline: "May 25, 2026",
    amount: "Free",
    type: "Language",
    about:
      "UniVerse Hub is offering free intensive English courses for all enrolled students. Improve your academic and professional English skills.",
    requirements: [
      "Active UniVerse account",
      "Enrollment confirmation",
      "Basic English level (A2+)",
    ],
    contact: "courses@universe.edu.kz",
  },
  {
    id: 3,
    category: "Housing",
    title: "Student dormitory registration open",
    organizer: "SKSU Admin",
    date: "May 5, 2026",
    deadline: "May 15, 2026",
    amount: "₸15,000/mo",
    type: "Housing",
    about:
      "SKSU dormitory registration for the 2026–2027 academic year is now open. Limited spots available — apply early.",
    requirements: [
      "First or second-year student",
      "Study in full-time mode",
      "Clean academic record",
    ],
    contact: "dorm@sksu.edu.kz",
  },
  {
    id: 4,
    category: "Career",
    title: "Career counseling sessions available",
    organizer: "Career Center",
    date: "May 7, 2026",
    deadline: "Ongoing",
    amount: "Free",
    type: "Career",
    about:
      "Book a one-on-one session with a career counselor to get personalized guidance on internships, resume writing, and job search strategies.",
    requirements: [
      "Any year of study",
      "Pre-booking required",
      "Bring your current CV",
    ],
    contact: "careers@universe.edu.kz",
  },
];

/* ─── Shared nav items ───────────────────────────────────── */
const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} />             },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} />        },
  { id: "events",  label: "Events",  icon: <Calendar size={22} />         },
  { id: "profile", label: "Profile", icon: <User size={22} />             },
];

/* ─── Sidebar (shared desktop) ──────────────────────────── */
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
   ANNOUNCEMENTS LIST PAGE
   ════════════════════════════════════════════════════════════ */
export const AnnouncementsPage: React.FC = () => {
  const navigate   = useNavigate();
  const [activeNav, setActiveNav] = useState("home");
  const [search, setSearch]       = useState("");

  const filtered = ANNOUNCEMENTS.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const CardList = () => (
    <div className="ann-list">
      {filtered.map(a => (
        <div key={a.id} className="ann-list-card"
          onClick={() => navigate(`/announcements/${a.id}`)}>
          <div className="ann-list-card__left">
            <span className="ann-list-card__cat">
              <BookOpen size={13} /> {a.category}
            </span>
            <div className="ann-list-card__title">{a.title}</div>
            <div className="ann-list-card__meta">{a.organizer} · {a.date}</div>
          </div>
          <div className="ann-list-card__right">
            <div className="ann-list-card__amount">{a.amount}</div>
            <div className="ann-list-card__deadline">
              <span className="ann-list-card__dl-label">Deadline</span>
              <span className="ann-list-card__dl-val">{a.deadline}</span>
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
        {/* Top bar */}
        <div className="ann-page-topbar">
          <button className="ann-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
          </button>
          <span className="ann-page-title">Announcements</span>
          <div style={{ width: 40 }} />
        </div>

        {/* Search */}
        <div style={{ padding: "0 16px 12px" }}>
          <div className="ann-search-bar">
            <Search size={15} color="#A09DC5" />
            <input
              className="ann-search-input"
              placeholder="Search announcements..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="home-content" style={{ padding: "0 16px 24px" }}>
          <CardList />
        </div>

        {/* Bottom nav */}
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
          {/* Top bar */}
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <h1 style={{ marginTop: 8 }}>Announcements</h1>
              <p>Browse all available announcements</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__search">
                <Search size={15} color="#A09DC5" />
                <input
                  className="ann-search-input"
                  placeholder="Search announcements..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#1E1B4B", fontFamily: "Manrope, sans-serif", width: "100%" }}
                />
              </div>
              {/* <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" />
                <div className="home-topbar__notif-dot" />
              </div> */}
            </div>
          </div>

          <div className="home-content">
            <div className="ann-desk-grid">
              {filtered.map(a => (
                <div key={a.id} className="ann-desk-card"
                  onClick={() => navigate(`/announcements/${a.id}`)}>
                  <div className="ann-desk-card__top">
                    <span className="ann-desk-card__cat">
                      <BookOpen size={13} /> {a.category}
                    </span>
                    <span className="ann-desk-card__amount">{a.amount}</span>
                  </div>
                  <div className="ann-desk-card__title">{a.title}</div>
                  <div className="ann-desk-card__meta">{a.organizer} · {a.date}</div>
                  <div className="ann-desk-card__footer">
                    <div className="ann-desk-card__dl">
                      <span className="ann-desk-card__dl-label">Deadline</span>
                      <span className="ann-desk-card__dl-val">{a.deadline}</span>
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
   ANNOUNCEMENT DETAIL PAGE
   ════════════════════════════════════════════════════════════ */
export const AnnouncementDetailPage: React.FC = () => {
  const navigate       = useNavigate();
  const { id }         = useParams<{ id: string }>();
  const [activeNav, setActiveNav] = useState("home");
  const [contact, setContact]     = useState("");

  const ann = ANNOUNCEMENTS.find(a => a.id === Number(id)) ?? ANNOUNCEMENTS[0];

  const DetailContent = () => (
    <div className="ev-detail-body">
      {/* Category badge */}
      <span className="ann-detail-cat">
        <BookOpen size={14} /> {ann.category}
      </span>

      {/* Title + meta */}
      <div className="ann-detail-head">
        <h2 className="ann-detail-title">{ann.title}</h2>
        <p className="ann-detail-meta">{ann.organizer} · {ann.date}</p>
      </div>

      {/* Divider */}
      <div className="ann-detail-divider" />

      {/* Info chips — 2×2 grid */}
      <div className="ann-detail-chips">
        <div className="ann-detail-chip">
          <span className="ann-detail-chip__label">DEADLINE</span>
          <span className="ann-detail-chip__value">{ann.deadline}</span>
        </div>
        <div className="ann-detail-chip">
          <span className="ann-detail-chip__label">AMOUNT</span>
          <span className="ann-detail-chip__value ann-detail-chip__value--accent">{ann.amount}</span>
        </div>
        <div className="ann-detail-chip">
          <span className="ann-detail-chip__label">TYPE</span>
          <span className="ann-detail-chip__value">{ann.type}</span>
        </div>
        <div className="ann-detail-chip">
          <span className="ann-detail-chip__label">ORGANIZER</span>
          <span className="ann-detail-chip__value">{ann.organizer}</span>
        </div>
      </div>

      {/* About */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">About</h3>
        <p className="ann-detail-section__text">{ann.about}</p>
      </div>

      {/* Requirements */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Requirements</h3>
        <ul className="ann-detail-reqs">
          {ann.requirements.map((r, i) => (
            <li key={i} className="ann-detail-req">• {r}</li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Contact</h3>
        <div className="ann-detail-input-wrap">
          <span className="ann-detail-input-icon">@</span>
          <input
            className="ann-detail-input"
            type="email"
            placeholder={ann.contact}
            value={contact}
            onChange={e => setContact(e.target.value)}
          />
        </div>
      </div>

      {/* CTA */}
      <button className="ann-detail-cta">Apply now</button>
    </div>
  );

  return (
    <div className="home-screen">

      {/* ══════ MOBILE ══════ */}
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        {/* Top bar */}
        <div className="ann-page-topbar">
          <button className="ann-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
          </button>
          <span className="ann-page-title">Announcement</span>
          <div style={{ width: 40 }} />
        </div>

        {/* Scrollable content */}
        <div className="home-content" style={{ padding: "0 16px 32px" }}>
          <DetailContent />
        </div>
      </div>

      {/* ══════ DESKTOP ══════ */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

        <div className="home-main">
          {/* Top bar */}
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Announcements
              </button>
              <h1 style={{ marginTop: 8 }}>Announcement Detail</h1>
              <p>Full information about the announcement</p>
            </div>
            <div className="home-topbar__right">
              {/* <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" />
                <div className="home-topbar__notif-dot" />
              </div> */}
            </div>
          </div>

          {/* Two-column on desktop */}
          <div className="home-content">
            <div className="ann-detail-desk-layout">
              {/* Left: detail */}
              <div className="ann-detail-desk-main">
                <DetailContent />
              </div>
              {/* Right: other announcements */}
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Other Announcements</h3>
                {ANNOUNCEMENTS.filter(a => a.id !== ann.id).map(a => (
                  <div key={a.id} className="ann-aside-card"
                    onClick={() => navigate(`/announcements/${a.id}`)}>
                    <span className="ann-aside-card__cat"><BookOpen size={11} /> {a.category}</span>
                    <div className="ann-aside-card__title">{a.title}</div>
                    <div className="ann-aside-card__meta">{a.organizer} · {a.deadline}</div>
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