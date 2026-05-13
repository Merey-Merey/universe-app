/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Building2,
  Home, BriefcaseBusiness, Calendar, User, LogOut,
  Search, Bell, MapPin, MoreVertical, Phone,
} from "lucide-react";

/* ─── Types & Data ───────────────────────────────────────── */
export interface HousingItem {
  id: number;
  name: string;
  address: string;
  price: string;
  priceShort: string;
  rooms: string;
  area: string;
  floor: string;
  amenities: string[];
  about: string;
  available: boolean;
  owner: {
    name: string;
    initials: string;
    role: string;
    phone: string;
    whatsapp: string;
    telegram: string;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export const HOUSING: HousingItem[] = [
  {
    id: 1,
    name: "Studio near SKSU",
    address: "Al-Farabi St, Shymkent",
    price: "₸60,000",
    priceShort: "₸60k",
    rooms: "1 room",
    area: "32 m²",
    floor: "3rd floor",
    amenities: ["Wi-Fi", "Furnished", "Bills incl.", "Parking"],
    about: "Cozy fully furnished studio, 5 min walk from SKSU. Quiet neighborhood, all utilities included. Perfect for students.",
    available: true,
    owner: { name: "Aiman Bekova", initials: "AB", role: "Private landlord", phone: "+7 701 234 5678", whatsapp: "+7 701 234 5678", telegram: "@aiman_bekova" },
  },
  {
    id: 2,
    name: "2-room apt, city center",
    address: "Tauke Khan Ave, Shymkent",
    price: "₸120,000",
    priceShort: "₸120k",
    rooms: "2 rooms",
    area: "54 m²",
    floor: "5th floor",
    amenities: ["Wi-Fi", "Pets OK", "Elevator", "Security"],
    about: "Spacious 2-room apartment in the heart of Shymkent. Modern renovation, new appliances, close to all amenities.",
    available: true,
    owner: { name: "Daniyar Seitkali", initials: "DS", role: "Agency representative", phone: "+7 702 345 6789", whatsapp: "+7 702 345 6789", telegram: "@daniyar_s" },
  },
  {
    id: 3,
    name: "Room in shared flat",
    address: "Zhibek Zholy St, Shymkent",
    price: "₸35,000",
    priceShort: "₸35k",
    rooms: "Shared",
    area: "18 m²",
    floor: "2nd floor",
    amenities: ["Wi-Fi", "Furnished", "Kitchen"],
    about: "Affordable private room in a friendly shared apartment. Great for students who want company and low costs.",
    available: true,
    owner: { name: "Aliya Nurova", initials: "AN", role: "Private landlord", phone: "+7 705 456 7890", whatsapp: "+7 705 456 7890", telegram: "@aliya_nur" },
  },
  {
    id: 4,
    name: "1-room near UniVerse",
    address: "Ryskulov Ave, Shymkent",
    price: "₸75,000",
    priceShort: "₸75k",
    rooms: "1 room",
    area: "38 m²",
    floor: "1st floor",
    amenities: ["Wi-Fi", "Bills incl.", "Quiet area"],
    about: "Neat 1-room apartment just 3 minutes from UniVerse campus. Ideal for focused students who need a quiet space.",
    available: false,
    owner: { name: "Marat Akhmetov", initials: "MA", role: "Private landlord", phone: "+7 707 567 8901", whatsapp: "+7 707 567 8901", telegram: "@marat_a" },
  },
];

/* ─── Nav ────────────────────────────────────────────────── */
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
   HOUSING LIST PAGE
   ════════════════════════════════════════════════════════════ */
export const HousingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("housing");
  const [search, setSearch] = useState("");

  const filtered = HOUSING.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  );

  const CardList = () => (
    <div className="ann-list">
      {filtered.map(h => (
        <div key={h.id} className="ann-list-card"
          onClick={() => navigate(`/housing/${h.id}`)}>
          <div className="ann-list-card__left">
            <span className="ann-list-card__cat" style={{ marginBottom: 6 }}>
              <Building2 size={13} /> {h.rooms}
            </span>
            <div className="ann-list-card__title">{h.name}</div>
            <div className="ann-list-card__meta">
              <MapPin size={11} color="#A09DC5" style={{ display: "inline", marginRight: 3 }} />
              {h.address}
            </div>
          </div>
          <div className="ann-list-card__right">
            <div className="ann-list-card__amount" style={{ color: "#A78BFA" }}>{h.price}</div>
            <div className="ann-list-card__deadline">
              <span className="ann-list-card__dl-label">Status</span>
              <span className="ann-list-card__dl-val">{h.available ? "Available" : "Taken"}</span>
            </div>
            <ArrowRight size={16} color="#A78BFA" />
          </div>
        </div>
      ))}
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
          <span className="ann-page-title">Housing</span>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ padding: "0 16px 12px" }}>
          <div className="ann-search-bar">
            <Search size={15} color="#A09DC5" />
            <input className="ann-search-input" placeholder="Search housing..."
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

      {/* DESKTOP */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <h1 style={{ marginTop: 8 }}>Housing</h1>
              <p>Browse available student housing</p>
            </div>
            <div className="home-topbar__right">
              <div className="home-topbar__search">
                <Search size={15} color="#A09DC5" />
                <input className="ann-search-input" placeholder="Search housing..."
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
              {filtered.map(h => (
                <div key={h.id} className="ann-desk-card"
                  onClick={() => navigate(`/housing/${h.id}`)}>
                  <div className="ann-desk-card__top">
                    <span className="ann-desk-card__cat">
                      <Building2 size={13} /> {h.rooms}
                    </span>
                    <span className="ann-desk-card__amount" style={{ color: "#A78BFA" }}>{h.price}/mo</span>
                  </div>
                  <div className="ann-desk-card__title">{h.name}</div>
                  <div className="ann-desk-card__meta">{h.address}</div>
                  <div className="ann-desk-card__footer">
                    <div className="ann-desk-card__dl">
                      <span className="ann-desk-card__dl-label">Details</span>
                      <span className="ann-desk-card__dl-val">{h.area} · {h.floor}</span>
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
   HOUSING DETAIL PAGE
   ════════════════════════════════════════════════════════════ */
export const HousingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeNav, setActiveNav] = useState("housing");
  const [imgIdx, setImgIdx] = useState(0);

  const h = HOUSING.find(x => x.id === Number(id)) ?? HOUSING[0];

  /* placeholder gradient images for the carousel */
  const imgColors = ["#C4B5FD", "#A78BFA", "#7C3AED", "#5B21B6"];

  const DetailContent = () => (
    <div className="hd-detail-body">

      {/* Photo carousel */}
      <div className="hd-carousel">
        <div className="hd-carousel__img" style={{ background: `linear-gradient(135deg, ${imgColors[imgIdx]}44, ${imgColors[imgIdx]}99)` }}>
          <div className="hd-carousel__placeholder">
            <Building2 size={64} color={imgColors[imgIdx]} strokeWidth={1} />
          </div>
        </div>
        {/* nav controls */}
        <button className="hd-carousel__back ann-back-btn" onClick={() => navigate(-1)}
          style={{ position: "absolute", top: 12, left: 16, zIndex: 10 }}>
          <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
        </button>
        <button className="hd-carousel__more ann-back-btn" style={{ position: "absolute", top: 12, right: 16, zIndex: 10 }}>
          <MoreVertical size={18} color="#1E1B4B" />
        </button>
        {/* dots */}
        <div className="hd-carousel__dots">
          {imgColors.map((_, i) => (
            <button key={i}
              className={`hd-dot ${i === imgIdx ? "hd-dot--active" : ""}`}
              onClick={() => setImgIdx(i)} />
          ))}
        </div>
        {/* available badge */}
        {h.available && (
          <span className="hd-available-badge">· Available</span>
        )}
      </div>

      {/* Title + price */}
      <div className="hd-title-row">
        <div>
          <h2 className="hd-title">{h.name}</h2>
          <div className="hd-address">
            <MapPin size={14} color="#A09DC5" strokeWidth={1.5} />
            <span>{h.address}</span>
          </div>
        </div>
        <div className="hd-price">
          {h.price}<span className="hd-price__per"> /mo</span>
        </div>
      </div>

      {/* Stats chips */}
      <div className="hd-stats-row">
        <div className="hd-stat-chip">
          <span className="hd-stat-icon">🛏</span>
          <span className="hd-stat-label">{h.rooms}</span>
        </div>
        <div className="hd-stat-chip">
          <span className="hd-stat-icon">📐</span>
          <span className="hd-stat-label">{h.area}</span>
        </div>
        <div className="hd-stat-chip">
          <span className="hd-stat-icon">🏢</span>
          <span className="hd-stat-label">{h.floor}</span>
        </div>
      </div>

      {/* Amenities */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Amenities</h3>
        <div className="job-skills-row">
          {h.amenities.map(a => (
            <span key={a} className="hd-amenity-tag">{a}</span>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">About</h3>
        <p className="ann-detail-section__text">{h.about}</p>
      </div>

      {/* Owner */}
      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Owner</h3>
        <div className="hd-owner-row">
          <div className="hd-owner-avatar">{h.owner.initials}</div>
          <div className="hd-owner-info">
            <div className="hd-owner-name">{h.owner.name}</div>
            <div className="hd-owner-role">{h.owner.role}</div>
          </div>
          <div className="hd-owner-socials">
            {/* WhatsApp */}
            <button className="hd-social-btn hd-social-btn--wa">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#25D366"/>
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.7 9 9 7.1 8.7 6.6c-.3-.4-.6-.4-.8-.4H7.6c-.2 0-.5.1-.8.4C6.5 6.9 5.7 7.7 5.7 9.4s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 3.4 1.4 3.4 1 4 .9.6-.1 1.8-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.6-.3z" fill="#fff"/>
              </svg>
            </button>
            {/* Telegram */}
            <button className="hd-social-btn hd-social-btn--tg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#2AABEE"/>
                <path d="M17.9 6.6L5.4 11.3c-.8.3-.8.8-.1 1l3.2 1 1.2 3.7c.1.4.3.5.6.5.3 0 .4-.1.6-.3l1.5-1.5 3.1 2.3c.6.3 1 .1 1.1-.5l2-9.5c.2-.8-.3-1.2-.8-.9zm-9.1 6.1l6.4-4c.3-.2.6 0 .4.3L9.9 14l-.3 2.5-1.8-3.8z" fill="#fff"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button className="ann-detail-cta" onClick={() => navigate(`/housing/${h.id}/contact`)}>
        Contact owner
      </button>
    </div>
  );

  return (
    <div className="home-screen">
      {/* MOBILE */}
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="home-content" style={{ padding: "0 0 32px" }}>
          <DetailContent />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back to Housing
              </button>
              <h1 style={{ marginTop: 8 }}>Housing Detail</h1>
              <p>Full information about the listing</p>
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
                <h3 className="ann-detail-desk-aside__title">Other Listings</h3>
                {HOUSING.filter(x => x.id !== h.id).map(x => (
                  <div key={x.id} className="ann-aside-card"
                    onClick={() => navigate(`/housing/${x.id}`)}>
                    <span className="ann-aside-card__cat">
                      <Building2 size={11} /> {x.rooms}
                    </span>
                    <div className="ann-aside-card__title">{x.name}</div>
                    <div className="ann-aside-card__meta">{x.address} · {x.price}/mo</div>
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
   CONTACT OWNER PAGE
   ════════════════════════════════════════════════════════════ */
export const ContactOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const h = HOUSING.find(x => x.id === Number(id)) ?? HOUSING[0];

  const [message, setMessage] = useState("");
  const quickMessages = ["Is it still available?", "I'd like to visit", "Schedule a call"];

  const Content = () => (
    <div className="contact-body">

      {/* Owner header */}
      <div className="contact-owner-header">
        <div className="hd-owner-avatar contact-owner-avatar">{h.owner.initials}</div>
        <div>
          <div className="contact-owner-name">{h.owner.name}</div>
          <div className="contact-owner-role">{h.owner.role} · Online</div>
        </div>
      </div>

      <div className="contact-divider" />

      {/* Property info */}
      <div className="contact-section">
        <div className="contact-section__label">PROPERTY</div>
        <div className="contact-prop-row">
          <div>
            <div className="contact-prop-name">{h.name}</div>
            <div className="contact-prop-addr">{h.address}</div>
          </div>
          <div className="contact-prop-price">{h.priceShort}<span style={{ fontSize: 14, fontWeight: 500, color: "#A78BFA" }}>/mo</span></div>
        </div>
      </div>

      <div className="contact-divider" />

      {/* Reach out */}
      <div className="contact-section">
        <div className="contact-section__label">REACH OUT VIA</div>
        <div className="contact-channels">
          {/* Phone */}
          <div className="contact-channel-row">
            <div className="contact-channel-icon contact-channel-icon--phone">
              <Phone size={18} color="#fff" />
            </div>
            <div className="contact-channel-info">
              <div className="contact-channel-name">Phone</div>
              <div className="contact-channel-sub">{h.owner.phone}</div>
            </div>
            <button className="contact-channel-action">Call</button>
          </div>
          {/* WhatsApp */}
          <div className="contact-channel-row">
            <div className="contact-channel-icon contact-channel-icon--wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#25D366"/>
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.7 9 9 7.1 8.7 6.6c-.3-.4-.6-.4-.8-.4H7.6c-.2 0-.5.1-.8.4C6.5 6.9 5.7 7.7 5.7 9.4s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 3.4 1.4 3.4 1 4 .9.6-.1 1.8-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.6-.3z" fill="#fff"/>
              </svg>
            </div>
            <div className="contact-channel-info">
              <div className="contact-channel-name">WhatsApp</div>
              <div className="contact-channel-sub">{h.owner.whatsapp}</div>
            </div>
            <button className="contact-channel-action">Open</button>
          </div>
          {/* Telegram */}
          <div className="contact-channel-row">
            <div className="contact-channel-icon contact-channel-icon--tg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#2AABEE"/>
                <path d="M17.9 6.6L5.4 11.3c-.8.3-.8.8-.1 1l3.2 1 1.2 3.7c.1.4.3.5.6.5.3 0 .4-.1.6-.3l1.5-1.5 3.1 2.3c.6.3 1 .1 1.1-.5l2-9.5c.2-.8-.3-1.2-.8-.9zm-9.1 6.1l6.4-4c.3-.2.6 0 .4.3L9.9 14l-.3 2.5-1.8-3.8z" fill="#fff"/>
              </svg>
            </div>
            <div className="contact-channel-info">
              <div className="contact-channel-name">Telegram</div>
              <div className="contact-channel-sub">{h.owner.telegram}</div>
            </div>
            <button className="contact-channel-action">Open</button>
          </div>
        </div>
      </div>

      <div className="contact-divider" />

      {/* Message */}
      <div className="contact-section">
        <div className="contact-section__label">MESSAGE</div>
        {/* Quick messages */}
        <div className="contact-quick-msgs">
          {quickMessages.map(q => (
            <button key={q}
              className={`contact-quick-btn ${message === q ? "contact-quick-btn--active" : ""}`}
              onClick={() => setMessage(message === q ? "" : q)}>
              {q}
            </button>
          ))}
        </div>
        {/* Text input */}
        <input
          className="apply-input"
          placeholder="Write a message........."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ marginTop: 8 }}
        />
      </div>

      <button className="apply-submit-btn">Send message</button>
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
          <span className="ann-page-title">Contact owner</span>
          <div style={{ width: 40 }} />
        </div>
        <div className="home-content" style={{ padding: "0 16px 32px" }}>
          <Content />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="home-desktop" style={{ flex: 1 }}>
        <div className="apply-desk-wrapper">
          <div className="apply-desk-card">
            <button className="ann-desk-back" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
              <ArrowLeft size={16} /> Back to Listing
            </button>
            <h1 className="apply-desk-title">Contact owner</h1>
            <p className="apply-desk-sub">Reach out to the landlord directly</p>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};