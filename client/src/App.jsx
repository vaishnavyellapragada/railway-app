import React, { useState, useEffect } from 'react';

// ---------- Inline SVG Icons ----------
const TrainIcon = ({ size = 28, color = '#2563eb' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3" width="16" height="13" rx="4" stroke={color} strokeWidth="1.8" />
    <path d="M4 11H20" stroke={color} strokeWidth="1.8" />
    <path d="M8 16L6 20M16 16L18 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8.5" cy="13.2" r="1" fill={color} />
    <circle cx="15.5" cy="13.2" r="1" fill={color} />
    <path d="M9 6.5H15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SearchIcon = ({ size = 18, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
    <path d="M20 20L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PinIcon = ({ color = '#94a3b8' }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" stroke={color} strokeWidth="1.8" />
    <circle cx="12" cy="9.5" r="2.3" stroke={color} strokeWidth="1.8" />
  </svg>
);

const FlagIcon = ({ color = '#94a3b8' }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 21V4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6 4H17L14.5 8L17 12H6" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const HashIcon = ({ color = '#94a3b8' }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 9H20M4 15H20M10 3L8 21M16 3L14 21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = ({ color = '#2563eb' }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------- Style Tokens ----------
const colors = {
  bg: '#FAF3E0',
  card: '#ffffff',
  text: '#1E293B',
  subtext: '#64748b',
  accent: '#2563eb',
  accentSoft: '#eff4ff',
  border: '#eee3d3',
  pill: '#efe4d3',
};

// Global CSS override injected once — forces html/body/#root to fill the viewport
const GLOBAL_OVERRIDE_CSS = `
  html, body, #root {
    margin: 0;
    padding: 0;
    max-width: none !important;
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: #FAF3E0;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState('find'); // 'find' | 'track'
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [now, setNow] = useState(new Date());

  // hover / focus state
  const [hoveredEl, setHoveredEl] = useState(null); // 'search' | 'login' | 'signup' | 'swap' | 'find-tab' | 'track-tab' | 'recent-<idx>'
  const [focusedInput, setFocusedInput] = useState(null); // 'from' | 'to' | 'train'

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const handleSwap = () => {
    setFromStation(toStation);
    setToStation(fromStation);
  };

  const recentSearches = [
    { code: '17254', name: 'Guntur Express' },
    { code: '12628', name: 'Karnataka Express' },
  ];

  // Exactly the three hardcoded, verified image URLs
  const collageImages = [
    {
      url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop',
      alt: 'Traveler waiting on a railway platform',
    },
    {
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop',
      alt: 'Train arriving at the station',
    },
    {
      url: 'https://images.unsplash.com/photo-1541892079-2470a1332a65?q=80&w=800&auto=format&fit=crop',
      alt: 'Passenger travel scene',
    },
  ];

  return (
    <>
      <style>{GLOBAL_OVERRIDE_CSS}</style>
      <div style={styles.page}>
        {/* ---------------- NAVBAR ---------------- */}
        <nav style={styles.navbar}>
          <div style={styles.brand}>
            <div style={styles.brandIconWrap}>
              <TrainIcon size={22} color={colors.accent} />
            </div>
            <span style={styles.brandName}>SeatSeek</span>
          </div>

          <div style={styles.navRight}>
            <div style={styles.langPill}>EN</div>
            <div style={styles.clockPill}>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{timeString}</span>
            </div>
            <button
              style={{
                ...styles.loginBtn,
                ...(hoveredEl === 'login' ? styles.loginBtnHover : {}),
              }}
              onMouseEnter={() => setHoveredEl('login')}
              onMouseLeave={() => setHoveredEl(null)}
            >
              Log in
            </button>
            <button
              style={{
                ...styles.signupBtn,
                ...(hoveredEl === 'signup' ? styles.signupBtnHover : {}),
              }}
              onMouseEnter={() => setHoveredEl('signup')}
              onMouseLeave={() => setHoveredEl(null)}
            >
              Sign up
            </button>
          </div>
        </nav>

        {/* ---------------- HERO ---------------- */}
        <div style={styles.heroGrid}>
          {/* LEFT COLUMN */}
          <div style={styles.heroLeft}>
            <h1 style={styles.headline}>
              Find your next train journey <span style={{ color: colors.accent }}>with SeatSeek</span>
            </h1>
            <p style={styles.subheadline}>
              Live running status, seat availability, and platform info — all in one calm, uncluttered place.
            </p>

            {/* Tab Switcher */}
            <div style={styles.tabSwitcher}>
              <button
                onClick={() => setActiveTab('find')}
                onMouseEnter={() => setHoveredEl('find-tab')}
                onMouseLeave={() => setHoveredEl(null)}
                style={{
                  ...styles.tabPill,
                  ...(activeTab === 'find' ? styles.tabPillActive : {}),
                  ...(hoveredEl === 'find-tab' && activeTab !== 'find' ? styles.tabPillHover : {}),
                }}
              >
                Find Trains
              </button>
              <button
                onClick={() => setActiveTab('track')}
                onMouseEnter={() => setHoveredEl('track-tab')}
                onMouseLeave={() => setHoveredEl(null)}
                style={{
                  ...styles.tabPill,
                  ...(activeTab === 'track' ? styles.tabPillActive : {}),
                  ...(hoveredEl === 'track-tab' && activeTab !== 'track' ? styles.tabPillHover : {}),
                }}
              >
                Track Train
              </button>
            </div>

            {/* Search Card */}
            <div style={styles.searchCard}>
              {activeTab === 'find' ? (
                <div style={styles.searchRow}>
                  <div
                    style={{
                      ...styles.inputGroup,
                      ...(focusedInput === 'from' ? styles.inputGroupFocus : {}),
                    }}
                  >
                    <PinIcon />
                    <div style={styles.inputTextWrap}>
                      <label style={styles.inputLabel}>From</label>
                      <input
                        value={fromStation}
                        onChange={(e) => setFromStation(e.target.value)}
                        onFocus={() => setFocusedInput('from')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Departure station"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSwap}
                    onMouseEnter={() => setHoveredEl('swap')}
                    onMouseLeave={() => setHoveredEl(null)}
                    style={{
                      ...styles.swapBtn,
                      ...(hoveredEl === 'swap' ? styles.swapBtnHover : {}),
                    }}
                    aria-label="Swap stations"
                  >
                    ⇄
                  </button>

                  <div
                    style={{
                      ...styles.inputGroup,
                      ...(focusedInput === 'to' ? styles.inputGroupFocus : {}),
                    }}
                  >
                    <FlagIcon />
                    <div style={styles.inputTextWrap}>
                      <label style={styles.inputLabel}>To</label>
                      <input
                        value={toStation}
                        onChange={(e) => setToStation(e.target.value)}
                        onFocus={() => setFocusedInput('to')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Destination station"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <button
                    onMouseEnter={() => setHoveredEl('search')}
                    onMouseLeave={() => setHoveredEl(null)}
                    style={{
                      ...styles.searchBtn,
                      ...(hoveredEl === 'search' ? styles.searchBtnHover : {}),
                    }}
                  >
                    <SearchIcon />
                    <span>Search</span>
                  </button>
                </div>
              ) : (
                <div style={styles.searchRow}>
                  <div
                    style={{
                      ...styles.inputGroup,
                      flex: 1,
                      ...(focusedInput === 'train' ? styles.inputGroupFocus : {}),
                    }}
                  >
                    <HashIcon />
                    <div style={styles.inputTextWrap}>
                      <label style={styles.inputLabel}>Train Number / Name</label>
                      <input
                        value={trainNumber}
                        onChange={(e) => setTrainNumber(e.target.value)}
                        onFocus={() => setFocusedInput('train')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="e.g. 12628 or Karnataka Express"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <button
                    onMouseEnter={() => setHoveredEl('search')}
                    onMouseLeave={() => setHoveredEl(null)}
                    style={{
                      ...styles.searchBtn,
                      ...(hoveredEl === 'search' ? styles.searchBtnHover : {}),
                    }}
                  >
                    <SearchIcon />
                    <span>Track</span>
                  </button>
                </div>
              )}
            </div>

            {/* Recent Searches */}
            <div style={styles.recentCard}>
              <div style={styles.recentHeader}>Recent Searches</div>
              {recentSearches.map((item, idx) => (
                <div key={item.code} style={styles.recentRow}>
                  <div style={styles.recentLeft}>
                    <div style={styles.recentDot} />
                    <span style={styles.recentText}>
                      <strong>{item.code}</strong> - {item.name}
                    </span>
                  </div>
                  <button
                    onMouseEnter={() => setHoveredEl(`recent-${idx}`)}
                    onMouseLeave={() => setHoveredEl(null)}
                    style={{
                      ...styles.recentArrowBtn,
                      ...(hoveredEl === `recent-${idx}` ? styles.recentArrowBtnHover : {}),
                    }}
                    aria-label={`Go to ${item.name}`}
                  >
                    <ArrowIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Pinterest Collage (3 cards, asymmetric) */}
          <div style={styles.heroRight}>
            <div style={styles.collageGrid}>
              {/* Card 1: tall, spans both rows on the left */}
              <div style={{ ...styles.collageCard, gridColumn: '1', gridRow: '1 / span 2' }}>
                <img
                  src={collageImages[0].url}
                  alt={collageImages[0].alt}
                  style={styles.collageImg}
                />
              </div>

              {/* Card 2: top right */}
              <div style={{ ...styles.collageCard, gridColumn: '2', gridRow: '1', marginTop: 0 }}>
                <img
                  src={collageImages[1].url}
                  alt={collageImages[1].alt}
                  style={styles.collageImg}
                />
              </div>

              {/* Card 3: bottom right */}
              <div style={{ ...styles.collageCard, gridColumn: '2', gridRow: '2', marginTop: 20 }}>
                <img
                  src={collageImages[2].url}
                  alt={collageImages[2].alt}
                  style={styles.collageImg}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------- STYLES ----------------
const styles = {
  page: {
    width: '100%',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxSizing: 'border-box',
  },

  // NAVBAR
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 48px',
    width: '100%',
    boxSizing: 'border-box',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  brandIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.accentSoft,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    color: colors.text,
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  langPill: {
    padding: '8px 14px',
    borderRadius: 999,
    backgroundColor: colors.pill,
    fontSize: 13,
    fontWeight: 600,
    color: colors.text,
    cursor: 'pointer',
  },
  clockPill: {
    padding: '8px 16px',
    borderRadius: 999,
    backgroundColor: colors.pill,
    fontSize: 13,
    fontWeight: 700,
    color: colors.text,
    minWidth: 92,
    textAlign: 'center',
  },
  loginBtn: {
    padding: '10px 20px',
    borderRadius: 999,
    border: `1.5px solid ${colors.border}`,
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: 700,
    color: colors.text,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  loginBtnHover: {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    backgroundColor: colors.card,
  },
  signupBtn: {
    padding: '10px 22px',
    borderRadius: 999,
    border: 'none',
    backgroundColor: colors.accent,
    fontSize: 14,
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)',
    transition: 'all 0.25s ease',
  },
  signupBtnHover: {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: '0 14px 26px rgba(37, 99, 235, 0.35)',
  },

  // HERO
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: 56,
    width: '100%',
    boxSizing: 'border-box',
    margin: '20px 0 0',
    padding: '20px 48px 80px',
    alignItems: 'start',
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  headline: {
    fontSize: 48,
    lineHeight: 1.12,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    margin: '12px 0 16px',
    color: '#1E293B',
  },
  subheadline: {
    fontSize: 16,
    color: colors.subtext,
    lineHeight: 1.6,
    margin: '0 0 28px',
    maxWidth: 460,
  },

  // TAB SWITCHER
  tabSwitcher: {
    display: 'inline-flex',
    backgroundColor: colors.pill,
    borderRadius: 999,
    padding: 6,
    gap: 4,
    marginBottom: 18,
  },
  tabPill: {
    padding: '10px 22px',
    borderRadius: 999,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: 700,
    color: colors.subtext,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  tabPillActive: {
    backgroundColor: colors.card,
    color: '#1E293B',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transform: 'translateY(-2px)',
  },
  tabPillHover: {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
    color: '#1E293B',
  },

  // SEARCH CARD
  searchCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 12,
    boxShadow: '0 12px 32px rgba(30, 41, 59, 0.08)',
    border: `1px solid ${colors.border}`,
  },
  searchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    flex: 1,
    minWidth: 0,
    borderRadius: 16,
    border: '1.5px solid transparent',
    transition: 'all 0.25s ease',
  },
  inputGroupFocus: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  inputTextWrap: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: 800,
    color: colors.subtext,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 2,
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: 15,
    fontWeight: 600,
    color: colors.text,
    backgroundColor: 'transparent',
    width: '100%',
  },
  swapBtn: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: `1.5px solid ${colors.border}`,
    backgroundColor: colors.bg,
    fontSize: 16,
    color: colors.accent,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.25s ease',
  },
  swapBtnHover: {
    transform: 'translateY(-4px) scale(1.1)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    backgroundColor: colors.accentSoft,
  },
  searchBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 24px',
    borderRadius: 18,
    border: 'none',
    backgroundColor: colors.accent,
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 10px 24px rgba(37, 99, 235, 0.3)',
    flexShrink: 0,
    transition: 'all 0.25s ease',
  },
  searchBtnHover: {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: '0 16px 30px rgba(37, 99, 235, 0.4)',
  },

  // RECENT SEARCHES
  recentCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: '16px 20px',
    marginTop: 18,
    border: `1px solid ${colors.border}`,
    boxShadow: '0 6px 18px rgba(30, 41, 59, 0.05)',
  },
  recentHeader: {
    fontSize: 12,
    fontWeight: 800,
    color: colors.subtext,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 10,
  },
  recentRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
  },
  recentLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  recentDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: colors.accent,
  },
  recentText: {
    fontSize: 14,
    color: colors.text,
  },
  recentArrowBtn: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: colors.accentSoft,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  recentArrowBtnHover: {
    transform: 'translateY(-4px) scale(1.1)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },

  // COLLAGE
  heroRight: {
    position: 'relative',
    width: '100%',
  },
  collageGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: 20,
    minHeight: 460,
  },
  collageCard: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 16px 32px rgba(30, 41, 59, 0.12)',
    backgroundColor: colors.card,
  },
  collageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
    display: 'block',
  },
};

export default App;