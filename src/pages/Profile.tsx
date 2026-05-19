/* eslint-disable react-hooks/static-components */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, BriefcaseBusiness, Building2, Calendar, User,
  LogOut, Bell, ArrowLeft, ArrowRight, ChevronRight,
  Heart, Settings, Lock, Pencil, BookOpen, Clock, X,
  Eye, EyeOff, Trash2,
} from "lucide-react";

const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} />              },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} />         },
  { id: "events",  label: "Events",  icon: <Calendar size={22} />          },
  { id: "profile", label: "Profile", icon: <User size={22} />              },
];

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
            onClick={() => {
              setActiveNav(item.id);
              const routes: Record<string, string> = {
                home: "/home", jobs: "/jobs", housing: "/housing",
                events: "/events", profile: "/profile",
              };
              navigate(routes[item.id] ?? "/home");
            }}>
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
   PROFILE PAGE
   ════════════════════════════════════════════════════════════ */
export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("profile");

  const menuItem = (
    icon: React.ReactNode,
    label: string,
    badge?: number | string,
    onClick?: () => void,
  ) => (
    <button className="prof-menu-item" onClick={onClick}>
      <div className="prof-menu-item__icon">{icon}</div>
      <span className="prof-menu-item__label">{label}</span>
      {badge !== undefined && (
        <span className="prof-menu-item__badge">{badge}</span>
      )}
      <ChevronRight size={18} color="#462370" strokeWidth={1.5} />
    </button>
  );

  const ProfileContent = () => (
    <div className="prof-page-content">
      <div className="prof-page-header">
        <h1 className="prof-page-header__title">Profile</h1>
        <button className="prof-edit-icon-btn">
          <Pencil size={16} color="#462370" strokeWidth={1.5} />
        </button>
      </div>

      <div className="prof-user-card">
        <div className="prof-user-card__top">
          <div className="prof-avatar-lg">A</div>
          <div className="prof-user-card__info">
            <div className="prof-user-card__name">Aymakhan Balausa</div>
            <div className="prof-user-card__chips">
              <span className="prof-chip">Student</span>
              <span className="prof-chip">SKSU</span>
            </div>
          </div>
        </div>
        <div className="prof-user-card__divider" />
        <div className="prof-stats-row">
          <div className="prof-stat">
            <span className="prof-stat__num">3</span>
            <span className="prof-stat__label">APLIED</span>
          </div>
          <div className="prof-stat-divider" />
          <div className="prof-stat">
            <span className="prof-stat__num">7</span>
            <span className="prof-stat__label">SAVED</span>
          </div>
          <div className="prof-stat-divider" />
          <div className="prof-stat">
            <span className="prof-stat__num">2</span>
            <span className="prof-stat__label">EVENTS</span>
          </div>
        </div>
      </div>

      <div className="prof-section">
        <p className="prof-section__label">YOUR INTERESTS</p>
        <div className="prof-menu-group">
          {menuItem(<User size={20} color="#462370" strokeWidth={1.5} />, "Basic Info", undefined, () => navigate("/profile/basic-info"))}
          <div className="prof-menu-divider" />
          {menuItem(<Bell size={20} color="#462370" strokeWidth={1.5} />, "Notifications", undefined, () => navigate("/profile/notifications"))}
          <div className="prof-menu-divider" />
          {menuItem(<Lock size={20} color="#462370" strokeWidth={1.5} />, "Privacy and Security", undefined, () => navigate("/profile/privacy"))}
        </div>
      </div>

      <div className="prof-section">
        <p className="prof-section__label">ACTIVITY</p>
        <div className="prof-menu-group">
          {menuItem(<Heart size={20} color="#462370" strokeWidth={1.5} />, "Saved", 7, () => navigate("/profile/saved"))}
          <div className="prof-menu-divider" />
          {menuItem(<BookOpen size={20} color="#462370" strokeWidth={1.5} />, "My Applications", 3, () => navigate("/profile/applications"))}
          <div className="prof-menu-divider" />
          {menuItem(<Settings size={20} color="#462370" strokeWidth={1.5} />, "Settings", undefined, () => navigate("/profile/settings"))}
        </div>
      </div>

      <button className="prof-logout-btn" onClick={() => navigate("/login")}>
        Log out
      </button>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <ProfileContent />
        </div>
        <div className="home-navbar">
          {navItems.map(item => {
            const isActive = activeNav === item.id;
            return (
              <button key={item.id}
                className={`home-nav-item ${isActive ? "home-nav-item--active" : "home-nav-item--inactive"}`}
                onClick={() => { setActiveNav(item.id); navigate(`/${item.id === "home" ? "home" : item.id}`); }}>
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
          <div className="home-content">
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{ maxWidth: 520 }}>
                <ProfileContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Quick Links</h3>
                {[
                  { label: "Basic Info", path: "/profile/basic-info" },
                  { label: "My Applications", path: "/profile/applications" },
                  { label: "Saved", path: "/profile/saved" },
                  { label: "Notifications", path: "/profile/notifications" },
                  { label: "Privacy and Security", path: "/profile/privacy" },
                  { label: "Settings", path: "/profile/settings" },
                ].map(link => (
                  <div key={link.label} className="ann-aside-card"
                    style={{ cursor: "pointer" }} onClick={() => navigate(link.path)}>
                    <div className="ann-aside-card__title">{link.label}</div>
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

/* ════════════════════════════════════════════════════════════
   BASIC INFO PAGE
   ════════════════════════════════════════════════════════════ */
export const BasicInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName,   setFullName]   = useState("Aymakhan Balausa");
  const [email,      setEmail]      = useState("aymakhanbalausa@gmail.com");
  const [phone,      setPhone]      = useState("+7 771 887 33 37");
  const [university, setUniversity] = useState("SKSU — South Kazakhstan State Univ.");
  const [faculty,    setFaculty]    = useState("Information Technologies");
  const [year,       setYear]       = useState("3rd");
  const years = ["1st", "2nd", "3rd", "4th", "5th", "6th+"];

  const EditableField: React.FC<{
    label: string; value: string; onChange: (v: string) => void; type?: string;
  }> = ({ label, value, onChange, type = "text" }) => (
    <div className="prof-field">
      <label className="prof-field__label">{label}</label>
      <div className="prof-field__input-wrap">
        <input className="prof-field__input" type={type} value={value}
          onChange={e => onChange(e.target.value)} />
        <Pencil size={16} color="#462370" strokeWidth={1.5} />
      </div>
    </div>
  );

  const PageContent = () => (
    <>
      <div className="ann-page-topbar">
        <button className="ann-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
        </button>
        <span className="ann-page-title">Basic Info</span>
        <div style={{ width: 40 }} />
      </div>
      <div style={{ padding: "0 16px 48px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="prof-avatar-section">
          <div className="prof-avatar-wrap">
            <div className="prof-avatar-xl">A</div>
            <button className="prof-avatar-edit-btn">
              <Pencil size={12} color="#1E1B4B" strokeWidth={2} />
            </button>
          </div>
          <button className="prof-change-photo-btn">Change photo</button>
        </div>
        <div className="prof-form-section">
          <p className="prof-form-section__label">PERSONAL INFO</p>
          <EditableField label="Full Name"    value={fullName} onChange={setFullName} />
          <EditableField label="Email"        value={email}    onChange={setEmail}    type="email" />
          <EditableField label="Phone number" value={phone}    onChange={setPhone}    type="tel" />
        </div>
        <div className="prof-form-section">
          <p className="prof-form-section__label">ACADEMIC INFO</p>
          <div className="prof-field">
            <label className="prof-field__label">University</label>
            <div className="prof-field__input-wrap">
              <input className="prof-field__input" value={university}
                onChange={e => setUniversity(e.target.value)} />
            </div>
          </div>
          <div className="prof-field">
            <label className="prof-field__label">Faculty / Major</label>
            <div className="prof-field__input-wrap">
              <input className="prof-field__input" value={faculty}
                onChange={e => setFaculty(e.target.value)} />
            </div>
          </div>
          <div className="prof-field">
            <label className="prof-field__label">Year of study</label>
            <div className="prof-years-row">
              {years.map(y => (
                <button key={y}
                  className={`prof-year-chip ${year === y ? "prof-year-chip--active" : ""}`}
                  onClick={() => setYear(y)}>{y}</button>
              ))}
            </div>
          </div>
        </div>
        <button className="prof-save-btn" onClick={() => navigate(-1)}>Save changes</button>
      </div>
    </>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}><PageContent /></div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav="profile" setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <h1 style={{ marginTop: 8 }}>Basic Info</h1>
              <p>Manage your personal and academic information</p>
            </div>
          </div>
          <div className="home-content">
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{ maxWidth: 520 }}>
                <PageContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Profile tips</h3>
                {[
                  { title: "Complete your profile", meta: "100% profile gets 3x more views" },
                  { title: "Add a photo", meta: "Profiles with photos stand out more" },
                  { title: "Verify your email", meta: "Get alerts for new matches" },
                ].map(t => (
                  <div key={t.title} className="ann-aside-card">
                    <div className="ann-aside-card__title">{t.title}</div>
                    <div className="ann-aside-card__meta">{t.meta}</div>
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

/* ════════════════════════════════════════════════════════════
   MY APPLICATIONS PAGE
   ════════════════════════════════════════════════════════════ */
interface Application {
  id: number;
  title: string;
  company: string;
  appliedDate: string;
  status: "Under review" | "Interview set" | "Not selected";
  logoInitials: string;
  logoBg: string;
  filter: "Pending" | "Accepted" | "No";
}

const APPLICATIONS: Application[] = [
  { id: 1, title: "Frontend Developer", company: "Kaspi Bank",
    appliedDate: "Applied May 10", status: "Under review",
    logoInitials: "K", logoBg: "#E84B2A", filter: "Pending" },
  { id: 2, title: "UX/UI Designer", company: "Kolesa Group",
    appliedDate: "Applied May 8", status: "Interview set",
    logoInitials: "KG", logoBg: "#2563EB", filter: "Accepted" },
  { id: 3, title: "Data Analyst Intern", company: "Chocofamily",
    appliedDate: "Applied May 5", status: "Not selected",
    logoInitials: "CF", logoBg: "#7C3AED", filter: "No" },
];

const statusIcon = (status: Application["status"]) => {
  if (status === "Under review")  return <Clock size={14} color="#27236B" strokeWidth={1.5} />;
  if (status === "Interview set") return <Calendar size={14} color="#27236B" strokeWidth={1.5} />;
  return <X size={14} color="#27236B" strokeWidth={2} />;
};

export const MyApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<"All"|"Pending"|"Accepted"|"No">("All");
  const filters = ["All (3)", "Pending", "Accepted", "No"] as const;
  const filterMap: Record<string, string> = { "All (3)": "All", Pending: "Pending", Accepted: "Accepted", No: "No" };
  const filtered = activeFilter === "All" ? APPLICATIONS : APPLICATIONS.filter(a => a.filter === activeFilter);

  const PageContent = () => (
    <>
      <div className="ann-page-topbar">
        <button className="ann-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
        </button>
        <span className="ann-page-title">My Applications</span>
        <div style={{ width: 40 }} />
      </div>
      <div style={{ padding: "0 16px 48px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="prof-app-filters">
          {filters.map(f => {
            const key = filterMap[f] as typeof activeFilter;
            return (
              <button key={f}
                className={`prof-app-filter ${activeFilter === key ? "prof-app-filter--active" : ""}`}
                onClick={() => setActiveFilter(key)}>{f}</button>
            );
          })}
        </div>
        {filtered.map(app => (
          <div key={app.id} className="prof-app-card">
            <div className="prof-app-card__logo" style={{ background: app.logoBg }}>
              {app.logoInitials}
            </div>
            <div className="prof-app-card__body">
              <div className="prof-app-card__title">{app.title}</div>
              <div className="prof-app-card__sub">{app.company} · {app.appliedDate}</div>
              <div className="prof-app-card__status">
                {statusIcon(app.status)}
                <span>{app.status}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="prof-interview-banner">
          <div className="prof-interview-banner__left">
            <p className="prof-interview-banner__eyebrow">UPCOMING INTERVIEW</p>
            <p className="prof-interview-banner__title">Kolesa Group - May 19, 2:00PM</p>
            <p className="prof-interview-banner__sub">Online · Google Meet</p>
          </div>
          <button className="prof-interview-join-btn">Join <ArrowRight size={12} /></button>
        </div>
      </div>
    </>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}><PageContent /></div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav="profile" setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Profile
              </button>
              <h1 style={{ marginTop: 8 }}>My Applications</h1>
              <p>Track the status of your job applications</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" /><div className="home-topbar__notif-dot" />
              </div>
            </div>
          </div>
          <div className="home-content">
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{ maxWidth: 520 }}>
                <PageContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Stats</h3>
                {[
                  { label: "Total applied", value: "3" },
                  { label: "Pending",       value: "1" },
                  { label: "Interviews",    value: "1" },
                  { label: "Rejected",      value: "1" },
                ].map(s => (
                  <div key={s.label} className="ann-aside-card">
                    <div className="ann-aside-card__meta">{s.label}</div>
                    <div className="ann-aside-card__title" style={{ fontSize: 22, fontWeight: 700 }}>
                      {s.value}
                    </div>
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

/* ════════════════════════════════════════════════════════════
   NOTIFICATIONS PAGE
   ════════════════════════════════════════════════════════════ */
interface NotifItem {
  id: number;
  title: string;
  body: string;
  time: string;
  read: boolean;
  logo: React.ReactNode;
  day: "today" | "yesterday";
}

const KaspiLogo = () => (
  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#E84B2A",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Space Grotesk, sans-serif" }}>K</span>
  </div>
);
const KolesaLogo = () => (
  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#2563EB",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <span style={{ color: "#fff", fontWeight: 700, fontSize: 11, fontFamily: "Space Grotesk, sans-serif" }}>KG</span>
  </div>
);
const ShymkentHubLogo = () => (
  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#F8F7FF",
    border: "1px solid #EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" stroke="#462370" strokeWidth="1.5"/>
      <circle cx="11" cy="11" r="4" fill="#462370"/>
    </svg>
  </div>
);
const GenericLogo = ({ color = "#A09DC5", letter = "N" }: { color?: string; letter?: string }) => (
  <div style={{ width: 40, height: 40, borderRadius: 12, background: color,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Space Grotesk, sans-serif" }}>{letter}</span>
  </div>
);

const NOTIFS: NotifItem[] = [
  { id: 1, day: "today", read: true, title: "New job match!",
    body: "Frontend Dev at Kaspi matches your profile. Check it out.",
    time: "2 min ago", logo: <KaspiLogo /> },
  { id: 2, day: "today", read: true, title: "Application received",
    body: "Kolesa Group confirmed your UI/UX Designer application.",
    time: "1 h ago", logo: <KolesaLogo /> },
  { id: 3, day: "today", read: false, title: "Event reminder",
    body: "Tech Career Fair starts tomorrow at 10:00 AM · Shymkent IT Hub",
    time: "3 h ago", logo: <ShymkentHubLogo /> },
  { id: 4, day: "yesterday", read: false, title: "New housing listed",
    body: "Studio near SKSU · ₸60,000/mo matches your saved filters.",
    time: "Yesterday", logo: <GenericLogo color="#7C3AED" letter="H" /> },
  { id: 5, day: "yesterday", read: false, title: "Scholarship deadline soon",
    body: "SKSU Scholarship closes in 5 days · May 20, 2026.",
    time: "Yesterday", logo: <GenericLogo color="#059669" letter="S" /> },
  { id: 6, day: "yesterday", read: false, title: "Profile 75% complete",
    body: "Add your resume to increase visibility to employers.",
    time: "3 days ago", logo: <GenericLogo color="#D97706" letter="P" /> },
];

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<NotifItem[]>(NOTIFS);
  const toggle = (id: number) =>
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  const clearAll = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const today = items.filter(n => n.day === "today");
  const yesterday = items.filter(n => n.day === "yesterday");

  const NotifRow = ({ n }: { n: NotifItem }) => (
    <div className="notif-row" style={{ background: n.read ? "#F8F7FF" : "#fff" }}
      onClick={() => toggle(n.id)}>
      <button className={`notif-checkbox ${n.read ? "notif-checkbox--checked" : ""}`}
        onClick={e => { e.stopPropagation(); toggle(n.id); }}
        aria-label={n.read ? "Mark unread" : "Mark read"}>
        {n.read && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      {n.logo}
      <div className="notif-row__body">
        <div className="notif-row__top">
          <span className="notif-row__title">{n.title}</span>
          <span className="notif-row__time">{n.time}</span>
        </div>
        <p className="notif-row__body-text">{n.body}</p>
      </div>
    </div>
  );

  const PageContent = () => (
    <div style={{ paddingBottom: 48 }}>
      <div className="ann-page-topbar" style={{ paddingLeft: 16, paddingRight: 16 }}>
        <button className="ann-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
        </button>
        <span className="ann-page-title">Notifications</span>
        <button className="notif-clear-btn" onClick={clearAll}>Clear all</button>
      </div>
      <div className="notif-section-label" style={{ marginTop: 12 }}>TODAY</div>
      <div className="notif-group">
        {today.map(n => <NotifRow key={n.id} n={n} />)}
      </div>
      <div className="notif-divider" />
      <div className="notif-section-label">YESTERDAY</div>
      <div className="notif-group">
        {yesterday.map(n => <NotifRow key={n.id} n={n} />)}
      </div>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}><PageContent /></div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav="profile" setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Profile
              </button>
              <h1 style={{ marginTop: 8 }}>Notifications</h1>
              <p>Stay up to date with your activity</p>
            </div>
            <div className="home-topbar__right">
              <button className="notif-clear-btn" onClick={clearAll}>Clear all</button>
            </div>
          </div>
          <div className="home-content" style={{ overflowY: "auto" }}>
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{ maxWidth: 560 }}>
                <PageContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Summary</h3>
                {[
                  { label: "Unread", value: String(items.filter(n => !n.read).length) },
                  { label: "Total", value: String(items.length) },
                ].map(s => (
                  <div key={s.label} className="ann-aside-card">
                    <div className="ann-aside-card__meta">{s.label}</div>
                    <div className="ann-aside-card__title" style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</div>
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

/* ════════════════════════════════════════════════════════════
   PRIVACY & SECURITY PAGE
   ════════════════════════════════════════════════════════════ */
export const PrivacySecurityPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPw,  setCurrentPw]  = useState("Baluu007");
  const [newPw,      setNewPw]      = useState("········");
  const [confirmPw,  setConfirmPw]  = useState("········");
  const [showCurrent, setShowCurrent] = useState(true);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error,       setError]       = useState("");
  const [success,     setSuccess]     = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdate = () => {
    setError(""); setSuccess(false);
    if (!currentPw) { setError("Enter your current password"); return; }
    if (newPw.length < 6) { setError("New password must be at least 6 characters"); return; }
    if (newPw !== confirmPw) { setError("Passwords don't match"); return; }
    setSuccess(true);
  };

  const PwField = ({ label, value, onChange, show, onToggle, placeholder }: {
    label: string; value: string; onChange: (v: string) => void;
    show: boolean; onToggle: () => void; placeholder?: string;
  }) => (
    <div className="prof-field">
      <label className="prof-field__label">{label}</label>
      <div className="prof-field__input-wrap">
        <input className="prof-field__input" type={show ? "text" : "password"}
          value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)} style={{ paddingRight: 44 }} />
        <button type="button" onClick={onToggle} style={{
          position: "absolute", right: 14, background: "none",
          border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
          {show ? <Eye size={20} color="#462370" strokeWidth={1.5} />
                : <EyeOff size={20} color="#462370" strokeWidth={1.5} />}
        </button>
      </div>
    </div>
  );

  const PageContent = () => (
    <div style={{ padding: "0 16px 48px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="prof-form-section" style={{ marginTop: 8 }}>
        <p className="prof-form-section__label">CHANGE PASSWORD</p>
        <PwField label="Current password" value={currentPw} onChange={setCurrentPw}
          show={showCurrent} onToggle={() => setShowCurrent(v => !v)} />
        <PwField label="New password" value={newPw} onChange={v => { setNewPw(v); setSuccess(false); }}
          show={showNew} onToggle={() => setShowNew(v => !v)} placeholder="Min. 6 characters" />
        <PwField label="Confirm new password" value={confirmPw}
          onChange={v => { setConfirmPw(v); setSuccess(false); }}
          show={showConfirm} onToggle={() => setShowConfirm(v => !v)} placeholder="Repeat new password" />
        {error && <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#EF4444", margin: 0 }}>{error}</p>}
        {success && <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#059669", margin: 0 }}>Password updated successfully!</p>}
        <button className="prof-save-btn" onClick={handleUpdate}>Update password</button>
      </div>
      <div className="prof-form-section">
        <p className="prof-form-section__label" style={{ color: "#EF4444", opacity: 1 }}>DANGER ZONE</p>
        <button className="privacy-delete-btn" onClick={() => setShowDeleteModal(true)}>
          <span>Delete my account</span>
          <ChevronRight size={18} color="#EF4444" strokeWidth={1.5} />
        </button>
      </div>
      {showDeleteModal && (
        <div className="privacy-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="privacy-modal" onClick={e => e.stopPropagation()}>
            <h3 className="privacy-modal__title">Delete account?</h3>
            <p className="privacy-modal__body">
              This action is permanent and cannot be undone. All your data, applications, and saved items will be lost.
            </p>
            <div className="privacy-modal__btns">
              <button className="privacy-modal__cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="privacy-modal__confirm" onClick={() => navigate("/login")}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="ann-page-topbar">
          <button className="ann-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
          </button>
          <span className="ann-page-title">Privacy &amp; Security</span>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}><PageContent /></div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav="profile" setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Profile
              </button>
              <h1 style={{ marginTop: 8 }}>Privacy &amp; Security</h1>
              <p>Manage your password and account security</p>
            </div>
          </div>
          <div className="home-content" style={{ overflowY: "auto" }}>
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{ maxWidth: 480 }}>
                <PageContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Security tips</h3>
                {[
                  { title: "Use a strong password", meta: "At least 8 chars, mix of letters & numbers" },
                  { title: "Enable 2FA", meta: "Adds an extra layer of protection" },
                  { title: "Review visibility", meta: "Control who can see your profile" },
                ].map(t => (
                  <div key={t.title} className="ann-aside-card">
                    <div className="ann-aside-card__title">{t.title}</div>
                    <div className="ann-aside-card__meta">{t.meta}</div>
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

/* ════════════════════════════════════════════════════════════
   SAVED PAGE  (/profile/saved)
   ════════════════════════════════════════════════════════════ */

interface SavedJob {
  id: number;
  title: string;
  company: string;
  type: string;
  mode: string;
  salary: string;
  month: string;
  day: number;
  tags: string[];
  accentColor: string;
}

interface SavedHousing {
  id: number;
  title: string;
  location: string;
  price: string;
  month: string;
  day: number;
  tags: string[];
  accentColor: string;
}

const SAVED_JOBS: SavedJob[] = [
  { id: 1, title: "Frontend Developer", company: "Kaspi Bank", type: "Part-time", mode: "Remote",
    salary: "₸250,000", month: "MAY", day: 17, tags: ["₸250,000"], accentColor: "#4C1D95" },
  { id: 2, title: "UI/UX Design", company: "Kolesa Group", type: "Freelance", mode: "Remote",
    salary: "₸200,000", month: "MAY", day: 23, tags: ["Design", "₸200,000"], accentColor: "#A78BFA" },
  { id: 3, title: "Data Analyst Intern", company: "Chocofamily", type: "Full-time", mode: "Office",
    salary: "₸180,000", month: "MAY", day: 28, tags: ["₸180,000"], accentColor: "#4C1D95" },
  { id: 4, title: "Mobile Developer", company: "Jusan Bank", type: "Full-time", mode: "Hybrid",
    salary: "₸350,000", month: "MAY", day: 28, tags: ["₸350,000"], accentColor: "#4C1D95" },
];

const SAVED_HOUSING: SavedHousing[] = [
  { id: 1, title: "Studio near SKSU", location: "Shymkent · 1 bed", price: "₸60,000/mo",
    month: "MAY", day: 15, tags: ["Studio", "₸60,000"], accentColor: "#4C1D95" },
  { id: 2, title: "2-room apartment", location: "Almaty · Al-Farabi", price: "₸120,000/mo",
    month: "MAY", day: 18, tags: ["2-room", "₸120,000"], accentColor: "#A78BFA" },
  { id: 3, title: "Room in shared flat", location: "Shymkent · Center", price: "₸35,000/mo",
    month: "MAY", day: 20, tags: ["Shared", "₸35,000"], accentColor: "#4C1D95" },
];

export const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Jobs" | "Housing">("Jobs");
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(SAVED_JOBS);
  const [savedHousing, setSavedHousing] = useState<SavedHousing[]>(SAVED_HOUSING);

  const removeJob = (id: number) => setSavedJobs(prev => prev.filter(j => j.id !== id));
  const removeHousing = (id: number) => setSavedHousing(prev => prev.filter(h => h.id !== id));

  const JobCard = ({ item }: { item: SavedJob }) => (
    <div className="saved-card" onClick={() => navigate(`/jobs/${item.id}`)}>
      <div className="saved-card__accent" style={{ background: item.accentColor }} />
      <div className="saved-card__body">
        <div className="saved-card__date-badge">
          <span className="saved-card__month">{item.month}</span>
          <span className="saved-card__day">{item.day}</span>
        </div>
        <div className="saved-card__info">
          <div className="saved-card__title">{item.title}</div>
          <div className="saved-card__meta">{item.company} · {item.type} · {item.mode}</div>
          <div className="saved-card__tags">
            {item.tags.map(t => (
              <span key={t} className="saved-card__tag">{t}</span>
            ))}
          </div>
        </div>
        <button className="saved-card__heart saved-card__heart--active"
          onClick={e => { e.stopPropagation(); removeJob(item.id); }}>
          <Heart size={16} fill="#462370" color="#462370" />
        </button>
      </div>
    </div>
  );

  const HousingCard = ({ item }: { item: SavedHousing }) => (
    <div className="saved-card">
      <div className="saved-card__accent" style={{ background: item.accentColor }} />
      <div className="saved-card__body">
        <div className="saved-card__date-badge">
          <span className="saved-card__month">{item.month}</span>
          <span className="saved-card__day">{item.day}</span>
        </div>
        <div className="saved-card__info">
          <div className="saved-card__title">{item.title}</div>
          <div className="saved-card__meta">{item.location}</div>
          <div className="saved-card__tags">
            {item.tags.map(t => (
              <span key={t} className="saved-card__tag">{t}</span>
            ))}
          </div>
        </div>
        <button className="saved-card__heart saved-card__heart--active"
          onClick={e => { e.stopPropagation(); removeHousing(item.id); }}>
          <Heart size={16} fill="#462370" color="#462370" />
        </button>
      </div>
    </div>
  );

  const PageContent = () => (
    <>
      <div className="ann-page-topbar">
        <button className="ann-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
        </button>
        <span className="ann-page-title">Saved</span>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: "0 16px 48px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Tab switcher */}
        <div className="saved-switcher">
          {(["Jobs", "Housing"] as const).map(t => (
            <button key={t}
              className={`saved-switcher__btn ${tab === t ? "saved-switcher__btn--active" : ""}`}
              onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tab === "Jobs"
            ? savedJobs.length > 0
              ? savedJobs.map(j => <JobCard key={j.id} item={j} />)
              : <p className="saved-empty">No saved jobs yet</p>
            : savedHousing.length > 0
              ? savedHousing.map(h => <HousingCard key={h.id} item={h} />)
              : <p className="saved-empty">No saved housing yet</p>
          }
        </div>

        <p className="saved-hint">Swipe left to remove from saved</p>
      </div>
    </>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}><PageContent /></div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav="profile" setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Profile
              </button>
              <h1 style={{ marginTop: 8 }}>Saved</h1>
              <p>Your bookmarked jobs and housing listings</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" /><div className="home-topbar__notif-dot" />
              </div>
            </div>
          </div>
          <div className="home-content">
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{ maxWidth: 520 }}>
                <PageContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Saved summary</h3>
                {[
                  { label: "Saved jobs",    value: String(savedJobs.length) },
                  { label: "Saved housing", value: String(savedHousing.length) },
                ].map(s => (
                  <div key={s.label} className="ann-aside-card">
                    <div className="ann-aside-card__meta">{s.label}</div>
                    <div className="ann-aside-card__title" style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</div>
                  </div>
                ))}
                <div className="ann-aside-card" style={{ cursor: "pointer" }}
                  onClick={() => { setTab("Jobs"); }}>
                  <div className="ann-aside-card__title">Browse more jobs</div>
                  <div className="ann-aside-card__meta">Find new opportunities →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   SETTINGS PAGE  (/profile/settings)
   ════════════════════════════════════════════════════════════ */

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, checked, onChange }) => (
  <div className="settings-row">
    <span className="settings-row__label">{label}</span>
    <button
      className={`settings-toggle ${checked ? "settings-toggle--on" : "settings-toggle--off"}`}
      onClick={() => onChange(!checked)}
      aria-label={label}
    >
      <span className="settings-toggle__thumb" />
    </button>
  </div>
);

interface LinkRowProps {
  label: string;
  onClick?: () => void;
  danger?: boolean;
}

const LinkRow: React.FC<LinkRowProps> = ({ label, onClick, danger }) => (
  <button className={`settings-link-row ${danger ? "settings-link-row--danger" : ""}`} onClick={onClick}>
    <span className="settings-link-row__label" style={danger ? { color: "#EF4444" } : undefined}>
      {label}
    </span>
    <ChevronRight size={18} color={danger ? "#EF4444" : "#6B7280"} strokeWidth={1.5} />
  </button>
);

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* Notifications */
  const [pushNotifs,   setPushNotifs]   = useState(true);
  const [emailNotifs,  setEmailNotifs]  = useState(true);
  const [jobAlerts,    setJobAlerts]    = useState(false);
  const [eventRemind,  setEventRemind]  = useState(true);
  const [housingUpd,   setHousingUpd]   = useState(false);

  /* Privacy */
  const [twoFactor,    setTwoFactor]    = useState(true);
  const [showProfile,  setShowProfile]  = useState(false);

  /* Language */
  const [language, setLanguage] = useState("English");
  const languages = ["English", "Қазақша", "Русский"];

  const Divider = () => (
    <div style={{ height: 1, background: "#EDE9FE", opacity: 0.7, margin: "0" }} />
  );

  const SectionLabel = ({ text }: { text: string }) => (
    <p className="settings-section-label">{text}</p>
  );

  const PageContent = () => (
    <div style={{ padding: "0 16px 64px", display: "flex", flexDirection: "column", gap: 16 }}>

      {/* NOTIFICATIONS */}
      <div className="settings-group">
        <SectionLabel text="NOTIFICATIONS" />
        <ToggleRow label="Push notifications" checked={pushNotifs}  onChange={setPushNotifs} />
        <Divider />
        <ToggleRow label="Email notifications" checked={emailNotifs} onChange={setEmailNotifs} />
        <Divider />
        <ToggleRow label="New job alerts"      checked={jobAlerts}   onChange={setJobAlerts} />
        <Divider />
        <ToggleRow label="Event reminders"     checked={eventRemind} onChange={setEventRemind} />
        <Divider />
        <ToggleRow label="Housing updates"     checked={housingUpd}  onChange={setHousingUpd} />
      </div>

      {/* APPEARANCE */}
      <div className="settings-group">
        <SectionLabel text="APPEARANCE" />
        <div className="prof-field">
          <label className="prof-field__label" style={{ fontWeight: 700, fontSize: 16 }}>Language</label>
          <div className="prof-field__input-wrap">
            <select
              className="prof-field__input"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ appearance: "none", cursor: "pointer", paddingRight: 44 }}
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronRight size={18} color="#6B7280" style={{ transform: "rotate(90deg)", pointerEvents: "none" }} />
          </div>
        </div>
      </div>

      {/* PRIVACY & SECURITY */}
      <div className="settings-group">
        <SectionLabel text="PRIVACY &amp; SECURITY" />
        <LinkRow label="Change password" onClick={() => navigate("/profile/privacy")} />
        <Divider />
        <ToggleRow label="Two-factor authentication" checked={twoFactor}   onChange={setTwoFactor} />
        <Divider />
        <ToggleRow label="Show profile to employers"  checked={showProfile} onChange={setShowProfile} />
      </div>

      {/* ABOUT */}
      <div className="settings-group">
        <SectionLabel text="ABOUT" />
        <LinkRow label="Version" onClick={() => {}} />
        <Divider />
        <LinkRow label="Terms of Service" onClick={() => {}} />
        <Divider />
        <LinkRow label="Privacy Policy" onClick={() => {}} />
        <Divider />
        <LinkRow label="Delete account" onClick={() => setShowDeleteModal(true)} danger />
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="privacy-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="privacy-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: "#FEF2F2",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Trash2 size={18} color="#EF4444" />
              </div>
              <h3 className="privacy-modal__title" style={{ margin: 0 }}>Delete account?</h3>
            </div>
            <p className="privacy-modal__body">
              This action is permanent and cannot be undone. All your data, applications, and saved items will be lost.
            </p>
            <div className="privacy-modal__btns">
              <button className="privacy-modal__cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="privacy-modal__confirm" onClick={() => navigate("/login")}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="home-screen">
      {/* MOBILE */}
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="ann-page-topbar">
          <button className="ann-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
          </button>
          <span className="ann-page-title">Settings</span>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}><PageContent /></div>
      </div>

      {/* DESKTOP */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav="profile" setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Profile
              </button>
              <h1 style={{ marginTop: 8 }}>Settings</h1>
              <p>Manage your app preferences and account</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" /><div className="home-topbar__notif-dot" />
              </div>
            </div>
          </div>
          <div className="home-content" style={{ overflowY: "auto" }}>
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{ maxWidth: 520 }}>
                <PageContent />
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Quick actions</h3>
                {[
                  { label: "Change password", path: "/profile/privacy" },
                  { label: "Basic Info", path: "/profile/basic-info" },
                  { label: "Notifications", path: "/profile/notifications" },
                ].map(link => (
                  <div key={link.label} className="ann-aside-card"
                    style={{ cursor: "pointer" }} onClick={() => navigate(link.path)}>
                    <div className="ann-aside-card__title">{link.label}</div>
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