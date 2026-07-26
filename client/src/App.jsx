import React, { useState, useEffect } from "react";

// ---------- Shared image fallback handler ----------
const handleImgError = (e) => {
  e.target.style.display = "none";
  if (e.target.parentNode) {
    e.target.parentNode.style.background = "linear-gradient(135deg, #1e293b, #2563eb)";
    e.target.parentNode.style.display = "flex";
    e.target.parentNode.style.alignItems = "center";
    e.target.parentNode.style.justifyContent = "center";
  }
};

// ---------- Data ----------
const heroImages = [
  {
    url: "https://picsum.photos/id/1025/600/400",
    height: 200,
  },
  {
    url: "https://picsum.photos/id/1033/600/400",
    height: 210,
  },
  {
    url: "https://picsum.photos/id/1018/600/400",
    height: 210,
  },
  {
    url: "https://picsum.photos/id/1043/600/400",
    height: 200,
  },
];

const scenicJourneys = [
  {
    name: "Mandovi Express",
    route: "Mumbai → Goa",
    duration: "11h 40m",
    price: "₹850",
    img: "https://picsum.photos/id/1015/600/400",
  },
  {
    name: "Vande Bharat Express",
    route: "Delhi → Varanasi",
    duration: "8h 05m",
    price: "₹1,450",
    img: "https://picsum.photos/id/1035/600/400",
  },
  {
    name: "Golden Chariot",
    route: "Bengaluru → Hampi",
    duration: "2 nights",
    price: "₹42,000",
    img: "https://picsum.photos/id/1040/600/400",
  },
  {
    name: "Darjeeling Toy Train",
    route: "NJP → Darjeeling",
    duration: "7h 15m",
    price: "₹1,100",
    img: "https://picsum.photos/id/1050/600/400",
  },
];

const pnrCards = [
  {
    train: "Telangana Express",
    pnr: "2847 5591 023",
    coach: "B2",
    seat: "34",
    odds: 96,
    badge: "Confirmed",
    badgeColor: "#16A34A",
    badgeBg: "#DCFCE7",
  },
  {
    train: "Vande Bharat Express",
    pnr: "9013 2246 887",
    coach: "C1",
    seat: "12",
    odds: 88,
    badge: "Likely to Confirm",
    badgeColor: "#65A30D",
    badgeBg: "#ECFCCB",
  },
];

const testimonials = [
  {
    name: "Ananya R.",
    role: "Frequent Commuter",
    quote:
      "SeatSeek turned my anxious PNR-refreshing habit into a five-second glance. The confirmation odds are scarily accurate.",
  },
  {
    name: "Vikram S.",
    role: "Weekend Traveler",
    quote:
      "The coach finder saved me a frantic sprint down the platform. I knew exactly where B2 would stop before the train even arrived.",
  },
  {
    name: "Meera K.",
    role: "Family Trip Planner",
    quote:
      "Booking scenic routes for the whole family used to be a spreadsheet nightmare. Now it's just a couple of taps.",
  },
];

const features = [
  {
    icon: "📍",
    title: "Live Tracking",
    desc: "Real-time train positions updated every 30 seconds, right down to the platform.",
  },
  {
    icon: "🚉",
    title: "Coach Finder",
    desc: "Know exactly where your coach will halt before the train even pulls in.",
  },
  {
    icon: "🎯",
    title: "PNR Prediction",
    desc: "Confirmation odds powered by historical booking patterns, not guesswork.",
  },
];

// ---------- Reusable bits ----------
function ImageBox({ src, alt, style }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "160px",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#e2e8f0",
        position: "relative",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        onError={handleImgError}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function StarRow() {
  return (
    <div style={{ color: "#F59E0B", fontSize: 16, letterSpacing: 2 }}>
      {"★★★★★"}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("find");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const scrollToSearch = () => {
    document.getElementById("search-container")?.scrollIntoView({ behavior: "smooth" });
  };

  const cardShadow = "0 4px 16px rgba(30, 41, 59, 0.08)";

  return (
    <div style={{ backgroundColor: "#FAF3E0", minHeight: "100vh", width: "100vw", color: "#1E293B" }}>
      <style>{`
        html, body, #root { margin: 0; padding: 0; max-width: none !important; width: 100vw; min-height: 100vh; overflow-x: hidden; background-color: #FAF3E0; font-family: system-ui, -apple-system, sans-serif; }
        * { box-sizing: border-box; }
        button { font-family: inherit; cursor: pointer; }
        input { font-family: inherit; }
        .ss-btn-hover:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25); }
        .ss-card-hover:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(30,41,59,0.12); }
        .ss-scroll::-webkit-scrollbar { height: 8px; }
        .ss-scroll::-webkit-scrollbar-thumb { background: #E2D5B8; border-radius: 8px; }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 48px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(30,41,59,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🚆</span>
          <span style={{ fontWeight: 800, fontSize: 22, color: "#1E293B", letterSpacing: -0.5 }}>
            SeatSeek
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              backgroundColor: "#FAF3E0",
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: "#1E293B",
            }}
          >
            EN
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#64748B", fontVariantNumeric: "tabular-nums" }}>
            {timeStr}
          </span>
          <button
            className="ss-btn-hover"
            style={{
              background: "transparent",
              border: "1px solid #CBD5E1",
              borderRadius: 10,
              padding: "9px 18px",
              fontWeight: 600,
              fontSize: 14,
              color: "#1E293B",
              transition: "all 0.2s ease",
            }}
          >
            Log in
          </button>
          <button
            className="ss-btn-hover"
            style={{
              background: "#2563EB",
              border: "none",
              borderRadius: 10,
              padding: "9px 18px",
              fontWeight: 600,
              fontSize: 14,
              color: "#FFFFFF",
              transition: "all 0.2s ease",
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
          gap: 48,
          padding: "56px 48px",
          maxWidth: 1320,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN */}
        <div>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 24px 0",
              color: "#1E293B",
              letterSpacing: -1,
            }}
          >
            Find your next train journey with SeatSeek
          </h1>

          {/* Mode tabs */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 4,
              marginBottom: 24,
              boxShadow: cardShadow,
            }}
          >
            <button
              onClick={() => setMode("find")}
              style={{
                border: "none",
                borderRadius: 9,
                padding: "10px 22px",
                fontWeight: 700,
                fontSize: 14,
                backgroundColor: mode === "find" ? "#2563EB" : "transparent",
                color: mode === "find" ? "#FFFFFF" : "#64748B",
                transition: "all 0.2s ease",
              }}
            >
              Find Trains
            </button>
            <button
              onClick={() => setMode("track")}
              style={{
                border: "none",
                borderRadius: 9,
                padding: "10px 22px",
                fontWeight: 700,
                fontSize: 14,
                backgroundColor: mode === "track" ? "#2563EB" : "transparent",
                color: mode === "track" ? "#FFFFFF" : "#64748B",
                transition: "all 0.2s ease",
              }}
            >
              Track Train
            </button>
          </div>

          {/* Search box */}
          <div
            id="search-container"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 18,
              padding: 20,
              boxShadow: cardShadow,
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              scrollMarginTop: 100,
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 1 }}>
                FROM
              </label>
              <input
                defaultValue="New Delhi"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1E293B",
                  padding: 0,
                }}
              />
            </div>

            <div
              style={{
                width: 40,
                height: 40,
                minWidth: 40,
                borderRadius: 999,
                border: "1px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#2563EB",
                boxShadow: "0 2px 6px rgba(30,41,59,0.08)",
                cursor: "pointer",
              }}
            >
              ⇄
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 1 }}>
                TO
              </label>
              <input
                defaultValue="Mumbai Central"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1E293B",
                  padding: 0,
                }}
              />
            </div>

            <button
              className="ss-btn-hover"
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 12,
                padding: "14px 28px",
                fontWeight: 700,
                fontSize: 15,
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              Search
            </button>
          </div>

          {/* Recent searches */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 18,
              boxShadow: cardShadow,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", marginBottom: 12, letterSpacing: 0.5 }}>
              RECENT SEARCHES
            </div>
            {[
              { code: "17254", name: "Guntur Express" },
              { code: "12628", name: "Karnataka Express" },
            ].map((r) => (
              <div
                key={r.code}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderTop: "1px solid #F1F5F9",
                }}
              >
                <span style={{ fontSize: 18 }}>🚄</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: "#1E293B" }}>
                  {r.code} - {r.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — image grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            maxHeight: 420,
          }}
        >
          <ImageBox src={heroImages[0].url} alt="High-speed train" style={{ height: heroImages[0].height }} />
          <ImageBox src={heroImages[1].url} alt="Vande Bharat Express" style={{ height: heroImages[1].height }} />
          <ImageBox src={heroImages[2].url} alt="Train interior" style={{ height: heroImages[2].height }} />
          <ImageBox src={heroImages[3].url} alt="Platform passengers" style={{ height: heroImages[3].height }} />
        </div>
      </section>

      {/* SECTION 1: Popular Scenic Train Journeys */}
      <section style={{ padding: "24px 48px", maxWidth: 1320, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, color: "#1E293B" }}>
          Popular Scenic Train Journeys
        </h2>
        <div
          className="ss-scroll"
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            paddingBottom: 12,
          }}
        >
          {scenicJourneys.map((j) => (
            <div
              key={j.name}
              className="ss-card-hover"
              style={{
                minWidth: 270,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: cardShadow,
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              <div style={{ position: "relative", height: 160 }}>
                <ImageBox src={j.img} alt={j.name} style={{ height: 160, borderRadius: 0 }} />
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "#2563EB",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "5px 12px",
                    borderRadius: 999,
                    boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
                  }}
                >
                  {j.price}
                </span>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1E293B", marginBottom: 4 }}>
                  {j.name}
                </div>
                <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>{j.route}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>⏱ {j.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Live PNR & Seat Availability */}
      <section style={{ padding: "24px 48px", maxWidth: 1320, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, color: "#1E293B" }}>
          Live PNR &amp; Seat Availability
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {pnrCards.map((p) => (
            <div
              key={p.pnr}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 22,
                boxShadow: cardShadow,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: "#1E293B" }}>{p.train}</div>
                  <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4, letterSpacing: 0.5 }}>
                    PNR {p.pnr}
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: p.badgeBg,
                    color: p.badgeColor,
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "6px 12px",
                    borderRadius: 999,
                  }}
                >
                  {p.badge}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, color: "#64748B" }}>
                  Coach/Seat: <strong style={{ color: "#1E293B" }}>{p.coach} · Seat {p.seat}</strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>Confirmation Odds</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#2563EB" }}>{p.odds}%</div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 12,
                  height: 8,
                  backgroundColor: "#F1F5F9",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${p.odds}%`,
                    height: "100%",
                    backgroundColor: p.badgeColor,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Platform & Coach Finder */}
      <section style={{ padding: "24px 48px", maxWidth: 1320, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, color: "#1E293B" }}>
          Platform &amp; Coach Finder
        </h2>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 28,
            boxShadow: cardShadow,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <span
              style={{
                backgroundColor: "#1E293B",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 13,
                padding: "6px 14px",
                borderRadius: 8,
              }}
            >
              Platform 4
            </span>
            <span style={{ fontSize: 13, color: "#94A3B8" }}>Vande Bharat Express · arriving in 6 min</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, overflowX: "auto" }}>
            {["S1", "S2", "A1", "B1", "B2", "B3", "H1"].map((coach) => {
              const active = coach === "B2";
              return (
                <div key={coach} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 64 }}>
                  {active && <div style={{ fontSize: 18, color: "#2563EB" }}>▼</div>}
                  <div
                    style={{
                      width: 64,
                      height: active ? 64 : 52,
                      borderRadius: 12,
                      backgroundColor: active ? "#2563EB" : "#FAF3E0",
                      color: active ? "#FFFFFF" : "#1E293B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14,
                      boxShadow: active ? "0 6px 16px rgba(37,99,235,0.35)" : "none",
                      border: active ? "none" : "1px solid #EDE4CC",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {coach}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 20,
              height: 6,
              borderRadius: 999,
              background: "repeating-linear-gradient(90deg, #E2D5B8 0, #E2D5B8 10px, transparent 10px, transparent 20px)",
            }}
          />
        </div>
      </section>

      {/* SECTION 4: Testimonials */}
      <section style={{ padding: "24px 48px", maxWidth: 1320, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, color: "#1E293B" }}>
          User Testimonials
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 22,
                boxShadow: cardShadow,
              }}
            >
              <StarRow />
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: "14px 0 18px 0" }}>
                “{t.quote}”
              </p>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1E293B" }}>{t.name}</div>
              <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Why Choose SeatSeek */}
      <section style={{ padding: "24px 48px", maxWidth: 1320, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, color: "#1E293B" }}>
          Why Choose SeatSeek?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((f) => (
            <div
              key={f.title}
              className="ss-card-hover"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 26,
                boxShadow: cardShadow,
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #1e293b, #2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#1E293B", marginBottom: 8 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 48px 40px 48px", textAlign: "center" }}>
        <button
          onClick={scrollToSearch}
          className="ss-btn-hover"
          style={{
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 14,
            padding: "16px 36px",
            fontWeight: 700,
            fontSize: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 6px 20px rgba(37,99,235,0.3)",
            transition: "all 0.2s ease",
            marginBottom: 24,
          }}
        >
          🔍 Search My Train
        </button>
        <div style={{ fontSize: 13, color: "#94A3B8" }}>
          © 2026 SeatSeek | Built for modern rail transit
        </div>
      </footer>
    </div>
  );
}