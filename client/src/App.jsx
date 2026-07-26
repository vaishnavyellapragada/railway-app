import React, { useState, useEffect } from "react";

export default function App() {
  const [mode, setMode] = useState("find");
  const [swapHover, setSwapHover] = useState(false);
  const [time, setTime] = useState(new Date());
  const [hoverStates, setHoverStates] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const setHover = (key, val) =>
    setHoverStates((prev) => ({ ...prev, [key]: val }));

  const scrollToSearch = () => {
    document.getElementById("search-container")?.scrollIntoView({ behavior: "smooth" });
  };

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const colors = {
    bg: "#FAF3E0",
    card: "#FFFFFF",
    text: "#1E293B",
    subtext: "#64748B",
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    border: "#E7DFCB",
    accent: "#F59E0B",
  };

  const routes = [
    {
      name: "Vande Bharat Express",
      desc: "India's fastest semi-high-speed train, connecting major metros in record time.",
      img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Mandovi Express",
      desc: "A coastal ride hugging the Konkan shoreline with sweeping sea views.",
      img: "https://images.unsplash.com/photo-1541892079-2470a1332a65?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Darjeeling Toy Train",
      desc: "A UNESCO heritage narrow-gauge climb through misty Himalayan foothills.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Golden Chariot",
      desc: "A luxury heritage journey through South India's royal landmarks.",
      img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const testimonials = [
    {
      name: "Ananya R.",
      quote:
        "SeatSeek told me my waitlisted ticket would confirm two days before it actually did. Uncannily accurate.",
      role: "Frequent commuter, Chennai",
    },
    {
      name: "Rohit M.",
      quote:
        "The coach position finder saved me a mad dash across the platform. Knew exactly where to stand.",
      role: "Weekend traveler, Pune",
    },
    {
      name: "Fatima K.",
      quote:
        "Clean interface, fast search, and the recent searches panel remembers exactly what I need.",
      role: "Business traveler, Hyderabad",
    },
  ];

  const features = [
    {
      title: "Real-Time Tracking",
      desc: "Live train positions updated every few seconds, straight from the network.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      title: "Seat Confirmation AI",
      desc: "Our predictor analyzes historical booking patterns to forecast your odds.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      ),
    },
    {
      title: "Coach Position Finder",
      desc: "See exactly where your coach stops on the platform before you arrive.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
          <rect x="3" y="7" width="18" height="10" rx="2" />
          <path d="M7 21l2-4M17 21l-2-4" />
        </svg>
      ),
    },
  ];

  const pillButtonStyle = (hovered) => ({
    padding: "10px 22px",
    borderRadius: "999px",
    border: "none",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
  });

  const cardBase = (hovered) => ({
    backgroundColor: colors.card,
    borderRadius: "18px",
    transition: "all 0.25s ease",
    transform: hovered ? "translateY(-6px)" : "translateY(0)",
    boxShadow: hovered
      ? "0 20px 35px rgba(30,41,59,0.14)"
      : "0 6px 16px rgba(30,41,59,0.06)",
  });

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: "100vh", width: "100%", color: colors.text }}>
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          max-width: none !important;
          width: 100vw;
          min-height: 100vh;
          overflow-x: hidden;
          background-color: #FAF3E0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        * { box-sizing: border-box; }
        input::placeholder { color: #94A3B8; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-thumb { background: #E7DFCB; border-radius: 10px; }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(250,243,224,0.85)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="3" width="16" height="13" rx="4" fill={colors.primary} />
            <circle cx="8" cy="19" r="1.8" fill={colors.text} />
            <circle cx="16" cy="19" r="1.8" fill={colors.text} />
            <rect x="6.5" y="5.5" width="11" height="5" rx="1.5" fill="#FAF3E0" />
            <path d="M6 16l-2 3M18 16l2 3" stroke={colors.text} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px" }}>
            SeatSeek
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            EN
          </div>
          <div
            style={{
              fontVariantNumeric: "tabular-nums",
              fontSize: "14px",
              fontWeight: 600,
              color: colors.subtext,
              padding: "8px 14px",
              borderRadius: "999px",
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            {timeString}
          </div>
          <button
            onMouseEnter={() => setHover("login", true)}
            onMouseLeave={() => setHover("login", false)}
            style={{
              ...pillButtonStyle(hoverStates.login),
              backgroundColor: "transparent",
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            Log in
          </button>
          <button
            onMouseEnter={() => setHover("signup", true)}
            onMouseLeave={() => setHover("signup", false)}
            style={{
              ...pillButtonStyle(hoverStates.signup),
              backgroundColor: colors.primary,
              color: "#fff",
              boxShadow: hoverStates.signup
                ? "0 12px 20px rgba(37,99,235,0.35)"
                : "0 6px 14px rgba(37,99,235,0.2)",
            }}
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "48px",
          padding: "40px 48px 60px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN */}
        <div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 800,
              lineHeight: 1.1,
              color: colors.text,
              margin: "0 0 28px 0",
              letterSpacing: "-1px",
            }}
          >
            Find your next train journey with SeatSeek
          </h1>

          {/* MODE SWITCHER */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: colors.card,
              borderRadius: "999px",
              padding: "6px",
              border: `1px solid ${colors.border}`,
              marginBottom: "20px",
            }}
          >
            <div
              onClick={() => setMode("find")}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                backgroundColor: mode === "find" ? colors.primary : "transparent",
                color: mode === "find" ? "#fff" : colors.subtext,
              }}
            >
              Find Trains
            </div>
            <div
              onClick={() => setMode("track")}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                backgroundColor: mode === "track" ? colors.primary : "transparent",
                color: mode === "track" ? "#fff" : colors.subtext,
              }}
            >
              Track Train
            </div>
          </div>

          {/* SEARCH BOX */}
          <div
            id="search-container"
            style={{
              backgroundColor: colors.card,
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(30,41,59,0.08)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: colors.subtext, textAlign: "left", marginBottom: "6px" }}>
                  FROM
                </div>
                <input
                  type="text"
                  placeholder="Hyderabad (HYB)"
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: colors.text,
                    textAlign: "left",
                    backgroundColor: "transparent",
                  }}
                />
              </div>

              <button
                onMouseEnter={() => setSwapHover(true)}
                onMouseLeave={() => setSwapHover(false)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "999px",
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.border}`,
                  boxShadow: "0 4px 10px rgba(30,41,59,0.08)",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                  transform: swapHover ? "rotate(180deg)" : "rotate(0deg)",
                  color: colors.primary,
                }}
              >
                ⇄
              </button>

              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: colors.subtext, textAlign: "left", marginBottom: "6px" }}>
                  TO
                </div>
                <input
                  type="text"
                  placeholder="Bengaluru (SBC)"
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: colors.text,
                    textAlign: "left",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>

            <div style={{ height: "1px", backgroundColor: colors.border, margin: "18px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "13px", color: colors.subtext, fontWeight: 600 }}>
                Today · General quota
              </div>
              <button
                onMouseEnter={() => setHover("search", true)}
                onMouseLeave={() => setHover("search", false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "14px",
                  border: "none",
                  backgroundColor: colors.primary,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: hoverStates.search ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoverStates.search
                    ? "0 16px 28px rgba(37,99,235,0.35)"
                    : "0 8px 16px rgba(37,99,235,0.22)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* RECENT SEARCHES */}
          <div
            style={{
              backgroundColor: colors.card,
              borderRadius: "18px",
              padding: "18px 22px",
              marginTop: "18px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: colors.text }}>
              Recent Searches
            </div>
            {[
              "17254 - Guntur Express",
              "12628 - Karnataka Express",
            ].map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHover(`recent${i}`, true)}
                onMouseLeave={() => setHover(`recent${i}`, false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 8px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backgroundColor: hoverStates[`recent${i}`] ? "#FAF3E0" : "transparent",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: colors.text }}>{item}</span>
                <span style={{ color: colors.primary, fontWeight: 700 }}>→</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — PINTEREST GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            maxHeight: "480px",
          }}
        >
          <div style={{ height: "220px", borderRadius: "20px", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
              alt="Passengers on sunlit platform"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
            />
          </div>
          <div style={{ height: "240px", borderRadius: "20px", overflow: "hidden", marginTop: "24px" }}>
            <img
              src="https://images.unsplash.com/photo-1541892079-2470a1332a65?auto=format&fit=crop&w=600&q=80"
              alt="Passenger inside carriage"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
            />
          </div>
          <div style={{ height: "240px", borderRadius: "20px", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80"
              alt="Express train on rails"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
            />
          </div>
          <div style={{ height: "220px", borderRadius: "20px", overflow: "hidden", marginTop: "24px" }}>
            <img
              src="https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=600&q=80"
              alt="Cozy train interior"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: POPULAR SCENIC ROUTES */}
      <section style={{ padding: "60px 48px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "28px", color: colors.text }}>
          Popular Scenic Express Routes
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {routes.map((r, i) => (
            <div
              key={i}
              onMouseEnter={() => setHover(`route${i}`, true)}
              onMouseLeave={() => setHover(`route${i}`, false)}
              style={{
                ...cardBase(hoverStates[`route${i}`]),
                overflow: "hidden",
              }}
            >
              <div style={{ height: "180px", width: "100%", overflow: "hidden" }}>
                <img
                  src={r.img}
                  alt={r.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "6px", color: colors.text }}>
                  {r.name}
                </div>
                <div style={{ fontSize: "13px", color: colors.subtext, lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PNR PREDICTOR */}
      <section style={{ padding: "20px 48px 60px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "28px", color: colors.text }}>
          Live PNR &amp; Seat Confirmation Predictor
        </h2>
        <div
          onMouseEnter={() => setHover("pnr", true)}
          onMouseLeave={() => setHover("pnr", false)}
          style={{
            ...cardBase(hoverStates.pnr),
            padding: "32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
          }}
        >
          {[
            { label: "Confirmation Chance", value: "92%", color: "#16A34A" },
            { label: "Waitlist Position", value: "WL 4", color: colors.accent },
            { label: "Berth Preference Match", value: "Lower", color: colors.primary },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px" }}>
              <div style={{ fontSize: "32px", fontWeight: 800, color: stat.color, marginBottom: "8px" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "14px", color: colors.subtext, fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PLATFORM & COACH FINDER */}
      <section style={{ padding: "0 48px 60px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "28px", color: colors.text }}>
          Platform &amp; Coach Position Finder
        </h2>
        <div
          style={{
            backgroundColor: colors.card,
            borderRadius: "18px",
            padding: "32px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ fontSize: "14px", color: colors.subtext, marginBottom: "18px", fontWeight: 600 }}>
            Platform 4 · Entry gate on the left
          </div>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
            {["S1", "S2", "S3", "B1", "B2", "A1", "A2", "H1"].map((coach, i) => (
              <div
                key={i}
                style={{
                  minWidth: "64px",
                  height: "56px",
                  borderRadius: "10px",
                  backgroundColor: i === 4 ? colors.primary : colors.bg,
                  color: i === 4 ? "#fff" : colors.text,
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {coach}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE SEATSEEK */}
      <section style={{ padding: "0 48px 60px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "28px", color: colors.text }}>
          Why Choose SeatSeek
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {features.map((f, i) => (
            <div
              key={i}
              onMouseEnter={() => setHover(`feat${i}`, true)}
              onMouseLeave={() => setHover(`feat${i}`, false)}
              style={{ ...cardBase(hoverStates[`feat${i}`]), padding: "28px" }}
            >
              <div style={{ marginBottom: "14px" }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "17px", marginBottom: "8px", color: colors.text }}>
                {f.title}
              </div>
              <div style={{ fontSize: "14px", color: colors.subtext, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section style={{ padding: "0 48px 70px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "28px", color: colors.text }}>
          Traveler Reviews
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              onMouseEnter={() => setHover(`test${i}`, true)}
              onMouseLeave={() => setHover(`test${i}`, false)}
              style={{ ...cardBase(hoverStates[`test${i}`]), padding: "26px" }}
            >
              <div style={{ fontSize: "15px", color: colors.text, lineHeight: 1.6, marginBottom: "16px" }}>
                “{t.quote}”
              </div>
              <div style={{ fontWeight: 700, fontSize: "14px", color: colors.text }}>{t.name}</div>
              <div style={{ fontSize: "13px", color: colors.subtext }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#1E293B",
          color: "#F1F5F9",
          padding: "48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px" }}>SeatSeek</div>
          <div style={{ fontSize: "13px", color: "#94A3B8" }}>
            © {new Date().getFullYear()} SeatSeek. All journeys tracked responsibly.
          </div>
        </div>
        <button
          onClick={scrollToSearch}
          onMouseEnter={() => setHover("footerCta", true)}
          onMouseLeave={() => setHover("footerCta", false)}
          style={{
            padding: "16px 32px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: colors.primary,
            color: "#fff",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            transition: "all 0.25s ease",
            transform: hoverStates.footerCta ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hoverStates.footerCta
              ? "0 16px 28px rgba(37,99,235,0.4)"
              : "0 8px 16px rgba(37,99,235,0.25)",
          }}
        >
          Search My Train
        </button>
      </footer>
    </div>
  );
}