/* eslint-disable react-hooks/refs */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Sparkles, Home, BriefcaseBusiness,
  User, Building2, LogOut, Calendar,
} from "lucide-react";
import { useUser } from "../context/UserContext";
            import { Link } from "react-router-dom";


interface Announcement { badge: string; title: string; meta: string; type: string; amount: string; }
interface Event        { date: string; title: string; time: string; price?: string; }
interface Housing      { name: string; address: string; price: string; chips: string[]; available?: boolean; }
interface Job          { title: string; company: string; tags: string[]; salary: string; featured: boolean; }

const announcements: Announcement[] = [
  { badge: "New", title: "Scholarship program open for applications",     meta: "Deadline: May 20 · SKSU",           type: "Academic",  amount: "₸500,000"   },
  { badge: "New", title: "Free English courses for students of UniVerse", meta: "Deadline: May 25 · UniVerse Hub",   type: "Language",  amount: "Free"       },
  { badge: "New", title: "Student dormitory registration open",           meta: "Deadline: May 15 · SKSU Admin",    type: "Housing",   amount: "₸15,000/mo" },
  { badge: "New", title: "Career counseling sessions available",          meta: "Deadline: Ongoing · Career Center", type: "Career",    amount: "Free"       },
];

const events: Event[] = [
  { date: "MAY 12", title: "Tech Career Fair",           time: "10:00 AM"               },
  { date: "MAY 23", title: "UI/UX Design Workshop",      time: "2:00 PM · Online · Zoom" },
  { date: "MAY 28", title: "Student Networking Evening", time: "7:00 PM", price: "₸1,000" },
];

const housing: Housing[] = [
  { name: "Studio near SKSU",        address: "Al-Farabi St, Shymkent",    price: "₸60,000",  chips: ["1 room","Wi-Fi","Furnished"], available: true },
  { name: "2-room apt, city center", address: "Tauke Khan Ave, Shymkent",  price: "₸120,000", chips: ["2 rooms","Wi-Fi","Pets OK"],  available: true },
  { name: "Room in shared flat",     address: "Zhibek Zholy St, Shymkent", price: "₸35,000",  chips: ["Shared","Wi-Fi","Furnished"], available: true },
];

const jobs: Job[] = [
  { title: "Frontend Developer", company: "Kaspi Bank · Shymkent", tags: ["Part-time","Remote"], salary: "₸250K", featured: true  },
  { title: "UX Designer",        company: "Jusan Bank · Almaty",   tags: ["Part-time","Hybrid"], salary: "₸180K", featured: false },
  { title: "Data Analyst",       company: "Halyk Bank · Shymkent", tags: ["Part-time","Remote"], salary: "₸200K", featured: true  },
];

const filters  = ["All", "Announcements", "Events", "Housing", "Jobs"];
const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} />              },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} />         },
  { id: "events",  label: "Events",  icon: <Calendar size={22} />          },
  { id: "profile", label: "Profile", icon: <User size={22} />              },
];

/** Возвращает "Good morning / afternoon / evening" по текущему часу */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

/** Форматирует текущую дату: "Monday, May 20" */
const getTodayLabel = () =>
  new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

const SectionHeader: React.FC<{ title: string; onSeeAll: () => void }> = ({ title, onSeeAll }) => (
  <div className="home-section-header">
    <span className="home-section-title">{title}</span>
    <button className="home-see-all" onClick={onSeeAll}>
      See all <ArrowRight size={15} />
    </button>
  </div>
);

const Feed: React.FC<{
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  navigate: ReturnType<typeof useNavigate>;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}> = ({ activeFilter, setActiveFilter, navigate, scrollContainerRef }) => {

  const sectionRefs = {
    Announcements: useRef<HTMLDivElement>(null),
    Events:        useRef<HTMLDivElement>(null),
    Housing:       useRef<HTMLDivElement>(null),
    Jobs:          useRef<HTMLDivElement>(null),
  };

  const handleFilter = (f: string) => {
    setActiveFilter(f);
    if (f === "All") {
      scrollContainerRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    sectionRefs[f as keyof typeof sectionRefs]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="home-filters">
        {filters.map(f => (
          <button key={f}
            className={`home-filter ${activeFilter === f ? "home-filter--active" : "home-filter--inactive"}`}
            onClick={() => handleFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="home-content">
        <div ref={sectionRefs.Announcements}>
          <SectionHeader title="Announcements" onSeeAll={() => navigate("/announcements")} />
          <div className="home-scroll-row">
            {announcements.map((a, i) => (
              <div key={i} className="ann-card" onClick={() => navigate(`/announcements/${i + 1}`)}>
                <div className="ann-badge"><Sparkles size={13} /> {a.badge}</div>
                <p className="ann-title">{a.title}</p>
                <p className="ann-meta">{a.meta}</p>
                <div className="ann-chips">
                  <div className="ann-chip">
                    <div className="ann-chip__label">TYPE</div>
                    <div className="ann-chip__value">{a.type}</div>
                  </div>
                  <div className="ann-chip">
                    <div className="ann-chip__label">AMOUNT</div>
                    <div className="ann-chip__value">{a.amount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={sectionRefs.Events}>
          <SectionHeader title="Events" onSeeAll={() => navigate("/events")} />
          <div className="home-events-grid">
            <div className="event-big" onClick={() => navigate("/events/:id/register")}>
              <span className="event-date-badge">{events[0].date}</span>
              <div className="event-big__title">{events[0].title}</div>
              <div className="event-big__time">{events[0].time}</div>
              <span className="event-free-badge">Free</span>
            </div>
            <div className="events-small-col">
              {events.slice(1).map((e, i) => (
                <div key={i} className="event-small" onClick={() => navigate(`/events/${i + 2}/register`)}>
                  <div className="event-small__date">{e.date}</div>
                  <div className="event-small__title">{e.title}</div>
                  <div className="event-small__meta">{e.time}{e.price ? ` · ${e.price}` : ""}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={sectionRefs.Housing}>
          <SectionHeader title="Housing" onSeeAll={() => navigate("/housing")} />
          <div className="home-list">
            {housing.map((h, i) => (
              <div key={i} className="housing-card" onClick={() => navigate(`/housing/${i + 1}`)}>
                <div className="housing-card__top">
                  <div>
                    <div className="housing-card__name">{h.name}</div>
                    <div className="housing-card__addr">{h.address}</div>
                  </div>
                  <div className="housing-card__price">{h.price}<span>/mo</span></div>
                </div>
                <div className="housing-card__chips">
                  {h.chips.map((c, j) => <span key={j} className="h-chip h-chip--muted">{c}</span>)}
                  {h.available && <span className="h-chip h-chip--accent">Available</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={sectionRefs.Jobs}>
          <SectionHeader title="Jobs" onSeeAll={() => navigate("/jobs")} />
          <div className="home-list jobs-grid">
            {jobs.map((j, i) => (
              <div key={i}
                className={`job-card ${j.featured ? "job-card--featured" : "job-card--light"}`}
                onClick={() => navigate(`/jobs/${i + 1}`)}>
                <div className="job-card__top">
                  <div className={`job-card__title ${j.featured ? "job-card__title--white" : "job-card__title--dark"}`}>
                    {j.title}
                  </div>
                  <span className="job-feat-badge">· Featured</span>
                </div>
                <div className={`job-card__company ${j.featured ? "job-card__company--light" : "job-card__company--muted"}`}>
                  {j.company}
                </div>
                <div className="job-card__bottom">
                  <div className="job-chips">
                    {j.tags.map((t, k) => <span key={k} className="j-chip">{t}</span>)}
                  </div>
                  <span className={`job-salary ${j.featured ? "job-salary--white" : "job-salary--dark"}`}>
                    {j.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const DesktopHero: React.FC<{
  firstName: string;
  headerMeta: string;
  navigate: ReturnType<typeof useNavigate>;
}> = ({ firstName, headerMeta, navigate }) => (
  <section className="home-web-hero">
    <div className="home-web-hero__copy">
      <div className="home-web-hero__eyebrow">
        <Sparkles size={14} />
        UniVerse Web
      </div>
      <h2 className="home-web-hero__title">
        {firstName ? `${firstName}, shape your semester with more than a checklist.` : "Shape your semester with more than a checklist."}
      </h2>
      <p className="home-web-hero__text">
        Track openings, discover events, and move between campus life and career goals from one place.
        {` ${headerMeta}`}
      </p>
      <div className="home-web-hero__actions">
        <button className="home-web-hero__btn home-web-hero__btn--primary" onClick={() => navigate("/jobs")}>
          Explore Jobs <ArrowRight size={16} />
        </button>
        <button className="home-web-hero__btn home-web-hero__btn--ghost" onClick={() => navigate("/events")}>
          Upcoming Events
        </button>
      </div>
      <div className="home-web-hero__stats">
        <div className="home-web-hero__stat">
          <span className="home-web-hero__stat-value">24/7</span>
          <span className="home-web-hero__stat-label">Campus flow</span>
        </div>
        <div className="home-web-hero__stat">
          <span className="home-web-hero__stat-value">50K+</span>
          <span className="home-web-hero__stat-label">Students connected</span>
        </div>
        <div className="home-web-hero__stat">
          <span className="home-web-hero__stat-value">All-in-one</span>
          <span className="home-web-hero__stat-label">Jobs, homes, events</span>
        </div>
      </div>
    </div>

    <div className="home-web-hero__visual">
      <div className="home-web-hero__glow" />
      <div className="home-web-hero__orbit home-web-hero__orbit--a" />
      <div className="home-web-hero__orbit home-web-hero__orbit--b" />
      <img className="home-web-hero__logo" src="/logo.png" alt="UniVerse logo" />
      <div className="home-web-hero__floating-card home-web-hero__floating-card--top">
        <span className="home-web-hero__floating-label">Next event</span>
        <strong>Startup Pitch Night</strong>
        <span>May 17 · 6:00 PM</span>
      </div>
      <div className="home-web-hero__floating-card home-web-hero__floating-card--bottom">
        <span className="home-web-hero__floating-label">Fast lane</span>
        <strong>1 tap to apply</strong>
        <span>Save time across listings</span>
      </div>
    </div>
  </section>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeNav,    setActiveNav]    = useState("home");
  const mobileScrollRef  = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const greeting  = getGreeting();
  const todayLabel = getTodayLabel();
  // "Shymkent · Monday, May 20"  или просто дата если город не указан
  const headerMeta = user.city ? `${user.city} · ${todayLabel}` : todayLabel;
  // первое слово имени для приветствия
  const firstName = user.fullName.trim().split(/\s+/)[0];

  return (
    <div className="home-screen">
      {/* MOBILE */}
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="home-header">
          <div>
            <h1 className="home-header__name">{user.fullName || "Welcome"}</h1>
            <p className="home-header__meta">{headerMeta}</p>
          </div>
          {user.initials
            ? <div className="home-avatar">{user.initials}</div>
            : <div className="home-avatar"><User size={20} /></div>
          }
        </div>

        <div ref={mobileScrollRef} style={{ flex: 1, overflowY: "auto" }}>
          <Feed activeFilter={activeFilter} setActiveFilter={setActiveFilter}
            navigate={navigate} scrollContainerRef={mobileScrollRef as React.RefObject<HTMLDivElement>} />
        </div>

        <div className="home-navbar">
          {navItems.map(item => {
            const isActive = activeNav === item.id;
            return (
              <button key={item.id}
                className={`home-nav-item ${isActive ? "home-nav-item--active" : "home-nav-item--inactive"}`}
                onClick={() => {
                  setActiveNav(item.id);
                  navigate(item.id === "home" ? "/home" : `/${item.id}`);
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

      {/* DESKTOP */}
      <div className="home-desktop" style={{ flex: 1 }}>
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
                  navigate(item.id === "home" ? "/home" : `/${item.id}`);
                }}>
                {item.icon}
                {item.label}
                {/* {item.id === "home" && <span className="home-sidebar__item-badge">3</span>} */}
              </button>
            ))}
          </nav>

          <div className="home-sidebar__bottom">

<Link to="/profile" className="home-sidebar__user">
  <div className="home-sidebar__avatar">
    {user.initials || <User size={18} />}
  </div>

  <div>
    <div className="home-sidebar__user-name">
      {user.fullName || "—"}
    </div>

    <div className="home-sidebar__user-meta">
      {[user.city, user.role].filter(Boolean).join(" · ") || "Student"}
    </div>
  </div>
</Link>
            <button className="home-sidebar__item"
              style={{ marginTop: 4, color: "rgba(255,255,255,0.4)" }}
              onClick={() => navigate("/login")}>
              <LogOut size={20} /> Log out
            </button>
          </div>
        </aside>

        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <h1>{firstName ? `${greeting}, ${firstName} 👋` : `${greeting} 👋`}</h1>
              <p>{headerMeta}</p>
            </div>
          </div>

          <div ref={desktopScrollRef} style={{ flex: 1, overflowY: "auto" }}>
            <div className="home-content home-content--hero">
              <DesktopHero firstName={firstName} headerMeta={headerMeta} navigate={navigate} />
            </div>
            <Feed activeFilter={activeFilter} setActiveFilter={setActiveFilter}
              navigate={navigate} scrollContainerRef={desktopScrollRef as React.RefObject<HTMLDivElement>} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
