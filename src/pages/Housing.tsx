/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/static-components */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import {
  ArrowLeft,
  Building2,
  Home,
  BriefcaseBusiness,
  Calendar,
  User,
  LogOut,
  Search,
  Navigation,
  MoreVertical,
  Phone,
  SlidersHorizontal,
  Map as MapIcon,
  X,
} from "lucide-react";


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
  lat: number;
  lng: number;
  owner: {
    name: string;
    initials: string;
    role: string;
    phone: string;
    whatsapp: string;
    telegram: string;
  };
}

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
    lat: 42.3417, lng: 69.5901,
    owner: { name: "Aiman Bekova", initials: "AB", role: "Private landlord", phone: "+7 701 234 5678", whatsapp: "+7 701 234 5678", telegram: "@aiman_bekova" },
  },
  {
    id: 2,
    name: "2-room apartment near YUFU",
    address: "Tauke Khan Ave, Shymkent",
    price: "₸120,000",
    priceShort: "₸120k",
    rooms: "2 rooms",
    area: "54 m²",
    floor: "5th floor",
    amenities: ["Wi-Fi", "Parking", "Elevator", "Security"],
    about: "Spacious 2-room apartment in the heart of Shymkent. Modern renovation, new appliances, close to all amenities.",
    available: true,
    lat: 42.32, lng: 69.587,
    owner: { name: "Daniyar Seitkali", initials: "DS", role: "Agency representative", phone: "+7 702 345 6789", whatsapp: "+7 702 345 6789", telegram: "@daniyar_s" },
  },
  {
    id: 3,
    name: "Cozy room in shared flat",
    address: "Abay St, Shymkent",
    price: "₸45,000",
    priceShort: "₸45k",
    rooms: "1 room",
    area: "18 m²",
    floor: "2nd floor",
    amenities: ["Wi-Fi", "Bills included", "Mixed"],
    about: "Affordable private room in a friendly shared apartment. Great for students who want company and low costs.",
    available: true,
    lat: 42.31, lng: 69.562,
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
    lat: 42.33, lng: 69.61,
    owner: { name: "Marat Akhmetov", initials: "MA", role: "Private landlord", phone: "+7 707 567 8901", whatsapp: "+7 707 567 8901", telegram: "@marat_a" },
  },
];

const MAPS_API_KEY = "AIzaSyBzUgMKVaukYN8HxKW-3j1slIIBvTzgS1U";
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID as string | undefined;
const DEFAULT_CENTER = { lat: 42.3267, lng: 69.5901 };
const DEFAULT_ZOOM = 13;


const navItems = [
  { id: "home",    label: "Home",    icon: <Home size={22} /> },
  { id: "jobs",    label: "Jobs",    icon: <BriefcaseBusiness size={22} /> },
  { id: "housing", label: "Housing", icon: <Building2 size={22} /> },
  { id: "events",  label: "Events",  icon: <Calendar size={22} /> },
  { id: "profile", label: "Profile", icon: <User size={22} /> },
];


const Sidebar: React.FC<{ activeNav: string; setActiveNav: (v: string) => void }> = ({ activeNav, setActiveNav }) => {
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

      {/* {item.id === "home" && (
        <span className="home-sidebar__item-badge">3</span>
      )} */}
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
        <button className="home-sidebar__item" style={{ marginTop: 4, color: "rgba(255,255,255,0.4)" }} onClick={() => navigate("/login")}>
          <LogOut size={20} /> Log out
        </button>
      </div>
    </aside>
  );
};

const ArrowRight = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);


const LocateButton: React.FC<{ bottomOffset: number; userPos: { lat: number; lng: number } | null; onLocate: (pos: { lat: number; lng: number }) => void }> = ({ bottomOffset, onLocate }) => {
  const map = useMap();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) { setError("Not supported"); return; }
    setLoading(true); setError(null);
    navigator.geolocation.getCurrentPosition(
      pos => { const l = { lat: pos.coords.latitude, lng: pos.coords.longitude }; onLocate(l); map?.panTo(l); map?.setZoom(15); setLoading(false); },
      () => { setError("Failed"); setLoading(false); },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [map, onLocate]);
  return (
    <button className="hmap-locate-btn" style={{ bottom: bottomOffset }} onClick={handleLocate}>
      <Navigation size={18} color={loading ? "#A09DC5" : error ? "#D85A30" : "#462370"} />
    </button>
  );
};


const SearchDropdown: React.FC<{ items: HousingItem[]; onSelect: (h: HousingItem) => void }> = ({ items, onSelect }) => (
  <div className="hmap-search-dropdown">
    {items.map(h => (
      <button key={h.id} className="hmap-search-dropdown-item" onClick={() => onSelect(h)}>
        <Search size={13} color="#A09DC5" />
        <div>
          <div className="hmap-search-dropdown-name">{h.name}</div>
          <div className="hmap-search-dropdown-addr">{h.address}</div>
        </div>
      </button>
    ))}
  </div>
);


export const HousingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("housing");
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (showSearch) setTimeout(() => searchRef.current?.focus(), 50); }, [showSearch]);

  const suggestions = HOUSING.filter(h =>
    searchVal.length > 0 && (h.name.toLowerCase().includes(searchVal.toLowerCase()) || h.address.toLowerCase().includes(searchVal.toLowerCase()))
  );
  const filtered = HOUSING.filter(h => !searchVal || h.name.toLowerCase().includes(searchVal.toLowerCase()) || h.address.toLowerCase().includes(searchVal.toLowerCase()));

  return (
    <div className="home-screen">
      {}
      <div className="home-mobile" style={{ height: "100vh", overflow: "hidden" }}>
        <div className="hmap-container">
          <APIProvider apiKey={MAPS_API_KEY}>
            <Map defaultCenter={DEFAULT_CENTER} defaultZoom={DEFAULT_ZOOM} mapId={MAP_ID}
              style={{ width: "100%", height: "100%" }} gestureHandling="greedy" disableDefaultUI>
              {HOUSING.map(h => (
                <AdvancedMarker key={h.id} position={{ lat: h.lat, lng: h.lng }} onClick={() => { setSelectedId(h.id); setShowList(true); }}>
                  <Pin background={selectedId === h.id ? "#462370" : h.available ? "#A78BFA" : "#888780"}
                    borderColor={selectedId === h.id ? "#1E1B4B" : h.available ? "#7C3AED" : "#5F5E5A"}
                    glyphColor="#fff" scale={selectedId === h.id ? 1.25 : 1}>
                    <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", whiteSpace: "nowrap" }}>{h.priceShort}</span>
                  </Pin>
                </AdvancedMarker>
              ))}
              {userPos && (
                <AdvancedMarker position={userPos}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#462370", border: "2px solid #fff", boxShadow: "0 0 0 5px rgba(70,35,112,.22)" }} />
                </AdvancedMarker>
              )}
              <LocateButton bottomOffset={showList ? 340 : 90} userPos={userPos} onLocate={setUserPos} />
            </Map>
          </APIProvider>

          {}
          <div className="hmap-controls">
            <div className={`hmap-search-wrap ${showSearch ? "hmap-search-wrap--open" : ""}`}>
              {showSearch && (
                <div style={{ position: "relative" }}>
                  <div className="hmap-search-bar">
                    <Search size={15} color="#462370" />
                    <input ref={searchRef} className="hmap-search-input" placeholder="Search location..."
                      value={searchVal}
                      onChange={e => { setSearchVal(e.target.value); setShowDropdown(e.target.value.length > 0); }} />
                    <button onClick={() => { setShowSearch(false); setSearchVal(""); setShowDropdown(false); }}>
                      <X size={14} color="#462370" />
                    </button>
                  </div>
                  {showDropdown && suggestions.length > 0 && (
                    <SearchDropdown items={suggestions} onSelect={h => { setSearchVal(h.name); setShowDropdown(false); navigate(`/housing/${h.id}`); }} />
                  )}
                </div>
              )}
            </div>
            <div className="hmap-btns">
              <button className="hmap-btn" onClick={() => { setShowSearch(v => !v); setShowDropdown(false); }}>
                <Search size={20} color="#462370" />
              </button>
              <div className="hmap-toggle">
                <button className={`hmap-toggle-btn hmap-toggle-btn--map ${!showList ? "hmap-toggle-btn--active" : ""}`} onClick={() => setShowList(false)}>
                  <MapIcon size={20} color={!showList ? "#fff" : "#462370"} />
                </button>
                {}
                <button className="hmap-toggle-btn" onClick={() => navigate("/housing/filter")}>
                  <SlidersHorizontal size={20} color="#462370" />
                </button>
              </div>
            </div>
          </div>

          {}
          <div className={`hmap-sheet ${showList ? "hmap-sheet--open" : ""}`}>
            <div className="hmap-sheet-handle" />
            <div className="hmap-sheet-header">
              <span className="hmap-sheet-count"><span style={{ color: "#A78BFA" }}>{filtered.length}</span> places nearby</span>
            </div>
            <div className="hmap-sheet-list">
              {filtered.map(h => (
                <div key={h.id} className={`hmap-card ${selectedId === h.id ? "hmap-card--selected" : ""}`} onClick={() => navigate(`/housing/${h.id}`)}>
                  <div className="hmap-card__top">
                    <div>
                      <div className="hmap-card__name">{h.name}</div>
                      <div className="hmap-card__addr">{h.address}</div>
                    </div>
                    <div className="hmap-card__price">{h.price}<span>/mo</span></div>
                  </div>
                  <div className="hmap-card__chips">
                    {h.amenities.slice(0, 3).map(a => <span key={a} className="hmap-chip">{a}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <button className="hmap-close-btn" onClick={() => setShowList(false)}>Close</button>
          </div>

          {}
          <div className="home-navbar hmap-navbar">
            {navItems.map(item => (
              <button key={item.id}
                className={`home-nav-item ${activeNav === item.id ? "home-nav-item--active" : "home-nav-item--inactive"}`}
                onClick={() => { setActiveNav(item.id); if (item.id === "home") navigate("/home"); else if (item.id === "jobs") navigate("/jobs"); }}>
                {item.icon}
                <span className={`home-nav-label ${activeNav === item.id ? "home-nav-label--show" : "home-nav-label--hide"}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting"><h1>Housing</h1><p>Browse available student housing</p></div>
            <div className="home-topbar__right">
              <div className="home-topbar__search" style={{ position: "relative" }}>
                <Search size={15} color="#A09DC5" />
                <input className="ann-search-input" placeholder="Search housing..." value={searchVal}
                  onChange={e => { setSearchVal(e.target.value); setShowDropdown(e.target.value.length > 0); }}
                  style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#1E1B4B", fontFamily: "Space Grotesk, sans-serif", width: "100%" }} />
                {showDropdown && suggestions.length > 0 && (
                  <div className="hmap-search-dropdown hmap-search-dropdown--desk">
                    <SearchDropdown items={suggestions} onSelect={h => { setSearchVal(h.name); setShowDropdown(false); navigate(`/housing/${h.id}`); }} />
                  </div>
                )}
              </div>
              <button className="home-topbar__filter-btn" onClick={() => navigate("/housing/filter")}>
                <SlidersHorizontal size={16} color="#462370" />
              </button>
            </div>
          </div>
          <div className="home-content" style={{ overflowY: "auto" }}>
            <div className="ann-desk-grid">
              {filtered.map(h => (
                <div key={h.id} className="ann-desk-card" onClick={() => navigate(`/housing/${h.id}`)}>
                  <div className="ann-desk-card__top">
                    <span className="ann-desk-card__cat"><Building2 size={13} /> {h.rooms}</span>
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


export const HousingFilterPage: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Shymkent, Kazakhstan");
  const [minPrice, setMinPrice] = useState(100000);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [period, setPeriod] = useState("Per month");
  const [rooms, setRooms] = useState("2-3 rooms");
  const [amenities, setAmenities] = useState<Record<string, boolean>>({
    "Wi-Fi": true, "Furnished": false, "Parking": true, "Bills included": false, "Pet friendly": true,
  });
  const [distance, setDistance] = useState("10-15 min");
  const [dwelling, setDwelling] = useState("");
  const [showDwelling, setShowDwelling] = useState(false);
  const dwellingOptions = ["SKSU", "UniVerse", "YUFU", "SDU", "Other"];

  const handleReset = () => {
    setLocation("Shymkent, Kazakhstan"); setMinPrice(100000); setMaxPrice(300000);
    setPeriod("Per month"); setRooms("2-3 rooms");
    setAmenities({ "Wi-Fi": false, "Furnished": false, "Parking": false, "Bills included": false, "Pet friendly": false });
    setDistance(""); setDwelling("");
  };

  const Content = () => (
    <div className="hf-body">
      <div className="hf-section">
        <h3 className="hf-section-title">Location</h3>
        <input className="hf-input" value={location} onChange={e => setLocation(e.target.value)} placeholder="Shymkent, Kazakhstan" />
      </div>

      <div className="hf-section">
        <h3 className="hf-section-title">Min price / Max price, ₸</h3>
        <div className="hf-range-wrap">
          <div className="hf-range-track">
            <div className="hf-range-fill" style={{ left: `${(minPrice / 500000) * 100}%`, right: `${100 - (maxPrice / 500000) * 100}%` }} />
            <input type="range" className="hf-range" min={0} max={500000} step={10000} value={minPrice} onChange={e => setMinPrice(+e.target.value)} />
            <input type="range" className="hf-range" min={0} max={500000} step={10000} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} />
          </div>
        </div>
        <div className="hf-price-boxes">
          <div className="hf-price-box"><span className="hf-price-box__label">From</span><span className="hf-price-box__val">₸{minPrice.toLocaleString()}</span></div>
          <div className="hf-price-box"><span className="hf-price-box__label">To</span><span className="hf-price-box__val">₸{maxPrice.toLocaleString()}</span></div>
        </div>
        <div className="hf-radio-row">
          {["Per hour", "Per month", "Per shift"].map(p => (
            <button key={p} className={`hf-radio-btn ${period === p ? "hf-radio-btn--active" : ""}`} onClick={() => setPeriod(p)}>
              <span className={`hf-radio-dot ${period === p ? "hf-radio-dot--active" : ""}`} />{p}
            </button>
          ))}
        </div>
      </div>

      <div className="hf-section">
        <h3 className="hf-section-title">Rooms</h3>
        <div className="hf-radio-row">
          {["Studio", "1 room", "2-3 rooms", "4+ rooms"].map(r => (
            <button key={r} className={`hf-radio-btn ${rooms === r ? "hf-radio-btn--active" : ""}`} onClick={() => setRooms(r)}>
              <span className={`hf-radio-dot ${rooms === r ? "hf-radio-dot--active" : ""}`} />{r}
            </button>
          ))}
        </div>
      </div>

      <div className="hf-section">
        <h3 className="hf-section-title">Amenities</h3>
        <div className="hf-amenities-box">
          {Object.entries(amenities).map(([key, val], i, arr) => (
            <React.Fragment key={key}>
              <div className="hf-amenity-row">
                <span className="hf-amenity-label">{key}</span>
                <button className={`hf-toggle ${val ? "hf-toggle--on" : ""}`} onClick={() => setAmenities(prev => ({ ...prev, [key]: !prev[key] }))}>
                  <span className="hf-toggle-thumb" />
                </button>
              </div>
              {i < arr.length - 1 && <div className="hf-amenity-divider" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="hf-section">
        <h3 className="hf-section-title">Distance to University</h3>
        <div className="hf-dropdown" onClick={() => setShowDwelling(v => !v)}>
          <span className="hf-dropdown__val">{dwelling || "Choose your dwelling"}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E1B4B" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        </div>
        {showDwelling && (
          <div className="hf-dropdown-list">
            {dwellingOptions.map(d => (
              <button key={d} className="hf-dropdown-option" onClick={() => { setDwelling(d); setShowDwelling(false); }}>{d}</button>
            ))}
          </div>
        )}
        <div className="hf-amenities-box" style={{ marginTop: 12 }}>
          {["5 min", "10-15 min", "15-30 min", "40 min", "Any"].map((d, i, arr) => (
            <React.Fragment key={d}>
              <div className="hf-amenity-row">
                <span className="hf-amenity-label">{d}</span>
                <button className={`hf-circle-radio ${distance === d ? "hf-circle-radio--active" : ""}`} onClick={() => setDistance(d)}>
                  {distance === d && <span className="hf-circle-radio-fill" />}
                </button>
              </div>
              {i < arr.length - 1 && <div className="hf-amenity-divider" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="hf-cta-row">
        <button className="hf-reset-btn" onClick={handleReset}>Reset</button>
        <button className="hf-apply-btn" onClick={() => navigate("/housing/results")}>Find</button>
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
          <span className="ann-page-title">Housing Filter</span>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}>
          <Content />
        </div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav="housing" setActiveNav={() => {}} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back to Housing</button>
              <h1 style={{ marginTop: 8 }}>Housing Filter</h1>
              <p>Narrow down your search</p>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div className="home-content"><div style={{ maxWidth: 560 }}><Content /></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const HousingResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("housing");
  const [searchVal, setSearchVal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = HOUSING.filter(h =>
    searchVal.length > 0 && (h.name.toLowerCase().includes(searchVal.toLowerCase()) || h.address.toLowerCase().includes(searchVal.toLowerCase()))
  );
  const results = HOUSING.filter(h =>
    !searchVal || h.name.toLowerCase().includes(searchVal.toLowerCase()) || h.address.toLowerCase().includes(searchVal.toLowerCase())
  );

  const Content = () => (
    <div className="hresult-page">
      {}
      <div className="hresult-search-wrap">
        <div className="hresult-search-bar">
          <Search size={16} color="#A09DC5" />
          <input
            className="hresult-search-input"
            placeholder="Search housing..."
            value={searchVal}
            onChange={e => { setSearchVal(e.target.value); setShowDropdown(e.target.value.length > 0); }}
          />
          {searchVal && <button onClick={() => { setSearchVal(""); setShowDropdown(false); }}><X size={14} color="#A09DC5" /></button>}
        </div>
        {showDropdown && suggestions.length > 0 && (
          <div className="hresult-dropdown">
            {suggestions.map(h => (
              <button key={h.id} className="hmap-search-dropdown-item" onClick={() => { setSearchVal(h.name); setShowDropdown(false); navigate(`/housing/${h.id}`); }}>
                <Search size={13} color="#A09DC5" />
                <div>
                  <div className="hmap-search-dropdown-name">{h.name}</div>
                  <div className="hmap-search-dropdown-addr">{h.address}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hresult-header">
        <span className="hresult-count"><span style={{ color: "#A78BFA" }}>{results.length}</span> places nearby</span>
      </div>

      <div className="hresult-list">
        {results.map(h => (
          <div key={h.id} className="hresult-card" onClick={() => navigate(`/housing/${h.id}`)}
            style={{ background: h.available ? "#F8F7FF" : "#fff" }}>
            <div className="hresult-card__top">
              <div className="hresult-card__left">
                <div className="hresult-card__name">{h.name}</div>
                <div className="hresult-card__addr">{h.address}</div>
              </div>
              <div className="hresult-card__price">{h.price}<span>/mo</span></div>
            </div>
            <div className="hresult-card__chips">
              {h.amenities.slice(0, 3).map(a => <span key={a} className="hmap-chip">{a}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Content />
        </div>
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
        {}
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back to Filter</button>
              <h1 style={{ marginTop: 8 }}>Search Results</h1>
              <p>{results.length} places found</p>
            </div>
            <div className="home-topbar__right" style={{ position: "relative" }}>
              <div className="home-topbar__search">
                <Search size={15} color="#A09DC5" />
                <input className="ann-search-input" placeholder="Search..." value={searchVal}
                  onChange={e => { setSearchVal(e.target.value); setShowDropdown(e.target.value.length > 0); }}
                  style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#1E1B4B", fontFamily: "Space Grotesk, sans-serif", width: "100%" }} />
              </div>
              {showDropdown && suggestions.length > 0 && (
                <div className="hmap-search-dropdown hmap-search-dropdown--desk">
                  {suggestions.map(h => (
                    <button key={h.id} className="hmap-search-dropdown-item" onClick={() => { setSearchVal(h.name); setShowDropdown(false); navigate(`/housing/${h.id}`); }}>
                      <Search size={13} color="#A09DC5" />
                      <div>
                        <div className="hmap-search-dropdown-name">{h.name}</div>
                        <div className="hmap-search-dropdown-addr">{h.address}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="home-content" style={{ overflowY: "auto" }}>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};


export const HousingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeNav, setActiveNav] = useState("housing");
  const [imgIdx, setImgIdx] = useState(0);
  const h = HOUSING.find(x => x.id === Number(id)) ?? HOUSING[0];
  const imgColors = ["#C4B5FD", "#A78BFA", "#7C3AED", "#5B21B6"];

  const DetailContent = () => (
    <div className="hd-detail-body">
      <div className="hd-carousel">
        <div className="hd-carousel__img" style={{ background: `linear-gradient(135deg, ${imgColors[imgIdx]}44, ${imgColors[imgIdx]}99)` }}>
          <div className="hd-carousel__placeholder"><Building2 size={64} color={imgColors[imgIdx]} strokeWidth={1} /></div>
        </div>
        <button className="hd-carousel__back ann-back-btn" onClick={() => navigate(-1)} style={{ position: "absolute", top: 12, left: 16, zIndex: 10 }}>
          <ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} />
        </button>
        <button className="hd-carousel__more ann-back-btn" style={{ position: "absolute", top: 12, right: 16, zIndex: 10 }}>
          <MoreVertical size={18} color="#1E1B4B" />
        </button>
        <div className="hd-carousel__dots">
          {imgColors.map((_, i) => <button key={i} className={`hd-dot ${i === imgIdx ? "hd-dot--active" : ""}`} onClick={() => setImgIdx(i)} />)}
        </div>
        {h.available && <span className="hd-available-badge">· Available</span>}
      </div>

      <div className="hd-title-row">
        <div>
          <h2 className="hd-title">{h.name}</h2>
          <div className="hd-address"><Navigation size={14} color="#A09DC5" strokeWidth={1.5} /><span>{h.address}</span></div>
        </div>
        <div className="hd-price">{h.price}<span className="hd-price__per"> /mo</span></div>
      </div>

      <div className="hd-stats-row">
        <div className="hd-stat-chip"><span className="hd-stat-icon">🛏</span><span className="hd-stat-label">{h.rooms}</span></div>
        <div className="hd-stat-chip"><span className="hd-stat-icon">📐</span><span className="hd-stat-label">{h.area}</span></div>
        <div className="hd-stat-chip"><span className="hd-stat-icon">🏢</span><span className="hd-stat-label">{h.floor}</span></div>
      </div>

      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Amenities</h3>
        <div className="job-skills-row">{h.amenities.map(a => <span key={a} className="hd-amenity-tag">{a}</span>)}</div>
      </div>

      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">About</h3>
        <p className="ann-detail-section__text">{h.about}</p>
      </div>

      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Location</h3>
        <div style={{ height: 180, borderRadius: 12, overflow: "hidden", border: "1px solid #E5E2F0" }}>
          <APIProvider apiKey={MAPS_API_KEY}>
            <Map defaultCenter={{ lat: h.lat, lng: h.lng }} defaultZoom={15} mapId={MAP_ID}
              style={{ width: "100%", height: "100%" }} gestureHandling="none" disableDefaultUI>
              <AdvancedMarker position={{ lat: h.lat, lng: h.lng }}>
                <Pin background="#A78BFA" borderColor="#7C3AED" glyphColor="#fff" />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </div>
      </div>

      <div className="ann-detail-section">
        <h3 className="ann-detail-section__title">Owner</h3>
        <div className="hd-owner-row">
          <div className="hd-owner-avatar">{h.owner.initials}</div>
          <div className="hd-owner-info">
            <div className="hd-owner-name">{h.owner.name}</div>
            <div className="hd-owner-role">{h.owner.role}</div>
          </div>
          <div className="hd-owner-socials">
            <button className="hd-social-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#25D366"/><path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.7 9 9 7.1 8.7 6.6c-.3-.4-.6-.4-.8-.4H7.6c-.2 0-.5.1-.8.4C6.5 6.9 5.7 7.7 5.7 9.4s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 3.4 1.4 3.4 1 4 .9.6-.1 1.8-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.6-.3z" fill="#fff"/></svg>
            </button>
            <button className="hd-social-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#2AABEE"/><path d="M17.9 6.6L5.4 11.3c-.8.3-.8.8-.1 1l3.2 1 1.2 3.7c.1.4.3.5.6.5.3 0 .4-.1.6-.3l1.5-1.5 3.1 2.3c.6.3 1 .1 1.1-.5l2-9.5c.2-.8-.3-1.2-.8-.9zm-9.1 6.1l6.4-4c.3-.2.6 0 .4.3L9.9 14l-.3 2.5-1.8-3.8z" fill="#fff"/></svg>
            </button>
          </div>
        </div>
      </div>

      <button className="ann-detail-cta" onClick={() => navigate(`/housing/${h.id}/contact`)}>Contact owner</button>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 32px" }}><DetailContent /></div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="home-main">
          <div className="home-topbar">
            <div className="home-topbar__greeting">
              <button className="ann-desk-back" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back to Housing</button>
              <h1 style={{ marginTop: 8 }}>Housing Detail</h1>
            </div>
          </div>
          <div className="home-content" style={{ overflowY: "auto" }}>
            <div className="ann-detail-desk-layout">
              <div className="ann-detail-desk-main"><DetailContent /></div>
              <div className="ann-detail-desk-aside">
                <h3 className="ann-detail-desk-aside__title">Other Listings</h3>
                {HOUSING.filter(x => x.id !== h.id).map(x => (
                  <div key={x.id} className="ann-aside-card" onClick={() => navigate(`/housing/${x.id}`)}>
                    <span className="ann-aside-card__cat"><Building2 size={11} /> {x.rooms}</span>
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


export const ContactOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const h = HOUSING.find(x => x.id === Number(id)) ?? HOUSING[0];
  const [message, setMessage] = useState("");
  const quickMessages = ["Is it still available?", "I'd like to visit", "Schedule a call"];

  const Content = () => (
    <div className="contact-body">
      <div className="contact-owner-header">
        <div className="hd-owner-avatar contact-owner-avatar">{h.owner.initials}</div>
        <div>
          <div className="contact-owner-name">{h.owner.name}</div>
          <div className="contact-owner-role">{h.owner.role} · Online</div>
        </div>
      </div>
      <div className="contact-divider" />
      <div className="contact-section">
        <div className="contact-section__label">PROPERTY</div>
        <div className="contact-prop-row">
          <div><div className="contact-prop-name">{h.name}</div><div className="contact-prop-addr">{h.address}</div></div>
          <div className="contact-prop-price">{h.priceShort}<span style={{ fontSize: 14, fontWeight: 500, color: "#A78BFA" }}>/mo</span></div>
        </div>
      </div>
      <div className="contact-divider" />
      <div className="contact-section">
        <div className="contact-section__label">REACH OUT VIA</div>
        <div className="contact-channels">
          <div className="contact-channel-row">
            <div className="contact-channel-icon" style={{ background: "#1E1B4B" }}><Phone size={18} color="#fff" /></div>
            <div className="contact-channel-info">
              <div className="contact-channel-name">Phone</div>
              <div className="contact-channel-sub">{h.owner.phone}</div>
            </div>
            <button className="contact-channel-action">Call</button>
          </div>
        </div>
      </div>
      <div className="contact-divider" />
      <div className="contact-section">
        <div className="contact-section__label">MESSAGE</div>
        <div className="contact-quick-msgs">
          {quickMessages.map(q => (
            <button key={q} className={`contact-quick-btn ${message === q ? "contact-quick-btn--active" : ""}`}
              onClick={() => setMessage(message === q ? "" : q)}>{q}</button>
          ))}
        </div>
        <input className="apply-input" placeholder="Write a message........." value={message} onChange={e => setMessage(e.target.value)} style={{ marginTop: 8 }} />
      </div>
      <button className="apply-submit-btn">Send message</button>
    </div>
  );

  return (
    <div className="home-screen">
      <div className="home-mobile" style={{ flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <div className="ann-page-topbar">
          <button className="ann-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} color="#1E1B4B" strokeWidth={2} /></button>
          <span className="ann-page-title">Contact owner</span>
          <div style={{ width: 40 }} />
        </div>
        <div className="home-content" style={{ padding: "0 16px 32px" }}><Content /></div>
      </div>
      <div className="home-desktop" style={{ flex: 1 }}>
        <div className="apply-desk-wrapper">
          <div className="apply-desk-card">
            <button className="ann-desk-back" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}><ArrowLeft size={16} /> Back to Listing</button>
            <h1 className="apply-desk-title">Contact owner</h1>
            <p className="apply-desk-sub">Reach out to the landlord directly</p>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};