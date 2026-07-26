import React, { useState, useEffect, useRef } from 'react';

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

const RadarIcon = ({ color = '#2563eb', size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.6" />
    <circle cx="12" cy="12" r="1.4" fill={color} />
    <path d="M12 3V1M21 12H23M12 21V23M1 12H3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CoachIcon = ({ color = '#2563eb', size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="12" rx="3" stroke={color} strokeWidth="1.6" />
    <path d="M7 5V17M12 5V17M17 5V17" stroke={color} strokeWidth="1.6" />
    <path d="M6 20H8M16 20H18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PredictIcon = ({ color = '#2563eb', size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19L9 11L14 15L20 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 5H20V10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = ({ color = '#64748b', size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <path d="M12 7V12L15.5 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircleIcon = ({ color = '#16a34a', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <path d="M8 12.5L10.7 15L16 9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrainSideIcon = ({ color = '#2563eb', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="9" rx="2" stroke={color} strokeWidth="1.6" />
    <path d="M2 12H22" stroke={color} strokeWidth="1.6" />
    <circle cx="7" cy="19" r="1.4" fill={color} />
    <circle cx="17" cy="19" r="1.4" fill={color} />
  </svg>
);

const StarIcon = ({ color = '#f59e0b', size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.9 8.6L22 9.3L16.7 14.1L18.2 21.2L12 17.6L5.8 21.2L7.3 14.1L2 9.3L9.1 8.6L12 2Z" />
  </svg>
);

// ---------- Style Tokens ----------
const colors = {
  bg: '#FAF3E0',
  bgAlt: '#F5EBE0',
  card: '#ffffff',
  text: '#1E293B',
  subtext: '#64748b',
  accent: '#2563eb',
  accentSoft: '#eff4ff',
  border: '#eee3d3',
  pill: '#efe4d3',
  green: '#16a34a',
  greenSoft: '#eafaf0',
};

// Global CSS override injected once — forces html/body/#root to fill the viewport and scroll
const GLOBAL_OVERRIDE_CSS = `
  html, body, #root {
    margin: 0;
    padding: 0;
    max-width: none !important;
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
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
  const [hoveredEl, setHoveredEl] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null); // 'from' | 'to' | 'train'

  const searchContainerRef = useRef(null);

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

  const scrollToSearch = () => {
    if (searchContainerRef.current) {
      const offset = searchContainerRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const recentSearches = [
    { code: '17254', name: 'Guntur Express' },
    { code: '12628', name: 'Karnataka Express' },
  ];

  // Exactly the four hardcoded, verified image URLs for the hero collage
  const collageImages = {
    tall: {
      url: 'https://images.unsplash.com/photo-1541892079-2470a1332a65?q=80&w=800&auto=format&fit=crop',
      alt: 'A relaxed passenger on a train',
    },
    top: {
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop',
      alt: 'Sunlit passengers on platform',
    },
    mid: {
      url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop',
      alt: 'Modern high-speed train',
    },
    bottom: {
      url: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=800&auto=format&fit=crop',
      alt: 'Cozy train carriage interior',
    },
  };

  const scenicJourneys = [
    {
      name: 'Mandovi Express',
      route: 'Mumbai → Goa',
      duration: '11h 40m',
      price: '₹850',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Vande Bharat Express',
      route: 'Delhi → Varanasi',
      duration: '8h 05m',
      price: '₹1,450',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Golden Chariot',
      route: 'Bengaluru → Hampi',
      duration: '2 nights',
      price: '₹42,000',
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Darjeeling Toy Train',
      route: 'NJP → Darjeeling',
      duration: '7h 15m',
      price: '₹1,100',
      image: 'https://images.unsplash.com/photo-1541892079-2470a1332a65?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const pnrResults = [
    {
      pnr: '2847 5591 023',
      train: 'Telangana Express',
      coach: 'B2 · Seat 34',
      status: 'Confirmed',
      probability: '96%',
    },
    {
      pnr: '9013 2246 887',
      train: 'Vande Bharat Express',
      coach: 'C1 · Seat 12',
      status: 'Likely to Confirm',
      probability: '88%',
    },
  ];

  const features = [
    {
      icon: <RadarIcon />,
      title: 'Live Tracking',
      desc: 'Real-time GPS position and delay updates for every train, refreshed every minute.',
    },
    {
      icon: <CoachIcon />,
      title: 'Coach Finder',
      desc: 'Locate your exact coach position on the platform before the train even arrives.',
    },
    {
      icon: <PredictIcon />,
      title: 'PNR Prediction',
      desc: 'Smart confirmation-probability forecasts based on historical booking patterns.',
    },
  ];

  const testimonials = [
    {
      name: 'Ananya R.',
      role: 'Frequent Commuter',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      quote: 'Knowing exactly where my coach stops on the platform saves me a mad dash every single time.',
    },
    {
      name: 'Vikram S.',
      role: 'Weekend Traveler',
      photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop',
      quote: 'The PNR predictor was spot on for my last three trips. Booking decisions feel far less stressful now.',
    },
    {
      name: 'Meera K.',
      role: 'Family Trip Planner',
      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop',
      quote: 'Live tracking meant we timed our arrival perfectly and never stood around waiting in the heat.',
    },
  ];

  const platformCoaches = ['S1', 'S2', 'A1', 'B1', 'B2', 'B3', 'H1'];

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
            <div id="search-container" ref={searchContainerRef} style={styles.searchCard}>
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
                    <span
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.35s ease',
                        transform: hoveredEl === 'swap' ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      ⇄
                    </span>
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

          {/* RIGHT COLUMN — Asymmetric Pinterest Collage (4 images) */}
          <div style={styles.heroRight}>
            <div style={styles.collageGrid}>
              {/* Column 1: one tall image spanning both rows */}
              <div style={{ ...styles.collageCard, gridColumn: '1', gridRow: '1 / span 3' }}>
                <img src={collageImages.tall.url} alt={collageImages.tall.alt} style={styles.collageImg} />
              </div>

              {/* Column 2: three stacked shorter images */}
              <div style={{ ...styles.collageCard, gridColumn: '2', gridRow: '1' }}>
                <img src={collageImages.top.url} alt={collageImages.top.alt} style={styles.collageImg} />
              </div>
              <div style={{ ...styles.collageCard, gridColumn: '2', gridRow: '2' }}>
                <img src={collageImages.mid.url} alt={collageImages.mid.alt} style={styles.collageImg} />
              </div>
              <div style={{ ...styles.collageCard, gridColumn: '2', gridRow: '3' }}>
                <img src={collageImages.bottom.url} alt={collageImages.bottom.alt} style={styles.collageImg} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- A. POPULAR SCENIC TRAIN JOURNEYS ---------------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Popular Scenic Train Journeys</h2>
          <p style={styles.sectionSubtitle}>Handpicked routes worth the window seat.</p>

          <div style={styles.scenicGrid}>
            {scenicJourneys.map((r, idx) => (
              <div
                key={r.name}
                style={{
                  ...styles.scenicCard,
                  ...(hoveredEl === `scenic-${idx}` ? styles.scenicCardHover : {}),
                }}
                onMouseEnter={() => setHoveredEl(`scenic-${idx}`)}
                onMouseLeave={() => setHoveredEl(null)}
              >
                <div style={styles.scenicImgWrap}>
                  <img src={r.image} alt={r.name} style={styles.scenicImg} />
                  <div style={styles.priceBadge}>{r.price}</div>
                </div>
                <div style={styles.scenicBody}>
                  <div style={styles.routeName}>{r.name}</div>
                  <div style={styles.routePath}>{r.route}</div>
                  <div style={styles.routeDuration}>
                    <ClockIcon />
                    <span>{r.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- B. LIVE PNR & SEAT AVAILABILITY ---------------- */}
        <section style={{ ...styles.section, backgroundColor: colors.bgAlt }}>
          <h2 style={styles.sectionTitle}>Live PNR &amp; Seat Availability</h2>
          <p style={styles.sectionSubtitle}>See exactly how a confirmation forecast looks before you travel.</p>

          <div style={styles.pnrGrid}>
            {pnrResults.map((p) => (
              <div key={p.pnr} style={styles.pnrCard}>
                <div style={styles.pnrTopRow}>
                  <span style={styles.pnrLabel}>PNR</span>
                  <span style={styles.pnrValue}>{p.pnr}</span>
                </div>
                <div style={styles.pnrTrainRow}>
                  <TrainSideIcon />
                  <span style={styles.pnrTrainName}>{p.train}</span>
                </div>
                <div style={styles.pnrDetailsRow}>
                  <div>
                    <div style={styles.pnrDetailLabel}>Coach / Seat</div>
                    <div style={styles.pnrDetailValue}>{p.coach}</div>
                  </div>
                  <div>
                    <div style={styles.pnrDetailLabel}>Confirmation Odds</div>
                    <div style={{ ...styles.pnrDetailValue, color: colors.green }}>{p.probability}</div>
                  </div>
                </div>
                <div style={styles.pnrStatusPill}>
                  <CheckCircleIcon />
                  <span>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- C. PLATFORM & COACH FINDER ---------------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Platform &amp; Coach Finder</h2>
          <p style={styles.sectionSubtitle}>
            See where coach <strong style={{ color: colors.accent }}>B2</strong> will line up on Platform 4 before the train pulls in.
          </p>

          <div style={styles.platformDiagramCard}>
            <div style={styles.platformLabelRow}>
              <span style={styles.platformBadge}>Platform 4</span>
              <span style={styles.platformDirection}>Train arriving from the North →</span>
            </div>

            <div style={styles.platformTrack}>
              {platformCoaches.map((coach) => (
                <div
                  key={coach}
                  style={{
                    ...styles.coachBlock,
                    ...(coach === 'B2' ? styles.coachBlockActive : {}),
                  }}
                >
                  {coach}
                  {coach === 'B2' && <div style={styles.coachPointer} />}
                </div>
              ))}
            </div>

            <div style={styles.platformFootnote}>
              Stand near the <strong>middle of the platform</strong> — coach B2 stops right where the marker points.
            </div>
          </div>
        </section>

        {/* ---------------- D. USER TESTIMONIALS ---------------- */}
        <section style={{ ...styles.section, backgroundColor: colors.bgAlt }}>
          <h2 style={styles.sectionTitle}>User Testimonials</h2>
          <p style={styles.sectionSubtitle}>Real feedback from travelers using SeatSeek every week.</p>

          <div style={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.name} style={styles.testimonialCard}>
                <div style={styles.testimonialStars}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <p style={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div style={styles.testimonialPersonRow}>
                  <img src={t.photo} alt={t.name} style={styles.testimonialPhoto} />
                  <div>
                    <div style={styles.testimonialName}>{t.name}</div>
                    <div style={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- WHY CHOOSE SEATSEEK ---------------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Choose SeatSeek?</h2>
          <p style={styles.sectionSubtitle}>Built to take the guesswork out of every journey.</p>

          <div style={styles.featureGrid}>
            {features.map((f, idx) => (
              <div
                key={f.title}
                style={{
                  ...styles.featureCard,
                  ...(hoveredEl === `feature-${idx}` ? styles.featureCardHover : {}),
                }}
                onMouseEnter={() => setHoveredEl(`feature-${idx}`)}
                onMouseLeave={() => setHoveredEl(null)}
              >
                <div style={styles.featureIconWrap}>{f.icon}</div>
                <div style={styles.featureTitle}>{f.title}</div>
                <div style={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- FOOTER ---------------- */}
        <footer style={styles.footer}>
          <button
            onClick={scrollToSearch}
            onMouseEnter={() => setHoveredEl('backToSearch')}
            onMouseLeave={() => setHoveredEl(null)}
            style={{
              ...styles.backToSearchBtn,
              ...(hoveredEl === 'backToSearch' ? styles.backToSearchBtnHover : {}),
            }}
          >
            <SearchIcon size={16} />
            <span>Search My Train</span>
          </button>
          <span style={styles.footerText}>© 2026 SeatSeek | Built for modern rail transit</span>
        </footer>
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
    overflowY: 'auto',
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
    textAlign: 'left',
  },
  subheadline: {
    fontSize: 16,
    color: colors.subtext,
    lineHeight: 1.6,
    margin: '0 0 28px',
    maxWidth: 460,
    textAlign: 'left',
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
    textAlign: 'left',
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
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: 800,
    color: colors.subtext,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 2,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: 15,
    fontWeight: 600,
    color: colors.text,
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    padding: 0,
  },
  swapBtn: {
    width: 44,
    height: 34,
    borderRadius: 999,
    border: `1.5px solid ${colors.border}`,
    backgroundColor: colors.card,
    fontSize: 16,
    color: colors.accent,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.25s ease',
    boxShadow: '0 4px 10px rgba(30, 41, 59, 0.08)',
  },
  swapBtnHover: {
    transform: 'translateY(-3px) scale(1.06)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
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
    textAlign: 'left',
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
    textAlign: 'left',
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

  // COLLAGE (asymmetric 4-image grid: 1 tall col + 3 stacked col)
  heroRight: {
    position: 'relative',
    width: '100%',
  },
  collageGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: 18,
    minHeight: 520,
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
    display: 'block',
  },

  // SECTIONS (shared)
  section: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '60px 48px',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: '#1E293B',
    margin: '0 0 8px',
    textAlign: 'left',
    letterSpacing: '-0.01em',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: colors.subtext,
    margin: '0 0 32px',
    textAlign: 'left',
  },

  // A. SCENIC JOURNEYS
  scenicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
  },
  scenicCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    overflow: 'hidden',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 10px 26px rgba(30, 41, 59, 0.06)',
    transition: 'all 0.25s ease',
  },
  scenicCardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 36px rgba(30, 41, 59, 0.14)',
  },
  scenicImgWrap: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  scenicImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.accent,
    color: '#fff',
    fontSize: 13,
    fontWeight: 800,
    padding: '5px 12px',
    borderRadius: 999,
    boxShadow: '0 6px 14px rgba(37, 99, 235, 0.35)',
  },
  scenicBody: {
    padding: '16px 18px 20px',
    textAlign: 'left',
  },
  routeName: {
    fontSize: 16,
    fontWeight: 800,
    color: '#1E293B',
    marginBottom: 4,
  },
  routePath: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.accent,
    marginBottom: 10,
  },
  routeDuration: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    color: colors.subtext,
    fontWeight: 600,
  },

  // B. LIVE PNR
  pnrGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 28,
  },
  pnrCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: '24px 26px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 10px 26px rgba(30, 41, 59, 0.06)',
    textAlign: 'left',
  },
  pnrTopRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  pnrLabel: {
    fontSize: 11,
    fontWeight: 800,
    color: colors.subtext,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    backgroundColor: colors.pill,
    padding: '4px 10px',
    borderRadius: 999,
  },
  pnrValue: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1E293B',
    letterSpacing: '0.02em',
  },
  pnrTrainRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  pnrTrainName: {
    fontSize: 19,
    fontWeight: 800,
    color: '#1E293B',
  },
  pnrDetailsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 18,
    paddingBottom: 18,
    borderBottom: `1px solid ${colors.border}`,
  },
  pnrDetailLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.subtext,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 4,
  },
  pnrDetailValue: {
    fontSize: 16,
    fontWeight: 800,
    color: '#1E293B',
  },
  pnrStatusPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.greenSoft,
    color: colors.green,
    fontSize: 14,
    fontWeight: 700,
    padding: '8px 16px',
    borderRadius: 999,
  },

  // C. PLATFORM & COACH FINDER
  platformDiagramCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: '32px 36px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 10px 26px rgba(30, 41, 59, 0.06)',
  },
  platformLabelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  platformBadge: {
    backgroundColor: colors.accent,
    color: '#fff',
    fontSize: 13,
    fontWeight: 800,
    padding: '6px 14px',
    borderRadius: 999,
  },
  platformDirection: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.subtext,
  },
  platformTrack: {
    display: 'flex',
    gap: 10,
    padding: '20px 0 40px',
    borderTop: `3px dashed ${colors.border}`,
    borderBottom: `3px dashed ${colors.border}`,
    overflowX: 'auto',
  },
  coachBlock: {
    position: 'relative',
    flex: '1 0 auto',
    minWidth: 64,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.pill,
    color: colors.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
  },
  coachBlockActive: {
    backgroundColor: colors.accent,
    color: '#fff',
    boxShadow: '0 10px 22px rgba(37, 99, 235, 0.35)',
    transform: 'scale(1.08)',
  },
  coachPointer: {
    position: 'absolute',
    bottom: -34,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: `10px solid ${colors.accent}`,
  },
  platformFootnote: {
    fontSize: 14,
    color: colors.subtext,
    marginTop: 20,
    textAlign: 'left',
  },

  // D. TESTIMONIALS
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 28,
  },
  testimonialCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: '26px 24px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 10px 26px rgba(30, 41, 59, 0.06)',
    textAlign: 'left',
  },
  testimonialStars: {
    display: 'flex',
    gap: 3,
    marginBottom: 14,
  },
  testimonialQuote: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 1.6,
    margin: '0 0 20px',
  },
  testimonialPersonRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  testimonialPhoto: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    objectFit: 'cover',
    display: 'block',
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: 800,
    color: '#1E293B',
  },
  testimonialRole: {
    fontSize: 12,
    color: colors.subtext,
    fontWeight: 600,
  },

  // FEATURES
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 28,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: '28px 24px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 10px 26px rgba(30, 41, 59, 0.05)',
    textAlign: 'left',
    transition: 'all 0.25s ease',
  },
  featureCardHover: {
    transform: 'translateY(-6px) scale(1.02)',
    boxShadow: '0 20px 36px rgba(30, 41, 59, 0.12)',
  },
  featureIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.accentSoft,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#1E293B',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: colors.subtext,
    lineHeight: 1.6,
  },

  // FOOTER
  footer: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '40px 48px',
    textAlign: 'center',
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
  },
  backToSearchBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 28px',
    borderRadius: 999,
    border: 'none',
    backgroundColor: colors.accent,
    color: '#fff',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 10px 24px rgba(37, 99, 235, 0.3)',
    transition: 'all 0.25s ease',
  },
  backToSearchBtnHover: {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: '0 16px 30px rgba(37, 99, 235, 0.4)',
  },
  footerText: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.subtext,
  },
};

export default App;