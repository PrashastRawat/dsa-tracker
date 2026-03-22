import { useTheme, THEMES } from "../context/ThemeContext";

const META = {
  f1: {
    title: "Red Bull Racing",
    sub: "150 problems. No pitstops. Fastest lap wins.",
    badge: "🏎️  DARK MODE — RED BULL F1",
    bg: "radial-gradient(ellipse at 20% 50%, #001440 0%, #00040f 60%, #0a0000 100%)",
    glow1: "#00a3ff", glow2: "#ff1801",
    particles: ["🏎️","⚡","🔵","🔴","💨"],
  },
  valorant: {
    title: "Enter the Protocol",
    sub: "Instalock your topic. Study the meta. Clutch the interview.",
    badge: "🎯  LIGHT MODE — VALORANT",
    bg: "linear-gradient(135deg, #fffff0 0%, #fff8dc 50%, #fff0c0 100%)",
    glow1: "#ff4655", glow2: "#ffd700",
    particles: ["🎯","⚔️","🛡️","💥","👁️"],
  },
  sakura: {
    title: "桜の道",
    sub: "The path of cherry blossoms. Every problem, a petal falling.",
    badge: "🌸  SAKURA MODE",
    bg: "radial-gradient(ellipse at 50% 30%, #ffe4ef 0%, #fff0f5 60%, #ffd6e7 100%)",
    glow1: "#e8005a", glow2: "#ff85b3",
    particles: ["🌸","🌺","🍃","✨","🌷"],
  },
  monster: {
    title: "WAKE UP, NEO.",
    sub: "The Matrix has you. Take the green pill. Ship the code.",
    badge: "💊  MATRIX MODE",
    bg: "radial-gradient(ellipse at 50% 50%, #0f2e0f 0%, #000000 70%)",
    glow1: "#00ea00", glow2: "#aaff00",
    particles: ["💊","🐇","🖥️","⌨️","👾"],
  },
};

export default function LoginPage() {
  const { theme, setTheme } = useTheme();
  const m = META[theme];

  return (
    <div style={{
      minHeight: "100vh", background: m.bg,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: 20, position: "relative", overflow: "hidden",
    }}>
      {/* Floating particles */}
      {m.particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", fontSize: [32,22,40,24,20][i],
          top: `${[15,70,30,80,50][i]}%`,
          left: `${[10,85,50,20,70][i]}%`,
          opacity: 0.14, pointerEvents: "none",
          animation: `float${i} ${3+i}s ease-in-out infinite alternate`,
        }}>{p}</div>
      ))}

      {/* Theme selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap", justifyContent: "center", zIndex: 2 }}>
        {THEMES.map(t => (
          <button key={t.id} onClick={() => setTheme(t.id)} style={{
            padding: "9px 20px", borderRadius: 24, cursor: "pointer",
            border: `2px solid ${theme === t.id ? "var(--accent)" : "var(--border)"}`,
            background: theme === t.id ? "var(--nav-active-bg)" : "var(--surface)",
            color: theme === t.id ? "var(--accent)" : "var(--text-muted)",
            fontSize: 14, fontFamily: "DM Sans, sans-serif", fontWeight: 700,
            transition: "all 0.2s",
            boxShadow: theme === t.id ? "0 0 20px var(--card-glow)" : "none",
          }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{
        background: "var(--surface)", border: "2px solid var(--accent)",
        borderRadius: 24, padding: "52px 48px", textAlign: "center",
        maxWidth: 460, width: "100%", zIndex: 2,
        boxShadow: `0 0 80px var(--card-glow), 0 0 160px var(--card-glow), inset 0 0 40px #ffffff04`,
      }}>
        <div className="font-label" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: 4, marginBottom: 16 }}>
          {m.badge}
        </div>
        <h1 className="font-heading" style={{
          fontSize: 46, color: "var(--heading-color)", lineHeight: 1.05, marginBottom: 12,
          textShadow: `0 0 40px var(--accent)`,
        }}>
          DSA Tracker
        </h1>
        <h2 className="font-heading" style={{ fontSize: 22, color: "var(--accent)", marginBottom: 12, opacity: 0.9 }}>
          {m.title}
        </h2>
        <p className="font-content" style={{ fontSize: 22, color: "var(--text-muted)", marginBottom: 40, lineHeight: 1.5 }}>
          {m.sub}
        </p>

        <a href="http://localhost:8000/auth/login" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
          background: "var(--login-btn-bg)", color: "var(--login-btn-color)",
          textDecoration: "none", padding: "16px 32px", borderRadius: 14,
          fontWeight: 800, fontSize: 17, transition: "all 0.2s", width: "100%",
          fontFamily: "DM Sans, sans-serif", letterSpacing: 0.5,
          boxShadow: `0 8px 32px var(--card-glow)`,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 16px 48px var(--card-glow)`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 8px 32px var(--card-glow)`; }}
        >
          <svg width="22" height="22" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.83l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </a>

        <p className="font-label" style={{ marginTop: 20, fontSize: 10, color: "var(--text-muted)", letterSpacing: 2 }}>
          PROGRESS SAVED PER ACCOUNT
        </p>
      </div>

      <style>{`
        @keyframes float0 { from{transform:translateY(0px) rotate(0deg)} to{transform:translateY(-20px) rotate(10deg)} }
        @keyframes float1 { from{transform:translateY(0px) rotate(0deg)} to{transform:translateY(15px) rotate(-8deg)} }
        @keyframes float2 { from{transform:translateY(0px) rotate(0deg)} to{transform:translateY(-12px) rotate(5deg)} }
        @keyframes float3 { from{transform:translateY(0px) rotate(0deg)} to{transform:translateY(18px) rotate(-12deg)} }
        @keyframes float4 { from{transform:translateY(0px) rotate(0deg)} to{transform:translateY(-8px) rotate(7deg)} }
      `}</style>
    </div>
  );
}