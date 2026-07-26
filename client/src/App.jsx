import React, { useState, useEffect } from "react";
import { auth, loginWithGoogle, logoutUser } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

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
  const [searchMode, setSearchMode] = useState("find");
  const [now, setNow] = useState(new Date());
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

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

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setIsAuthModalOpen(false);
    } catch (err) {
      console.error("Google sign-in failed", err);
    }
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
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important; -webkit-text-fill-color: #1e293b !important; }
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
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  onError={handleImgError}
                  style={{ width: 34, height: 34, borderRadius: 999, objectFit: "cover", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #1e293b, #2563eb)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{ fontWeight: 600, fontSize: 14, color: "#1E293B", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.displayName || user.email}
              </span>
              <button
                className="ss-btn-hover"
                onClick={() => logoutUser()}
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
                Log out
              </button>
            </div>
          ) : (
            <>
              <button
                className="ss-btn-hover"
                onClick={() => setIsAuthModalOpen(true)}
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
                onClick={() => setIsAuthModalOpen(true)}
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
            </>
          )}
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
              onClick={() => setSearchMode("find")}
              style={{
                border: "none",
                borderRadius: 9,
                padding: "10px 22px",
                fontWeight: 700,
                fontSize: 14,
                backgroundColor: searchMode === "find" ? "#2563EB" : "transparent",
                color: searchMode === "find" ? "#FFFFFF" : "#64748B",
                transition: "all 0.2s ease",
              }}
            >
              Find Trains
            </button>
            <button
              onClick={() => setSearchMode("track")}
              style={{
                border: "none",
                borderRadius: 9,
                padding: "10px 22px",
                fontWeight: 700,
                fontSize: 14,
                backgroundColor: searchMode === "track" ? "#2563EB" : "transparent",
                color: searchMode === "track" ? "#FFFFFF" : "#64748B",
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
            {searchMode === "find" ? (
              <>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 1 }}>
                    FROM
                  </label>
                  <input
                    defaultValue="New Delhi"
                    style={{
                      background: "transparent",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#1e293b",
                      width: "100%",
                      fontSize: 15,
                      fontWeight: 600,
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
                      background: "transparent",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#1e293b",
                      width: "100%",
                      fontSize: 15,
                      fontWeight: 600,
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
              </>
            ) : (
              <>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 1 }}>
                    TRAIN NUMBER OR NAME
                  </label>
                  <input
                    placeholder="e.g., 17254 or Guntur Express"
                    style={{
                      background: "transparent",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#1e293b",
                      width: "100%",
                      fontSize: 15,
                      fontWeight: 600,
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  📡 Track
                </button>
              </>
            )}
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

      {/* AUTH MODAL */}
      {isAuthModalOpen && (
        <div
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 32,
              maxWidth: 400,
              width: "100%",
              position: "relative",
              boxShadow: "0 20px 60px rgba(15,23,42,0.3)",
            }}
          >
            <button
              onClick={() => setIsAuthModalOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "#F1F5F9",
                border: "none",
                borderRadius: 999,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#64748B",
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ fontSize: 34 }}>🚆</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: "12px 0 8px 0" }}>
                Welcome to SeatSeek
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, margin: "0 0 24px 0" }}>
                Sign in to track trains, save favorite routes, and view live PNR updates.
              </p>

              <button
                className="ss-btn-hover"
                onClick={handleGoogleLogin}
                style={{
                  width: "100%",
                  backgroundColor: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 20px",
                  fontWeight: 700,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFFFFF" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z" />
                  <path fill="#FFFFFF" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.9v2.34C2.38 15.98 5.48 18 9 18z" />
                  <path fill="#FFFFFF" d="M3.95 10.7c-.18-.54-.28-1.11-.28-1.7s.1-1.16.28-1.7V4.96H.9C.33 6.1 0 7.51 0 9s.33 2.9.9 4.04l3.05-2.34z" />
                  <path fill="#FFFFFF" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.38 2.02.9 4.96l3.05 2.34C4.66 5.16 6.65 3.58 9 3.58z" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}