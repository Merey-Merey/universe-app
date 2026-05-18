/* eslint-disable react-hooks/static-components */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, BriefcaseBusiness, Building2, Calendar, User,
  LogOut, Bell, ArrowLeft, ArrowRight, ChevronRight,
  Heart, Settings, Lock, Pencil, BookOpen, Clock, X,
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
          {menuItem(<Bell size={20} color="#462370" strokeWidth={1.5} />, "Notifications", undefined, () => {})}
          <div className="prof-menu-divider" />
          {menuItem(<Lock size={20} color="#462370" strokeWidth={1.5} />, "Pivacy and Security", undefined, () => {})}
        </div>
      </div>

      
      <div className="prof-section">
        <p className="prof-section__label">ACTIVITY</p>
        <div className="prof-menu-group">
          {menuItem(<Heart size={20} color="#462370" strokeWidth={1.5} />, "Saved", 7, () => {})}
          <div className="prof-menu-divider" />
          {menuItem(<BookOpen size={20} color="#462370" strokeWidth={1.5} />, "My Applications", 3, () => navigate("/profile/applications"))}
          <div className="prof-menu-divider" />
          {menuItem(<Settings size={20} color="#462370" strokeWidth={1.5} />, "Settings", undefined, () => {})}
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
                  { label: "Notifications", path: "#" },
                  { label: "Settings", path: "#" },
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
        <input
          className="prof-field__input"
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
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

        <button className="prof-save-btn" onClick={() => navigate(-1)}>
          Save changes
        </button>
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
            </div>
            <div className="home-topbar__right">
              
            </div>
          </div>
          <div className="home-content">
            <div style={{ maxWidth: 520 }}><PageContent /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  {
    id: 1, title: "Frontend Developer", company: "Kaspi Bank",
    appliedDate: "Applied May 10", status: "Under review",
    logoInitials: "K", logoBg: "#E84B2A", filter: "Pending",
  },
  {
    id: 2, title: "UX/UI Designer", company: "Kolesa Group",
    appliedDate: "Applied May 8", status: "Interview set",
    logoInitials: "KG", logoBg: "#2563EB", filter: "Accepted",
  },
  {
    id: 3, title: "Data Analyst Intern", company: "Chocofamily",
    appliedDate: "Applied May 5", status: "Not selected",
    logoInitials: "CF", logoBg: "#7C3AED", filter: "No",
  },
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

  const filtered = activeFilter === "All"
    ? APPLICATIONS
    : APPLICATIONS.filter(a => a.filter === activeFilter);

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
          <button className="prof-interview-join-btn">
            Join <ArrowRight size={12} />
          </button>
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
                <ArrowLeft size={16} /> Back
              </button>
              <h1 style={{ marginTop: 8 }}>My Applications</h1>
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