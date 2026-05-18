/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Home, BriefcaseBusiness, Building2, Calendar, User,
  LogOut, Search, Bell, Heart, ArrowLeft, Check,
  ChevronDown, Users, BookOpen,
} from "lucide-react";

/* ─── Types & Data ───────────────────────────────────────── */
export interface EventItem {
  id: number;
  day: string;
  month: string;
  date: number;
  title: string;
  venue: string;
  time: string;
  category: string;
  price: string | null;
  spots?: number;
  featured?: boolean;
  accentColor: string;
}

export const EVENTS: EventItem[] = [
  {
    id: 1, day: "Monday, May 12", month: "MAY", date: 12,
    title: "Tech Career Fair 2026", venue: "Shymkent IT Hub",
    time: "10:00 AM", category: "Career", price: null,
    spots: 200, featured: true, accentColor: "#4C1D95",
  },
  {
    id: 2, day: "Saturday, May 17", month: "MAY", date: 17,
    title: "Startup Pitch Night", venue: "UniVerse Hub",
    time: "6:00 PM", category: "Startup", price: "₸500", accentColor: "#4C1D95",
  },
  {
    id: 3, day: "Friday, May 23", month: "MAY", date: 23,
    title: "UI/UX Design Workshop", venue: "Online · Zoom",
    time: "2:00 PM", category: "Design", price: null, accentColor: "#A78BFA",
  },
  {
    id: 4, day: "Wednesday, May 28", month: "MAY", date: 28,
    title: "Student Networking Evening", venue: "Rixos Hotel",
    time: "7:00 PM", category: "Networking", price: "₸1,000", accentColor: "#4C1D95",
  },
  {
    id: 5, day: "Monday, June 1", month: "JUN", date: 1,
    title: "AI & Future of Work Panel", venue: "UniVerse Hub",
    time: "5:00 PM", category: "Career", price: null, accentColor: "#4C1D95",
  },
];

const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} />              },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} />         },
  { id: "events",  label: "Events",  icon: <Calendar size={22} />          },
  { id: "profile", label: "Profile", icon: <User size={22} />              },
];

const monthFilters = ["May", "June", "July", "August"];
const catFilters   = ["All", "Career", "Startup", "Design", "Free"];

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
    <button
      key={item.id}
      className={`home-sidebar__item ${
        activeNav === item.id ? "home-sidebar__item--active" : ""
      }`}
      onClick={() => {
        setActiveNav(item.id);

        if (item.id === "home") navigate("/home");
        if (item.id === "jobs") navigate("/jobs");
        if (item.id === "housing") navigate("/housing");
        if (item.id === "events") navigate("/events");
        if (item.id === "profile") navigate("/profile");
      }}
    >
      {item.icon}
      {item.label}

      {item.id === "home" && (
        <span className="home-sidebar__item-badge">3</span>
      )}
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
   TICKET COMPONENT
   ════════════════════════════════════════════════════════════ */
const EventTicket: React.FC<{
  event: EventItem; fullName: string; role: string;
  attendance: string; showQR?: boolean;
}> = ({ event, fullName, role, attendance, showQR = false }) => (
  <div className="ev-ticket">
    <div className="ev-ticket__notch ev-ticket__notch--left" />
    <div className="ev-ticket__notch ev-ticket__notch--right" />
    <div className="ev-ticket__top">
      <div className="ev-ticket__title">{event.title}</div>
      <div className="ev-ticket__sub">
        {event.month} {event.date} · {event.time} · {event.venue}
      </div>
      {!showQR && (
        <div className="ev-ticket__badge">
          {event.price ?? "FREE"} · {attendance}
        </div>
      )}
    </div>
    <div className="ev-ticket__dashed" />
    <div className="ev-ticket__bottom">
      <div className="ev-ticket__attendee-col">
        <span className="ev-ticket__label">Attendee</span>
        <span className="ev-ticket__value">{fullName}</span>
      </div>
      {showQR && (
        <div className="ev-ticket__qr">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" fill="#27236B" rx="6"/>
            <rect x="4" y="4" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2"/>
            <rect x="7" y="7" width="10" height="10" fill="#fff"/>
            <rect x="28" y="4" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2"/>
            <rect x="31" y="7" width="10" height="10" fill="#fff"/>
            <rect x="4" y="28" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2"/>
            <rect x="7" y="31" width="10" height="10" fill="#fff"/>
            <rect x="28" y="28" width="4" height="4" fill="#fff"/>
            <rect x="34" y="28" width="4" height="4" fill="#fff"/>
            <rect x="40" y="28" width="4" height="4" fill="#fff"/>
            <rect x="28" y="34" width="4" height="4" fill="#fff"/>
            <rect x="34" y="34" width="4" height="4" fill="#fff"/>
            <rect x="28" y="40" width="4" height="4" fill="#fff"/>
            <rect x="40" y="40" width="4" height="4" fill="#fff"/>
            <rect x="22" y="4" width="4" height="4" fill="#fff"/>
            <rect x="22" y="10" width="4" height="4" fill="#fff"/>
            <rect x="22" y="22" width="4" height="4" fill="#fff"/>
            <rect x="4" y="22" width="4" height="4" fill="#fff"/>
            <rect x="10" y="22" width="8" height="4" fill="#fff"/>
          </svg>
        </div>
      )}
      <div className="ev-ticket__type-col">
        <span className="ev-ticket__label" style={{ textAlign: "right" }}>Type</span>
        <span className="ev-ticket__value" style={{ textAlign: "right" }}>{role}</span>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════
   EVENTS LIST PAGE
   ════════════════════════════════════════════════════════════ */
export const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav,   setActiveNav]   = useState("events");
  const [activeMonth, setActiveMonth] = useState("May");
  const [activeCat,   setActiveCat]   = useState("All");
  const [savedIds,    setSavedIds]    = useState<number[]>([3]);

  const toggleSave = (id: number) =>
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filtered = EVENTS.filter(e => {
    const matchCat = activeCat === "All" || e.category === activeCat ||
      (activeCat === "Free" && !e.price);
    return matchCat;
  });

  const grouped: Record<string, EventItem[]> = {};
  filtered.forEach(e => { if (!grouped[e.day]) grouped[e.day] = []; grouped[e.day].push(e); });

  const featured = filtered.find(e => e.featured);

  const EventCard: React.FC<{ ev: EventItem }> = ({ ev }) => {
    if (ev.featured) return null;
    const isSaved = savedIds.includes(ev.id);
    return (
      <div className="ev-list-item" style={{ borderLeftColor: ev.accentColor }}
        onClick={() => navigate(`/events/${ev.id}/register`)}>
        <div className="ev-list-item__card">
          <div className="ev-list-item__datebox">
            <span className="ev-list-item__month">{ev.month}</span>
            <span className="ev-list-item__day">{ev.date}</span>
          </div>
          <div className="ev-list-item__info">
            <div className="ev-list-item__title">{ev.title}</div>
            <div className="ev-list-item__sub">{ev.time} · {ev.venue}</div>
            <div className="ev-list-item__tags">
              <span className="ev-tag ev-tag--light">{ev.category}</span>
              <span className="ev-tag ev-tag--light">{ev.price ?? "Free"}</span>
            </div>
          </div>
          <button className="ev-heart-btn"
            onClick={e => { e.stopPropagation(); toggleSave(ev.id); }}>
            <Heart size={16} fill={isSaved ? "#462370" : "none"} color="#462370" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    );
  };

  const MainContent = () => (
    <div className="ev-page-content">
      <div className="ev-page-header">
        <h1 className="ev-page-header__title">Events</h1>
        <button className="ev-search-icon-btn"><Search size={18} color="#462370" /></button>
      </div>
      <div className="ev-filter-row">
        {monthFilters.map(m => (
          <button key={m}
            className={`ev-month-chip ${activeMonth === m ? "ev-month-chip--active" : ""}`}
            onClick={() => setActiveMonth(m)}>{m}</button>
        ))}
      </div>
      <div className="ev-filter-row">
        {catFilters.map(c => (
          <button key={c}
            className={`ev-cat-chip ${activeCat === c ? "ev-cat-chip--active" : ""}`}
            onClick={() => setActiveCat(c)}>{c}</button>
        ))}
      </div>
      {featured && (
        <>
          <p className="ev-day-label">{featured.day}</p>
          <div className="ev-featured-card" onClick={() => navigate(`/events/${featured.id}/register`)}>
            <div className="ev-featured-card__top">
              <span className="ev-featured-date">{featured.month} {featured.date}, 2026</span>
              <button className="ev-featured-heart"
                onClick={e => { e.stopPropagation(); toggleSave(featured.id); }}>
                <Heart size={14} fill={savedIds.includes(featured.id) ? "#1E1B4B" : "none"}
                  color="#1E1B4B" strokeWidth={1.5} />
              </button>
            </div>
            <div className="ev-featured-card__title">{featured.title}</div>
            <div className="ev-featured-card__venue">{featured.venue}</div>
            <div className="ev-featured-card__foot">
              <div className="ev-featured-tags">
                <span className="ev-tag ev-tag--dark">Free</span>
                {featured.spots && <span className="ev-tag ev-tag--dark">{featured.spots} spots</span>}
              </div>
              <span className="ev-featured-time">{featured.time}</span>
            </div>
          </div>
        </>
      )}
      {Object.entries(grouped).map(([day, evs]) => {
        const list = evs.filter(e => !e.featured);
        if (!list.length) return null;
        return (
          <div key={day}>
            <p className="ev-day-label">{day}</p>
            {list.map(ev => <EventCard key={ev.id} ev={ev} />)}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}><MainContent /></div>
        {/* <div className="home-navbar">
          {navItems.map(item => {
            const isActive = activeNav === item.id;
            return (
              <button key={item.id}
                className={`home-nav-item ${isActive ? "home-nav-item--active" : "home-nav-item--inactive"}`}
                onClick={() => { setActiveNav(item.id); navigate(item.id === "events" ? "/events" : "/home"); }}>
                {item.icon}
                <span className={`home-nav-label ${isActive ? "home-nav-label--show" : "home-nav-label--hide"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div> */}
          <div className="home-navbar">
  {navItems.map(item => {
    const isActive = activeNav === item.id;

    return (
      <button
        key={item.id}
        className={`home-nav-item ${
          isActive
            ? "home-nav-item--active"
            : "home-nav-item--inactive"
        }`}
        onClick={() => {
          setActiveNav(item.id);

          if (item.id === "home") navigate("/home");
          if (item.id === "jobs") navigate("/jobs");
          if (item.id === "housing") navigate("/housing");
          if (item.id === "events") navigate("/events");
          if (item.id === "profile") navigate("/profile");
        }}
      >
        {item.icon}

        <span
          className={`home-nav-label ${
            isActive
              ? "home-nav-label--show"
              : "home-nav-label--hide"
          }`}
        >
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
          <div className="home-topbar">
            <div className="home-topbar__greeting"><h1>Events </h1><p>Upcoming events</p></div>
            <div className="home-topbar__right">
              
            </div>
          </div>
          <div className="home-content">
            <div className="ev-filter-row" style={{ marginBottom: 8 }}>
              {monthFilters.map(m => (
                <button key={m}
                  className={`ev-month-chip ${activeMonth === m ? "ev-month-chip--active" : ""}`}
                  onClick={() => setActiveMonth(m)}>{m}</button>
              ))}
            </div>
            <div className="ev-filter-row" style={{ marginBottom: 20 }}>
              {catFilters.map(c => (
                <button key={c}
                  className={`ev-cat-chip ${activeCat === c ? "ev-cat-chip--active" : ""}`}
                  onClick={() => setActiveCat(c)}>{c}</button>
              ))}
            </div>
            {featured && (
              <>
                <p className="ev-day-label">{featured.day}</p>
                <div className="ev-featured-card" style={{ marginBottom: 24 }}
                  onClick={() => navigate(`/events/${featured.id}/register`)}>
                  <div className="ev-featured-card__top">
                    <span className="ev-featured-date">{featured.month} {featured.date}, 2026</span>
                    <button className="ev-featured-heart"
                      onClick={e => { e.stopPropagation(); toggleSave(featured.id); }}>
                      <Heart size={14} fill={savedIds.includes(featured.id) ? "#1E1B4B" : "none"}
                        color="#1E1B4B" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="ev-featured-card__title">{featured.title}</div>
                  <div className="ev-featured-card__venue">{featured.venue}</div>
                  <div className="ev-featured-card__foot">
                    <div className="ev-featured-tags">
                      <span className="ev-tag ev-tag--dark">Free</span>
                      {featured.spots && <span className="ev-tag ev-tag--dark">{featured.spots} spots</span>}
                    </div>
                    <span className="ev-featured-time">{featured.time}</span>
                  </div>
                </div>
              </>
            )}
            <div className="ann-desk-grid">
              {filtered.filter(e => !e.featured).map(ev => (
                <div key={ev.id} className="ann-desk-card"
                  style={{ borderLeft: `4px solid ${ev.accentColor}`, paddingLeft: 12 }}
                  onClick={() => navigate(`/events/${ev.id}/register`)}>
                  <div className="ann-desk-card__top">
                    <div className="ev-list-item__datebox" style={{ background: "#EDE9FE" }}>
                      <span className="ev-list-item__month">{ev.month}</span>
                      <span className="ev-list-item__day" style={{ color: "#1E1B4B" }}>{ev.date}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleSave(ev.id); }}>
                      <Heart size={15} fill={savedIds.includes(ev.id) ? "#462370" : "none"}
                        color="#462370" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="ann-desk-card__title" style={{ marginTop: 8 }}>{ev.title}</div>
                  <div className="ann-desk-card__meta">{ev.time} · {ev.venue}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <span className="ev-tag ev-tag--light">{ev.category}</span>
                    <span className="ev-tag ev-tag--light">{ev.price ?? "Free"}</span>
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
   REGISTER PAGE — 3 steps
   ════════════════════════════════════════════════════════════ */
export const EventRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === Number(id)) ?? EVENTS[0];
  const [step, setStep] = useState(1);

  const [fullName,   setFullName]   = useState("Aymakhan Balausa");
  const [email,      setEmail]      = useState("aymakhanbalausa@gmail.com");
  const [phone,      setPhone]      = useState("+7 771 887 33 37");
  const [university, setUniversity] = useState("SKSU");
  const [faculty,    setFaculty]    = useState("Information Technologies");
  const [year,       setYear]       = useState("3rd");
  const [linkedin,   setLinkedin]   = useState("");
  const [attendance, setAttendance] = useState<"In person"|"Online">("In person");
  const [role,       setRole]       = useState("Student");
  const [interests,  setInterests]  = useState<string[]>(["Jobs", "Networking"]);
  const [expLevel,   setExpLevel]   = useState(50);
  const [specialReqs,setSpecialReqs]= useState("");
  const [city,       setCity]       = useState("");

  const years = ["1st","2nd","3rd","4th","5th","6th+"];
  const roles = ["Student","Graduate","Professional"];
  const interestOpts = [
    { label:"Networking",  icon:<Users size={14}/> },
    { label:"Startups",    icon:<BriefcaseBusiness size={14}/> },
    { label:"Learning",    icon:<BookOpen size={14}/> },
    { label:"Jobs",        icon:<BriefcaseBusiness size={14}/> },
    { label:"Mentorship",  icon:<Users size={14}/> },
    { label:"Internship",  icon:<BookOpen size={14}/> },
  ];
  const toggleInterest = (label: string) =>
    setInterests(prev => prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label]);

  const expLabel = expLevel < 34 ? "Beginner" : expLevel < 67 ? "Intermediate" : "Expert";

  const stepDefs = [{ num:1, label:"Info" },{ num:2, label:"Preferences" },{ num:3, label:"Confirm" }];

  const Stepper = () => (
    <div className="ev-reg-stepper">
      {stepDefs.map((s, i) => (
        <React.Fragment key={s.num}>
          <div className="ev-reg-stepper__item">
            <div className={`ev-reg-stepper__circle ${
              step > s.num ? "ev-reg-stepper__circle--done" :
              step === s.num ? "ev-reg-stepper__circle--active" : "ev-reg-stepper__circle--idle"
            }`}>
              {step > s.num ? <Check size={12} color="#fff" /> : s.num}
            </div>
            <span className={`ev-reg-stepper__label ${step === s.num ? "ev-reg-stepper__label--active" : ""}`}>
              {s.label}
            </span>
          </div>
          {i < stepDefs.length - 1 && (
            <div className={`ev-reg-stepper__line ${step > s.num ? "ev-reg-stepper__line--done" : ""}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const MiniCard = () => (
    <div className="ev-mini-card">
      <div className="ev-mini-card__inner">
        <div className="ev-list-item__datebox" style={{ background:"#EDE9FE" }}>
          <span className="ev-list-item__month">{event.month}</span>
          <span className="ev-list-item__day" style={{ color:"#1E1B4B" }}>{event.date}</span>
        </div>
        <div style={{ flex:1 }}>
          <div className="ev-mini-card__title">{event.title}</div>
          <div className="ev-mini-card__sub">{event.time} · {event.venue}</div>
          <span className="ev-tag ev-tag--light" style={{ marginTop:4, display:"inline-block" }}>
            {event.price ?? "Free"}
          </span>
        </div>
        <Heart size={15} color="#462370" strokeWidth={1.5} />
      </div>
    </div>
  );

  const Field: React.FC<{
    label:string; value:string; onChange:(v:string)=>void;
    placeholder?:string; type?:string; optional?:boolean;
    select?:{options:string[]};
  }> = ({ label,value,onChange,placeholder,type="text",optional,select }) => (
    <div className="ev-reg-field">
      <label className="ev-reg-field__label">
        {label}{optional && <span style={{color:"#A09DC5",fontWeight:400}}> (optional)</span>}
      </label>
      {select ? (
        <div className="ev-reg-field__select-wrap">
          <select className="ev-reg-field__input ev-reg-field__select"
            value={value} onChange={e=>onChange(e.target.value)}>
            {select.options.map(o=><option key={o}>{o}</option>)}
          </select>
          <ChevronDown size={16} color="#6B7280" className="ev-reg-field__chevron"/>
        </div>
      ) : (
        <input className="ev-reg-field__input" type={type} value={value}
          onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
      )}
    </div>
  );

  /* Step 1 */
  const Step1 = () => (
    <div className="ev-reg-form">
      <p className="ev-reg-section-label">PERSONAL INFO</p>
      <Field label="Full Name" value={fullName} onChange={setFullName}/>
      <Field label="Email" value={email} onChange={setEmail} type="email"/>
      <Field label="Phone number" value={phone} onChange={setPhone} type="tel"/>
      <p className="ev-reg-section-label" style={{marginTop:8}}>ACADEMIC INFO</p>
      <Field label="University" value={university} onChange={setUniversity}
        select={{options:["SKSU","SDU","IITU","KazNU","Other"]}}/>
      <Field label="Faculty / Major" value={faculty} onChange={setFaculty}/>
      <div className="ev-reg-field">
        <label className="ev-reg-field__label">Year of study</label>
        <div className="ev-chip-row">
          {years.map(y=>(
            <button key={y} className={`ev-year-chip ${year===y?"ev-year-chip--active":""}`}
              onClick={()=>setYear(y)}>{y}</button>
          ))}
        </div>
      </div>
      <Field label="LinkedIn" value={linkedin} onChange={setLinkedin}
        placeholder="linkedin.com/in/username" optional/>
      <button className="ev-reg-next-btn" onClick={()=>setStep(2)}>Continue to Preferences</button>
    </div>
  );

  /* Step 2 */
  const Step2 = () => (
    <div className="ev-reg-form">
      <p className="ev-reg-section-label">ATTENDANCE</p>
      <div className="ev-reg-field">
        <label className="ev-reg-field__label">Will you attend in person?</label>
        <div className="ev-toggle-row">
          {(["In person","Online"] as const).map(opt=>(
            <button key={opt} className={`ev-toggle-btn ${attendance===opt?"ev-toggle-btn--active":""}`}
              onClick={()=>setAttendance(opt)}>
              {attendance===opt && <Check size={14}/>} {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="ev-reg-field">
        <label className="ev-reg-field__label">I am attending as</label>
        <div className="ev-chip-row" style={{flexWrap:"nowrap",gap:6}}>
          {roles.map(r=>(
            <button key={r} className={`ev-role-chip ${role===r?"ev-role-chip--active":""}`}
              onClick={()=>setRole(r)}>
              <div className={`ev-role-chip__circle ${role===r?"ev-role-chip__circle--active":""}`}>
                {role===r && <div className="ev-role-chip__dot"/>}
              </div>{r}
            </button>
          ))}
        </div>
      </div>
      <p className="ev-reg-section-label">YOUR INTERESTS</p>
      <div className="ev-reg-field">
        <label className="ev-reg-field__label">What are you looking for?</label>
        <p style={{fontSize:12,color:"#6B7280",margin:"-4px 0 8px"}}>Select all that apply</p>
        <div className="ev-chip-row ev-chip-row--wrap">
          {interestOpts.map(({label,icon})=>{
            const active = interests.includes(label);
            return (
              <button key={label} className={`ev-interest-chip ${active?"ev-interest-chip--active":""}`}
                onClick={()=>toggleInterest(label)}>{icon} {label}</button>
            );
          })}
        </div>
      </div>
      <p className="ev-reg-section-label">EXPERIENCE LEVEL</p>
      <div className="ev-reg-field">
        <label className="ev-reg-field__label">Your current level</label>
        <div className="ev-slider-wrap">
          <input type="range" min={0} max={100} value={expLevel}
            onChange={e=>setExpLevel(Number(e.target.value))} className="ev-slider"/>
          <div className="ev-slider-labels">
            <span style={{color:expLabel==="Beginner"?"#7C3AED":"#9CA3AF"}}>Beginner</span>
            <span style={{color:expLabel==="Intermediate"?"#7C3AED":"#9CA3AF"}}>Intermediate</span>
            <span style={{color:expLabel==="Expert"?"#7C3AED":"#9CA3AF"}}>Expert</span>
          </div>
        </div>
      </div>
      <p className="ev-reg-section-label">ADDITIONAL</p>
      <div className="ev-reg-field">
        <label className="ev-reg-field__label">Any special requirements?</label>
        <textarea className="ev-reg-field__textarea" rows={4}
          placeholder="Dietary needs, accessibility, others......"
          value={specialReqs} onChange={e=>setSpecialReqs(e.target.value)}/>
      </div>
      <Field label="City" value={city} onChange={setCity} placeholder="Your city" optional/>
      <div className="ev-reg-btn-row">
        <button className="ev-reg-back-btn" onClick={()=>setStep(1)}>← Back</button>
        <button className="ev-reg-next-btn" style={{flex:1}} onClick={()=>setStep(3)}>
          Continue to Confirm
        </button>
      </div>
    </div>
  );

  /* Step 3 — Confirm with review cards matching design */
  const Step3 = () => {
    const ReviewRow: React.FC<{label:string;value:string;onEdit:()=>void}> = ({label,value,onEdit}) => (
      <>
        <div className="ev-review-row">
          <div className="ev-review-row__info">
            <span className="ev-review-row__label">{label}</span>
            <span className="ev-review-row__value">{value}</span>
          </div>
          <button className="ev-review-row__edit" onClick={onEdit}>Edit</button>
        </div>
        <div className="ev-review-divider"/>
      </>
    );

    return (
      <div className="ev-reg-form">
        <p className="ev-reg-section-label">REVIEW YOUR INFO</p>
        <div className="ev-review-card">
          <ReviewRow label="Full name" value={fullName} onEdit={()=>setStep(1)}/>
          <ReviewRow label="Email" value={email} onEdit={()=>setStep(1)}/>
          <ReviewRow label="Phone" value={phone} onEdit={()=>setStep(1)}/>
          <ReviewRow label="University · Year" value={`${university} · ${year} year`} onEdit={()=>setStep(1)}/>
        </div>

        <p className="ev-reg-section-label">YOUR PREFERENCES</p>
        <div className="ev-review-card">
          <ReviewRow label="Attendance" value={attendance} onEdit={()=>setStep(2)}/>
          <ReviewRow label="Role · Level" value={`${role} · ${expLabel}`} onEdit={()=>setStep(2)}/>
        </div>

        <p className="ev-reg-section-label">SELECTED INTERESTS</p>
        <div className="ev-chip-row ev-chip-row--wrap">
          {interests.map(i=>(
            <span key={i} className="ev-interest-chip-sm">
              <BriefcaseBusiness size={13} color="#4C1D95" opacity={0.7}/> {i}
            </span>
          ))}
        </div>

        <p className="ev-reg-section-label">YOUR TICKET</p>
        <EventTicket event={event} fullName={fullName.split(" ").slice(-1)[0]}
          role={role} attendance={attendance} showQR={false}/>

        <div className="ev-reg-btn-row">
          <button className="ev-reg-back-btn" onClick={()=>setStep(2)}>← Back</button>
          <button className="ev-reg-next-btn" style={{flex:1}}
            onClick={()=>navigate(`/events/${event.id}/success`)}>
            Submit Registration
          </button>
        </div>
      </div>
    );
  };

  const PageContent = () => (
    <>
      <div className="ann-page-topbar">
        <button className="ann-back-btn" onClick={()=>navigate(-1)}>
          <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2}/>
        </button>
        <span className="ann-page-title">Register for event</span>
        <div style={{width:40}}/>
      </div>
      <div style={{padding:"0 16px 48px",display:"flex",flexDirection:"column",gap:16}}>
        <MiniCard/>
        <Stepper/>
        {step===1 && <Step1/>}
        {step===2 && <Step2/>}
        {step===3 && <Step3/>}
      </div>
    </>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{flexDirection:"column",height:"100vh",overflow:"hidden"}}>
        <div style={{flex:1,overflowY:"auto"}}><PageContent/></div>
      </div>
      <div className="home-desktop" style={{flex:1}}>
        <Sidebar activeNav="events" setActiveNav={()=>{}}/>
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={()=>navigate(-1)}>
                <ArrowLeft size={16}/> Back to Events
              </button>
              <h1 style={{marginTop:8}}>Register for Event</h1>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__notif">
                <Bell size={17} color="#1E1B4B"/><div className="home-topbar__notif-dot"/>
              </div>
            </div>
          </div>
          <div className="home-content">
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main" style={{maxWidth:520}}>
                <MiniCard/>
                <div style={{marginTop:16}}><Stepper/></div>
                {step===1 && <Step1/>}
                {step===2 && <Step2/>}
                {step===3 && <Step3/>}
              </div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Other Events</h3>
                {EVENTS.filter(e=>e.id!==event.id).map(e=>(
                  <div key={e.id} className="ann-aside-card"
                    onClick={()=>navigate(`/events/${e.id}/register`)}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <div className="ev-list-item__datebox"
                        style={{background:"#EDE9FE",width:36,height:36}}>
                        <span style={{fontSize:8,fontWeight:700,color:"#7C3AED"}}>{e.month}</span>
                        <span style={{fontSize:13,fontWeight:700,color:"#1E1B4B"}}>{e.date}</span>
                      </div>
                      <span className="ann-aside-card__cat">{e.category}</span>
                    </div>
                    <div className="ann-aside-card__title">{e.title}</div>
                    <div className="ann-aside-card__meta">{e.time} · {e.venue}</div>
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
   EVENT REGISTERED — success page
   ════════════════════════════════════════════════════════════ */
export const EventRegisteredPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === Number(id)) ?? EVENTS[0];
  const otherEvents = EVENTS.filter(e => e.id !== event.id).slice(0, 2);

  const SuccessContent = () => (
    <div className="ev-success-page">
      {/* Illustration with confetti dots */}
      <div className="ev-success-illustration">
        <span className="ev-conf ev-conf--a" />
        <span className="ev-conf ev-conf--b" />
        <span className="ev-conf ev-conf--c" />
        <span className="ev-conf ev-conf--d" />
        <span className="ev-conf ev-conf--e" />
        <span className="ev-conf ev-conf--f" />
        <span className="ev-conf ev-conf--g" />
        <span className="ev-conf ev-conf--h" />
        <div className="ev-success-outer-circle">
          <div className="ev-success-inner-circle">
            <Check size={36} color="#fff" strokeWidth={2.5}/>
          </div>
        </div>
      </div>

      <div className="ev-success-text">
        <h1 className="ev-success-title">You're registered!</h1>
        <p className="ev-success-sub">
          See you at the event. A confirmation has been sent to your email.
        </p>
      </div>

      <EventTicket event={event} fullName="Aymakhan Balausa"
        role="Student" attendance="In person" showQR={true}/>

      <div className="ev-success-others">
        <p className="ev-success-others__title">Other upcoming events</p>
        <div className="ev-success-others__grid">
          {otherEvents.map(e => (
            <div key={e.id} className="ev-success-other-card"
              onClick={()=>navigate(`/events/${e.id}/register`)}>
              <span className="ev-success-other-card__date">{e.month} {e.date}</span>
              <div className="ev-success-other-card__title">{e.title}</div>
              <div className="ev-success-other-card__venue">{e.venue}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="ev-success-cta" onClick={()=>navigate("/events")}>
        Back to Events
      </button>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{flexDirection:"column",height:"100vh",overflow:"hidden"}}>
        <div style={{flex:1,overflowY:"auto"}}><SuccessContent/></div>
      </div>
      <div className="home-desktop" style={{flex:1}}>
        <Sidebar activeNav="events" setActiveNav={()=>{}}/>
        <div className="home-main" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{maxWidth:480,width:"100%"}}><SuccessContent/></div>
        </div>
      </div>
    </div>
  );
};