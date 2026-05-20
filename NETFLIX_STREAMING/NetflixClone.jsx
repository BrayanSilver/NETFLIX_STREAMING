import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play, Info, ChevronLeft, ChevronRight,
  Search, Bell, X, Plus, ThumbsUp,
  VolumeX, Volume2, Check, ChevronDown
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALL_MOVIES = [
  { id:1,  title:"Stranger Things",   year:2016, rating:"TV-14", match:98, type:"S", seasons:4, desc:"When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",                            genres:["Sci-Fi","Horror","Drama"],     bg:["#0d0d1a","#1a1a3d","#0f3460"], accent:"#e94560", tag:"New Episode" },
  { id:2,  title:"The Crown",         year:2016, rating:"TV-MA", match:94, type:"S", seasons:6, desc:"This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",                          genres:["Drama","History"],             bg:["#2d1b00","#5c3600","#8b5e00"], accent:"#d4a017" },
  { id:3,  title:"Squid Game",        year:2021, rating:"TV-MA", match:99, type:"S", seasons:2, desc:"Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",                        genres:["Thriller","Drama","Action"],   bg:["#0d2137","#0d4f3c","#1a7a5e"], accent:"#ff0067", tag:"#1 in TV Today" },
  { id:4,  title:"Ozark",             year:2017, rating:"TV-MA", match:96, type:"S", seasons:4, desc:"A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.",                          genres:["Crime","Drama","Thriller"],    bg:["#0a1628","#0d2144","#0f2b5a"], accent:"#4db8ff" },
  { id:5,  title:"Money Heist",       year:2017, rating:"TV-MA", match:97, type:"S", seasons:5, desc:"Eight thieves take hostages at the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",                                               genres:["Crime","Action","Thriller"],   bg:["#3d0000","#6b0000","#990000"], accent:"#ff4444", tag:"Recently Added" },
  { id:6,  title:"Dark",              year:2017, rating:"TV-MA", match:95, type:"S", seasons:3, desc:"A family saga with a supernatural twist set in a German town where the disappearance of two children exposes the tangled relationships among four families.",                  genres:["Sci-Fi","Mystery","Thriller"], bg:["#1a0a2e","#2d1454","#4a1f7a"], accent:"#9b59b6" },
  { id:7,  title:"Wednesday",         year:2022, rating:"TV-14", match:93, type:"S", seasons:2, desc:"Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",                                     genres:["Comedy","Mystery","Horror"],   bg:["#0a0a0a","#1a1a1a","#2a2a2a"], accent:"#c0c0c0", tag:"New Season" },
  { id:8,  title:"Bridgerton",        year:2020, rating:"TV-MA", match:91, type:"S", seasons:3, desc:"The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society. Inspired by Julia Quinn's bestselling novels.",                   genres:["Romance","Drama","Period"],    bg:["#2d0a3d","#4a0f5c","#6b1580"], accent:"#e8b4d8" },
  { id:9,  title:"The Witcher",       year:2019, rating:"TV-MA", match:89, type:"S", seasons:3, desc:"Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than the beasts he slays.",                         genres:["Fantasy","Action","Adventure"],bg:["#1a2a1a","#2a4a2a","#3a6a3a"], accent:"#c8a000" },
  { id:10, title:"Narcos",            year:2015, rating:"TV-MA", match:97, type:"S", seasons:3, desc:"A gritty chronicle of the growth and spread of cocaine drug cartels across the globe and the brutal efforts of law enforcement to stop them.",                                genres:["Crime","Biography","Drama"],   bg:["#1a0f00","#3d2500","#5c3800"], accent:"#f39c12" },
  { id:11, title:"Lupin",             year:2021, rating:"TV-MA", match:94, type:"S", seasons:3, desc:"Inspired by Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.",                                        genres:["Crime","Thriller","Mystery"],  bg:["#0d1b2e","#1a3050","#274872"], accent:"#3498db" },
  { id:12, title:"Queen's Gambit",    year:2020, rating:"TV-MA", match:96, type:"S", seasons:1, desc:"In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to the highest levels of the game.",                              genres:["Drama","Sport","Period"],      bg:["#1a0d00","#3d1f00","#5c3000"], accent:"#e67e22" },
  { id:13, title:"Extraction",        year:2020, rating:"R",     match:88, type:"F", duration:"1h 56m", desc:"A hardened mercenary's mission becomes a soul-searching race to survive when he's sent to rescue a drug lord's kidnapped son.",                                    genres:["Action","Thriller"],           bg:["#1a1200","#3d2d00","#5c4400"], accent:"#f1c40f" },
  { id:14, title:"Bird Box",          year:2018, rating:"R",     match:86, type:"F", duration:"2h 4m",  desc:"Five years after an unseen presence drives most of society to suicide, a survivor and her two children make a desperate bid to reach safety.",                      genres:["Horror","Sci-Fi","Thriller"],  bg:["#0a1a0a","#152e15","#1f421f"], accent:"#7dcea0" },
  { id:15, title:"The Irishman",      year:2019, rating:"R",     match:95, type:"F", duration:"3h 29m", desc:"A mob hitman reflects on his decades-long career serving a powerful crime family and recalls his possible involvement in the slaying of Jimmy Hoffa.",              genres:["Crime","Drama","Biography"],   bg:["#0f0f0f","#1a1a1a","#262626"], accent:"#e74c3c" },
  { id:16, title:"Roma",              year:2018, rating:"R",     match:98, type:"F", duration:"2h 15m", desc:"A year in the life of a middle-class family's live-in housekeeper in Mexico City in the early 1970s — intimate, stunning, and timeless.",                          genres:["Drama","Foreign","Period"],    bg:["#1a1a0f","#2e2e1a","#424226"], accent:"#bdc3c7" },
  { id:17, title:"1917",              year:2019, rating:"R",     match:97, type:"F", duration:"1h 59m", desc:"Two British soldiers are given an impossible mission: deliver a message that will stop 1,600 men from walking into a deadly trap in WWI.",                          genres:["War","Drama","Action"],        bg:["#0a1525","#102040","#162b55"], accent:"#4169e1" },
  { id:18, title:"Marriage Story",    year:2019, rating:"R",     match:94, type:"F", duration:"2h 17m", desc:"A stage director and his actor wife struggle through a grueling coast-to-coast divorce that pushes them both to their personal extremes.",                          genres:["Drama","Romance"],             bg:["#1f0a1f","#3d1a3d","#5c285c"], accent:"#bb8fce" },
  { id:19, title:"Manifest",          year:2018, rating:"TV-14", match:87, type:"S", seasons:4, desc:"When a flight lands safely after a turbulent journey, the crew and passengers are relieved — yet in those hours the world has aged five years.",                            genres:["Drama","Mystery","Sci-Fi"],    bg:["#001a2e","#003055","#004477"], accent:"#00bfff" },
  { id:20, title:"Peaky Blinders",    year:2013, rating:"TV-MA", match:98, type:"S", seasons:6, desc:"A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps and their fearless boss Tommy Shelby.",                  genres:["Crime","Drama","Period"],      bg:["#0a0505","#1a0f0f","#2a1515"], accent:"#c0392b", tag:"#2 in TV Today" },
  { id:21, title:"Mindhunter",        year:2017, rating:"TV-MA", match:96, type:"S", seasons:2, desc:"In the late 1970s two FBI agents expand criminal science by delving into the psychology of murder and getting unsettlingly close to all-too-willing killers.",             genres:["Crime","Thriller","Drama"],    bg:["#0f0f0f","#1f1f1f","#2f2f2f"], accent:"#808080" },
  { id:22, title:"Hill House",        year:2018, rating:"TV-MA", match:95, type:"S", seasons:1, desc:"Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.",                   genres:["Horror","Drama","Mystery"],    bg:["#1a0f2e","#2e1a4f","#3d2266"], accent:"#8e44ad" },
  { id:23, title:"Altered Carbon",    year:2018, rating:"TV-MA", match:88, type:"S", seasons:2, desc:"A prisoner returns to life in a new body and must solve a mind-bending murder to win his freedom in a future where consciousness is digitized.",                           genres:["Sci-Fi","Action","Cyberpunk"], bg:["#001427","#002244","#003366"], accent:"#00ff9f" },
  { id:24, title:"The OA",            year:2016, rating:"TV-MA", match:90, type:"S", seasons:2, desc:"Prairie Johnson emerges from captivity after seven years with her sight mysteriously restored. Some hail her as a miracle. Others see her as a threat.",                   genres:["Mystery","Drama","Sci-Fi"],    bg:["#0a0a1a","#15152e","#1f1f42"], accent:"#7f7fff" },
];

const CATEGORIES = [
  { title: "Trending Now", ids: [3, 7, 1, 20, 5, 9, 4, 11] },
  { title: "Popular on Netflix", ids: [8, 11, 10, 2, 19, 6, 12, 16] },
  { title: "Continue Watching for You", ids: [1, 4, 9, 20, 3, 7], progress: true },
  { title: "Action & Thrillers", ids: [13, 5, 17, 9, 23, 20, 14, 15] },
  { title: "Critically Acclaimed", ids: [16, 15, 17, 18, 14, 12, 22, 21] },
  { title: "Sci-Fi & Fantasy", ids: [1, 6, 19, 23, 24, 9, 3, 7] },
  { title: "Crime & Drama", ids: [20, 21, 10, 4, 11, 3, 5, 2] },
];

const FEATURED_IDS = [3, 7, 20, 1, 5];
const TOP_10_IDS = [3, 20, 7, 1, 5, 10, 6, 4, 9, 11];
const NAV_LINKS = ["Home", "Series", "Films", "New & Popular", "My List", "Browse by Languages"];

const getMovie = (id) => ALL_MOVIES.find((m) => m.id === id);

const CARD_W = 230;
const CARD_H = Math.round(CARD_W * 9 / 16);
const HOVER_W = 322;
const HOVER_DELAY = 400;

// ─── POSTER & PREVIEW ────────────────────────────────────────────────────────

function Poster({ movie }) {
  const [c1, c2, c3] = movie.bg;
  const words = movie.title.split(" ");
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(" ");
  const line2 = words.slice(half).join(" ");
  const uid = `grad-${movie.id}`;

  return (
    <svg viewBox="0 0 200 113" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="50%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
      </defs>
      <rect width="200" height="113" fill={`url(#${uid})`} />
      <circle cx="160" cy="22" r="55" fill={movie.accent} opacity="0.12" />
      <circle cx="40" cy="90" r="45" fill={movie.accent} opacity="0.09" />
      <rect x="0" y="68" width="80" height="2" fill={movie.accent} opacity="0.5" />
      <text x="100" y={line2 ? "48" : "58"} fill="white" fontSize="13" fontWeight="bold"
        fontFamily="Arial Black, sans-serif" textAnchor="middle" opacity="0.95">{line1}</text>
      {line2 && (
        <text x="100" y="65" fill="white" fontSize="13" fontWeight="bold"
          fontFamily="Arial Black, sans-serif" textAnchor="middle" opacity="0.95">{line2}</text>
      )}
      <rect x="8" y="8" width={movie.type === "F" ? 38 : 44} height="15" rx="3" fill={movie.accent} opacity="0.85" />
      <text x={movie.type === "F" ? "27" : "30"} y="19.5" fill="white" fontSize="8.5"
        fontFamily="Arial, sans-serif" textAnchor="middle" fontWeight="bold">
        {movie.type === "F" ? "FILM" : "SERIES"}
      </text>
    </svg>
  );
}

function PreviewScene({ movie, muted, onToggleMute }) {
  const [c1, c2, c3] = movie.bg;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})` }}>
      <div className="nf-card-preview-bg" style={{ position: "absolute", inset: "-8%" }}>
        <svg style={{ width: "100%", height: "100%", opacity: 0.35 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <circle cx="80" cy="20" r="50" fill={movie.accent} />
          <circle cx="20" cy="75" r="40" fill={movie.accent} />
        </svg>
      </div>
      <div className="nf-card-preview-overlay" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.9) 100%)",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.2)" }}>
        <div className="nf-preview-progress" style={{ height: "100%", background: "#e50914" }} />
      </div>
      <button type="button" onClick={(e) => { e.stopPropagation(); onToggleMute?.(); }}
        style={{
          position: "absolute", right: 8, bottom: 12, width: 28, height: 28, borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.7)", background: "rgba(42,42,42,0.6)",
          color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
        }}>
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
      {movie.tag && (
        <span style={{
          position: "absolute", top: 8, left: 8, background: "rgba(229,9,20,0.92)",
          color: "white", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 2,
        }}>{movie.tag}</span>
      )}
    </div>
  );
}

function MetaBadges({ movie, small }) {
  const fs = small ? 10 : 11;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      <span style={{ color: "#46d369", fontWeight: 700, fontSize: fs }}>{movie.match}% Match</span>
      <span style={{ color: "#fff", fontSize: fs - 1, border: "1px solid rgba(255,255,255,0.4)", padding: "0 4px" }}>{movie.rating}</span>
      <span style={{ color: "#bcbcbc", fontSize: fs }}>
        {movie.type === "F" ? movie.duration : `${movie.seasons} Season${movie.seasons > 1 ? "s" : ""}`}
      </span>
    </div>
  );
}

function Btn({ children, circle, white, onClick, large }) {
  const sz = large ? 36 : 28;
  return (
    <button type="button" onClick={onClick} style={{
      width: sz, height: sz, borderRadius: circle ? "50%" : 4,
      background: white ? "white" : "rgba(42,42,42,0.7)",
      border: white ? "none" : "2px solid rgba(255,255,255,0.5)",
      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0,
    }}>{children}</button>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function NavBar({ scrolled, activeNav, onNavChange }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 200,
      background: scrolled ? "#141414" : "linear-gradient(180deg, rgba(0,0,0,0.75) 10%, transparent)",
      padding: "0 3.5%", display: "flex", alignItems: "center",
      height: scrolled ? 68 : 72, transition: "background 0.35s ease",
    }}>
      <svg width="92" height="26" viewBox="0 0 111 30" style={{ flexShrink: 0, marginRight: 28 }}>
        <text x="0" y="26" fill="#e50914" fontSize="28" fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="-1">NETFLIX</text>
      </svg>
      <div style={{ display: "flex", gap: 18, flex: 1 }}>
        {NAV_LINKS.map((link) => (
          <span key={link} className={`nf-nav-link${activeNav === link ? " active" : ""}`}
            onClick={() => onNavChange(link)}
            style={{
              color: activeNav === link ? "#fff" : "#e5e5e5", fontSize: 14, cursor: "pointer",
              fontWeight: activeNav === link ? 600 : 400, whiteSpace: "nowrap",
            }}>{link}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {searchOpen ? (
          <div className="nf-search-expand" style={{ display: "flex", alignItems: "center", border: "1px solid #fff", background: "rgba(0,0,0,0.8)", padding: "4px 10px" }}>
            <Search size={18} color="white" />
            <input ref={searchRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Titles, people, genres"
              style={{ background: "transparent", border: "none", outline: "none", color: "white", marginLeft: 8, width: 200, fontSize: 14 }} />
            <X size={18} color="white" style={{ cursor: "pointer", marginLeft: 6 }}
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }} />
          </div>
        ) : (
          <Search size={22} color="white" style={{ cursor: "pointer" }} onClick={() => setSearchOpen(true)} />
        )}
        <span style={{ color: "#fff", fontSize: 14, cursor: "pointer" }}>Kids</span>
        <Bell size={22} color="white" style={{ cursor: "pointer" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
            onClick={() => setProfileOpen((v) => !v)}>
            <div style={{ width: 32, height: 32, borderRadius: 4, background: "linear-gradient(135deg, #e50914, #831010)" }} />
            <ChevronDown size={16} color="white" style={{ transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </div>
          {profileOpen && (
            <div className="nf-dropdown" style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "rgba(0,0,0,0.95)", border: "1px solid #333", minWidth: 200, padding: "6px 0",
            }}>
              {["Manage Profiles", "Transfer Profile", "Account", "Help Centre", "Sign out of Netflix"].map((item, i) => (
                <div key={item} style={{
                  padding: "10px 16px", fontSize: 13, color: i === 4 ? "#b3b3b3" : "#fff",
                  borderTop: i === 4 ? "1px solid #333" : "none", cursor: "pointer",
                }}>{item}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero({ onMoreInfo }) {
  const [idx, setIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [fade, setFade] = useState(true);
  const movie = getMovie(FEATURED_IDS[idx]);
  const [c1, c2, c3] = movie.bg;

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % FEATURED_IDS.length);
        setFade(true);
      }, 400);
    }, 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", height: "88vh", minHeight: 500, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
        opacity: fade ? 1 : 0, transition: "opacity 0.5s ease",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }}
          viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <circle cx="85" cy="15" r="45" fill={movie.accent} />
          <circle cx="15" cy="75" r="35" fill={movie.accent} />
        </svg>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #141414 0%, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #141414 0%, rgba(20,20,20,0.4) 45%, transparent 75%)" }} />

      <div style={{ position: "absolute", bottom: "26%", left: "3.5%", maxWidth: "38%", minWidth: 280, opacity: fade ? 1 : 0, transition: "opacity 0.5s ease" }}>
        {movie.tag && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ color: "#e50914", fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>TOP 10</span>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{movie.tag}</span>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ color: movie.accent, fontSize: 11, fontWeight: 900, letterSpacing: 4 }}>N</span>
          <span style={{ color: "#b3b3b3", fontSize: 11, letterSpacing: 3 }}>{movie.type === "F" ? "FILM" : "SERIES"}</span>
        </div>
        <h1 style={{
          color: "#fff", fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 900,
          fontFamily: "Arial Black, sans-serif", margin: "0 0 16px", lineHeight: 1.05,
          textShadow: "2px 4px 16px rgba(0,0,0,0.9)",
        }}>{movie.title.toUpperCase()}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ color: "#46d369", fontWeight: 700, fontSize: 15 }}>{movie.match}% Match</span>
          <span style={{ color: "#fff", fontSize: 12, border: "1px solid rgba(255,255,255,0.5)", padding: "1px 6px" }}>{movie.rating}</span>
          <span style={{ color: "#d2d2d2", fontSize: 14 }}>{movie.year}</span>
          <span style={{ color: "#d2d2d2", fontSize: 14 }}>
            {movie.type === "F" ? movie.duration : `${movie.seasons} Seasons`}
          </span>
        </div>
        <p style={{ color: "#e8e8e8", fontSize: 15, lineHeight: 1.55, margin: "0 0 22px", textShadow: "1px 1px 8px rgba(0,0,0,0.8)" }}>
          {movie.desc.slice(0, 160)}…
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button type="button" style={{
            display: "flex", alignItems: "center", gap: 10, background: "#fff", color: "#000",
            border: "none", borderRadius: 4, padding: "11px 28px", fontSize: 17, fontWeight: 700, cursor: "pointer",
          }}><Play size={22} fill="#000" /> Play</button>
          <button type="button" onClick={() => onMoreInfo(movie)} style={{
            display: "flex", alignItems: "center", gap: 8, background: "rgba(109,109,110,0.55)",
            color: "#fff", border: "none", borderRadius: 4, padding: "11px 24px", fontSize: 17, fontWeight: 700, cursor: "pointer",
          }}><Info size={22} /> More Info</button>
        </div>
      </div>

      <button type="button" onClick={() => setMuted(!muted)} style={{
        position: "absolute", right: "3.5%", bottom: "32%", background: "rgba(42,42,42,0.5)",
        border: "2px solid rgba(255,255,255,0.5)", borderRadius: "50%", width: 40, height: 40,
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff",
      }}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>

      <div style={{ position: "absolute", right: "3.5%", bottom: "26%", borderLeft: "4px solid #fff", paddingLeft: 10, color: "#d0d0d0", fontSize: 13 }}>
        {movie.rating}
      </div>

      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
        {FEATURED_IDS.map((id, i) => (
          <button key={id} type="button" onClick={() => setIdx(i)} style={{
            width: i === idx ? 14 : 8, height: 3, border: "none", borderRadius: 2, padding: 0,
            background: i === idx ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── MOVIE CARD (hover preview) ──────────────────────────────────────────────

function MovieCard({ movie, onSelect, showProgress }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [muted, setMuted] = useState(true);
  const timerRef = useRef(null);
  const progress = showProgress ? 35 + (movie.id * 7) % 55 : 0;

  const enter = () => { timerRef.current = setTimeout(() => setHovered(true), HOVER_DELAY); };
  const leave = () => { clearTimeout(timerRef.current); setHovered(false); };

  const w = hovered ? HOVER_W : CARD_W;
  const previewH = hovered ? 140 : 0;

  return (
    <div
      style={{
        position: "relative", flexShrink: 0, width: CARD_W, zIndex: hovered ? 50 : 1,
        transform: hovered ? `translateY(-52px) scale(${HOVER_W / CARD_W})` : "none",
        transformOrigin: "center bottom", transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <div style={{
        width: w, background: "#181818", borderRadius: hovered ? 6 : 4,
        overflow: "hidden", boxShadow: hovered ? "0 12px 28px rgba(0,0,0,0.85)" : "none",
        transition: "box-shadow 0.3s ease",
      }}>
        {hovered && (
          <div style={{ height: previewH }}>
            <PreviewScene movie={movie} muted={muted} onToggleMute={() => setMuted((m) => !m)} />
          </div>
        )}
        {!hovered && (
          <div style={{ height: CARD_H, position: "relative" }}>
            <Poster movie={movie} />
            {showProgress && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.25)" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "#e50914" }} />
              </div>
            )}
          </div>
        )}
        {hovered && (
          <div style={{ padding: "10px 12px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <Btn circle white large onClick={(e) => e.stopPropagation()}><Play size={16} fill="#000" color="#000" /></Btn>
              <Btn circle large onClick={(e) => { e.stopPropagation(); setAdded((v) => !v); }}>
                {added ? <Check size={14} color="#fff" /> : <Plus size={14} color="#fff" />}
              </Btn>
              <Btn circle large onClick={(e) => e.stopPropagation()}><ThumbsUp size={14} color="#fff" /></Btn>
              <div style={{ flex: 1 }} />
              <Btn circle large onClick={(e) => { e.stopPropagation(); onSelect(movie); }}>
                <ChevronDown size={14} color="#fff" />
              </Btn>
            </div>
            <MetaBadges movie={movie} small />
            <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
              {movie.genres.slice(0, 3).map((g, i) => (
                <span key={g} style={{ color: "#b3b3b3", fontSize: 10 }}>
                  {i > 0 ? " · " : ""}{g}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROWS ────────────────────────────────────────────────────────────────────

function MovieRow({ title, movieIds, onSelect, showProgress }) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [rowHover, setRowHover] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => { checkScroll(); }, [checkScroll]);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 720, behavior: "smooth" });

  const movies = movieIds.map(getMovie).filter(Boolean);

  return (
    <div style={{ marginBottom: 44, padding: "0 3.5%" }}
      onMouseEnter={() => setRowHover(true)} onMouseLeave={() => setRowHover(false)}>
      <h2 style={{ color: "#e5e5e5", fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ position: "relative" }}>
        {canLeft && rowHover && (
          <div className="nf-row-arrow" onClick={() => scroll(-1)} style={arrowStyle("left")}>
            <ChevronLeft size={32} color="#fff" />
          </div>
        )}
        <div ref={scrollRef} onScroll={checkScroll} className="nf-row-scroll" style={{
          display: "flex", gap: 8, overflowX: "auto", overflowY: "visible",
          paddingTop: 60, marginTop: -60, paddingBottom: 120, marginBottom: -100,
          scrollbarWidth: "none", msOverflowStyle: "none",
        }}>
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} onSelect={onSelect} showProgress={showProgress} />
          ))}
        </div>
        {canRight && rowHover && (
          <div className="nf-row-arrow" onClick={() => scroll(1)} style={arrowStyle("right")}>
            <ChevronRight size={32} color="#fff" />
          </div>
        )}
      </div>
    </div>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  [side === "left" ? "left" : "right"]: 0,
  top: "42%", transform: "translateY(-50%)",
  background: "rgba(20,20,20,0.75)", width: 48, height: "100%",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", zIndex: 20, transition: "background 0.2s",
});

function Top10Row({ onSelect }) {
  const scrollRef = useRef(null);
  const [rowHover, setRowHover] = useState(false);
  const movies = TOP_10_IDS.map(getMovie).filter(Boolean);

  return (
    <div style={{ marginBottom: 44, padding: "0 3.5%" }}
      onMouseEnter={() => setRowHover(true)} onMouseLeave={() => setRowHover(false)}>
      <h2 style={{ color: "#e5e5e5", fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>Top 10 in Brazil Today</h2>
      <div style={{ position: "relative" }}>
        {rowHover && (
          <div className="nf-row-arrow" onClick={() => scrollRef.current?.scrollBy({ left: -600, behavior: "smooth" })}
            style={arrowStyle("left")}><ChevronLeft size={32} color="#fff" /></div>
        )}
        <div ref={scrollRef} style={{
          display: "flex", gap: 4, overflowX: "auto", overflowY: "visible",
          paddingTop: 60, marginTop: -60, paddingBottom: 120, marginBottom: -100,
          scrollbarWidth: "none",
        }}>
          {movies.map((m, i) => (
            <div key={m.id} style={{ display: "flex", alignItems: "flex-end", flexShrink: 0, cursor: "pointer" }}
              onClick={() => onSelect(m)}>
              <span className="nf-top10-num" style={{ fontSize: 120, marginRight: -8, userSelect: "none" }}>{i + 1}</span>
              <div style={{ width: CARD_W, paddingBottom: 4 }}>
                <MovieCard movie={m} onSelect={onSelect} />
              </div>
            </div>
          ))}
        </div>
        {rowHover && (
          <div className="nf-row-arrow" onClick={() => scrollRef.current?.scrollBy({ left: 600, behavior: "smooth" })}
            style={arrowStyle("right")}><ChevronRight size={32} color="#fff" /></div>
        )}
      </div>
    </div>
  );
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

function Modal({ movie, onClose }) {
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("overview");
  const [c1, c2, c3] = movie.bg;
  const related = CATEGORIES.flatMap((c) => c.ids)
    .filter((id, i, arr) => arr.indexOf(id) === i && id !== movie.id)
    .slice(0, 6).map(getMovie).filter(Boolean);

  const episodes = movie.type === "S"
    ? Array.from({ length: Math.min(movie.seasons, 3) }, (_, s) => ({
        season: s + 1,
        eps: Array.from({ length: 4 }, (_, e) => ({
          n: e + 1,
          title: `Episode ${e + 1}`,
          desc: movie.desc.slice(0, 90) + "…",
        })),
      }))
    : [];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.8)",
      overflowY: "auto", padding: "48px 20px",
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#181818", borderRadius: 8, maxWidth: 900, margin: "0 auto", overflow: "hidden" }}>
        <div style={{ height: 420, position: "relative", background: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})` }}>
          <PreviewScene movie={movie} muted={false} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #181818 0%, transparent 50%)" }} />
          <div style={{ position: "absolute", bottom: 28, left: 32, right: 32 }}>
            <h1 style={{ color: "#fff", fontFamily: "Arial Black", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", margin: "0 0 14px" }}>
              {movie.title.toUpperCase()}
            </h1>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button type="button" style={{
                display: "flex", alignItems: "center", gap: 8, background: "#fff", color: "#000",
                border: "none", borderRadius: 4, padding: "10px 26px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              }}><Play size={18} fill="#000" /> Play</button>
              <Btn circle onClick={() => setAdded((v) => !v)} large>
                {added ? <Check size={18} color="#fff" /> : <Plus size={18} color="#fff" />}
              </Btn>
              <Btn circle large><ThumbsUp size={18} color="#fff" /></Btn>
            </div>
          </div>
          <button type="button" onClick={onClose} style={{
            position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%",
            background: "#181818", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={22} color="#fff" /></button>
        </div>

        <div style={{ padding: "24px 32px 36px" }}>
          <MetaBadges movie={movie} />
          <p style={{ color: "#d2d2d2", fontSize: 14, lineHeight: 1.65, margin: "16px 0 24px" }}>{movie.desc}</p>

          {movie.type === "S" && (
            <>
              <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #333", marginBottom: 20 }}>
                {["overview", "episodes"].map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)} style={{
                    background: "none", border: "none", color: tab === t ? "#fff" : "#777",
                    fontSize: 15, fontWeight: tab === t ? 700 : 400, padding: "0 0 12px",
                    borderBottom: tab === t ? "3px solid #e50914" : "3px solid transparent",
                    cursor: "pointer", textTransform: "capitalize",
                  }}>{t}</button>
                ))}
              </div>
              {tab === "episodes" && episodes.map(({ season, eps }) => (
                <div key={season} style={{ marginBottom: 20 }}>
                  <h4 style={{ color: "#fff", margin: "0 0 12px" }}>Season {season}</h4>
                  {eps.map((ep) => (
                    <div key={ep.n} style={{
                      display: "flex", gap: 14, padding: "12px 0", borderBottom: "1px solid #2a2a2a", cursor: "pointer",
                    }}>
                      <span style={{ color: "#fff", fontWeight: 700, minWidth: 24 }}>{ep.n}</span>
                      <div style={{ width: 120, height: 68, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
                        <Poster movie={movie} />
                      </div>
                      <div>
                        <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{ep.title}</div>
                        <p style={{ color: "#999", fontSize: 12, margin: "4px 0 0" }}>{ep.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}

          <h3 style={{ color: "#e5e5e5", fontSize: 18, margin: "8px 0 16px" }}>More Like This</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {related.map((m) => (
              <div key={m.id} style={{ background: "#2f2f2f", borderRadius: 6, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 90 }}><Poster movie={m} /></div>
                <div style={{ padding: "8px 10px" }}>
                  <span style={{ color: "#46d369", fontWeight: 700, fontSize: 11 }}>{m.match}% Match</span>
                  <p style={{ color: "#aaa", fontSize: 11, margin: "6px 0 0", lineHeight: 1.4 }}>{m.desc.slice(0, 80)}…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const links = [
    "Audio Description", "Help Centre", "Gift Cards", "Media Centre",
    "Investor Relations", "Jobs", "Terms of Use", "Privacy",
    "Legal Notices", "Cookie Preferences", "Corporate Information", "Contact Us",
  ];
  return (
    <footer style={{ padding: "60px 3.5% 40px", color: "#808080" }}>
      <Bell size={20} color="#808080" style={{ marginBottom: 20 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px 16px", fontSize: 13, marginBottom: 24 }}>
        {links.map((l) => (
          <span key={l} style={{ cursor: "pointer", textDecoration: "underline" }}>{l}</span>
        ))}
      </div>
      <div style={{ display: "inline-block", border: "1px solid #808080", padding: "6px 12px", fontSize: 13, marginBottom: 16, cursor: "pointer" }}>
        🌐 English
      </div>
      <p style={{ fontSize: 12, margin: 0 }}>Netflix Clone · {new Date().getFullYear()}</p>
    </footer>
  );
}

export default function NetflixClone() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    const el = document.getElementById("netflix-scroll-root");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedMovie]);

  return (
    <div id="netflix-scroll-root" style={{
      background: "#141414", color: "#fff", height: "100vh",
      overflowY: "auto", overflowX: "hidden",
    }}>
      <NavBar scrolled={scrolled} activeNav={activeNav} onNavChange={setActiveNav} />
      <Hero onMoreInfo={setSelectedMovie} />
      <div style={{ marginTop: -140, position: "relative", zIndex: 10 }}>
        <Top10Row onSelect={setSelectedMovie} />
        {CATEGORIES.map((cat) => (
          <MovieRow
            key={cat.title}
            title={cat.title}
            movieIds={cat.ids}
            onSelect={setSelectedMovie}
            showProgress={cat.progress}
          />
        ))}
      </div>
      <Footer />
      {selectedMovie && <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}