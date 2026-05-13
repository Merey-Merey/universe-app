/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Calendar,
  Home, BriefcaseBusiness, Building2, User, LogOut,
  Search, Bell, MapPin, BookOpen,
} from "lucide-react";

/* ─── Types & Data ───────────────────────────────────────── */
export interface EventItem {
  id: number;
  category: string;
  title: string;
  organizer: string;
  organizerRole: string;
  date: string;
  time: string;
  price: string;
  spots: number | string;
  about: string;
  locationName: string;
  locationAddress: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const EVENTS: EventItem[] = [
  {
    id: 1,
    category: "Career",
    title: "Tech Career Fair 2026",
    organizer: "UniVerse Hub",
    organizerRole: "Official organizer",
    date: "May 12, 2026",
    time: "10:00 AM",
    price: "Free",
    spots: 200,
    about:
      "Meet top employers, explore internship opportunities, and network with professionals across tech industries in Shymkent.",
    locationName: "Shymkent IT Hub",
    locationAddress: "Al-Farabi Ave, Shymkent",
  },
  {
    id: 2,
    category: "Online",
    title: "UI/UX Design Workshop",
    organizer: "UniVerse Hub",
    organizerRole: "Official organizer",
    date: "May 23, 2026",
    time: "2:00 PM",
    price: "Free",
    spots: 100,
    about:
      "An interactive online workshop covering the fundamentals of modern UI/UX design using Figma. Perfect for beginners and intermediate designers.",
    locationName: "Online · Zoom",
    locationAddress: "Link will be sent via email",
  },
  {
    id: 3,
    category: "Networking",
    title: "Student Networking Evening",
    organizer: "UniVerse Hub",
    organizerRole: "Official organizer",
    date: "May 28, 2026",
    time: "7:00 PM",
    price: "₸1,000",
    spots: 80,
    about:
      "An evening to connect with fellow students, alumni, and mentors. Grow your professional network in a relaxed and friendly environment.",
    locationName: "UniVerse Campus Hall",
    locationAddress: "Tauke Khan Ave, Shymkent",
  },
  {
    id: 4,
    category: "Academic",
    title: "Research Methods Seminar",
    organizer: "SKSU",
    organizerRole: "Academic department",
    date: "June 3, 2026",
    time: "11:00 AM",
    price: "Free",
    spots: 60,
    about:
      "A seminar covering modern research methodologies for students writing their thesis or preparing for graduate studies.",
    locationName: "SKSU Main Auditorium",
    locationAddress: "Lenin Ave 5, Shymkent",
  },
];

/* ─── Shared nav ─────────────────────────────────────────── */
const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} />             },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} />        },
  { id: "events",  label: "Events",  icon: <Calendar size={22} />         },
  { id: "profile", label: "Profile", icon: <User size={22} />             },
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
   EVENTS LIST PAGE
   ════════════════════════════════════════════════════════════ */
export const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("events");
  const [search, setSearch]       = useState("");

  const filtered = EVENTS.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const CardList = () => (
    <div className="ann-list">
      {filtered.map(e => (
        <div key={e.id} className="ann-list-card"
          onClick={() => navigate(`/events/${e.id}`)}>
          <div className="ann-list-card__left">
            <span className="ann-list-card__cat">
              <Calendar size={13} /> {e.category}
            </span>
            <div className="ann-list-card__title">{e.title}</div>
            <div className="ann-list-card__meta">{e.date} · {e.time}</div>
          </div>
          <div className="ann-list-card__right">
            <div className="ann-list-card__amount">{e.price}</div>
            <div className="ann-list-card__deadline">
              <span className="ann-list-card__dl-label">Spots</span>
              <span className="ann-list-card__dl-val">{e.spots}</span>
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
          <span className="ann-page-title">Events</span>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ padding: "0 16px 12px" }}>
          <div className="ann-search-bar">
            <Search size={15} color="#A09DC5" />
            <input className="ann-search-input" placeholder="Search events..."
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
              <h1 style={{ marginTop: 8 }}>Events</h1>
              <p>Browse all upcoming events</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__search">
                <Search size={15} color="#A09DC5" />
                <input className="ann-search-input"
                  placeholder="Search events..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#1E1B4B", fontFamily: "Manrope, sans-serif", width: "100%" }} />
              </div>
              <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B" />
                <div className="home-topbar__notif-dot" />
              </div>
            </div>
          </div>

          <div className="home-content">
            <div className="ann-desk-grid">
              {filtered.map(e => (
                <div key={e.id} className="ann-desk-card"
                  onClick={() => navigate(`/events/${e.id}`)}>
                  <div className="ann-desk-card__top">
                    <span className="ann-desk-card__cat">
                      <Calendar size={13} /> {e.category}
                    </span>
                    <span className="ann-desk-card__amount">{e.price}</span>
                  </div>
                  <div className="ann-desk-card__title">{e.title}</div>
                  <div className="ann-desk-card__meta">{e.date} · {e.time}</div>
                  <div className="ann-desk-card__footer">
                    <div className="ann-desk-card__dl">
                      <span className="ann-desk-card__dl-label">Spots</span>
                      <span className="ann-desk-card__dl-val">{e.spots} available</span>
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
   EVENT DETAIL PAGE
   ════════════════════════════════════════════════════════════ */
export const EventDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id }   = useParams<{ id: string }>();
  const [activeNav, setActiveNav] = useState("events");

  const ev = EVENTS.find(e => e.id === Number(id)) ?? EVENTS[0];

  const DetailContent = () => (
    <div className="ev-detail-body">

      {/* Hero card — dark purple */}
      <div className="ev-detail-hero">
        <span className="ev-detail-hero__date">{ev.date}</span>
        <h2 className="ev-detail-hero__title">{ev.title}</h2>
        <p className="ev-detail-hero__venue">{ev.locationName}</p>
      </div>

      {/* Info chips row — TIME / PRICE / SPOTS */}
      <div className="ev-detail-chips">
        <div className="ev-detail-chip">
          <span className="ev-detail-chip__label">TIME</span>
          <span className="ev-detail-chip__value">{ev.time}</span>
        </div>
        <div className="ev-detail-chip">
          <span className="ev-detail-chip__label">PRICE</span>
          <span className="ev-detail-chip__value ev-detail-chip__value--accent">{ev.price}</span>
        </div>
        <div className="ev-detail-chip">
          <span className="ev-detail-chip__label">SPOTS</span>
          <span className="ev-detail-chip__value">{ev.spots}</span>
        </div>
      </div>

      {/* About */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">About</h3>
        <p className="ann-detail-section__text">{ev.about}</p>
      </div>

      {/* Location */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Location</h3>
        <div className="ev-detail-info-row">
          <div className="ev-detail-info-icon">
            <MapPin size={20} color="#1E1B4B" strokeWidth={1.5} />
          </div>
          <div>
            <div className="ev-detail-info-name">{ev.locationName}</div>
            <div className="ev-detail-info-sub">{ev.locationAddress}</div>
          </div>
        </div>
      </div>

      {/* Organizer */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Organizer</h3>
        <div className="ev-detail-info-row">
          <div className="ev-detail-info-icon">
            <BookOpen size={20} color="#1E1B4B" strokeWidth={1.5} />
          </div>
          <div>
            <div className="ev-detail-info-name">{ev.organizer}</div>
            <div className="ev-detail-info-sub">{ev.organizerRole}</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button className="ann-detail-cta">Register now</button>
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
          <span className="ann-page-title">Events</span>
          <div style={{ width: 40 }} />
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
                <ArrowLeft size={16} /> Back to Events
              </button>
              <h1 style={{ marginTop: 8 }}>Event Detail</h1>
              <p>Full information about the event</p>
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
                <h3 className="ann-detail-desk-aside__title">Other Events</h3>
                {EVENTS.filter(e => e.id !== ev.id).map(e => (
                  <div key={e.id} className="ann-aside-card"
                    onClick={() => navigate(`/events/${e.id}`)}>
                    <span className="ann-aside-card__cat"><Calendar size={11} /> {e.category}</span>
                    <div className="ann-aside-card__title">{e.title}</div>
                    <div className="ann-aside-card__meta">{e.date} · {e.price}</div>
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