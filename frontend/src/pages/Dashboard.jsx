import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStats } from "../api/client";
import { useTheme } from "../context/ThemeContext";

function Ring({ pct, size = 56, stroke = 6 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct === 100 ? "var(--easy)" : pct > 0 ? "var(--medium)" : "var(--accent)";
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.7s ease", filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

const THEME_COPY = {
  f1:       { title: "Dark Mode",       sub: "Red Bull Racing — Floor it. 150 problems. No pitstops." },
  valorant: { title: "Light Mode",      sub: "Valorant — Instalock your topic. Clutch the interview." },
  sakura:   { title: "Sakura Mode 🌸",  sub: "桜の道 — Walk the path. Every problem a petal falling." },
  monster:  { title: "Matrix Mode",     sub: "Wake up, Neo. The Matrix has you. Ship the code." },
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const copy = THEME_COPY[theme] || THEME_COPY.f1;

  useEffect(() => { fetchStats().then(setStats).finally(() => setLoading(false)); }, []);

  if (loading) return (
    <div style={{ padding: 48, background: "var(--bg)", minHeight: "100vh" }}>
      {Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 90, marginBottom: 16, borderRadius: 16 }} />)}
    </div>
  );

  if (!stats) return (
    <div style={{ padding: 48, color: "var(--text)", fontSize: 18, background: "var(--bg)", minHeight: "100vh" }}>
      Failed to load stats.
    </div>
  );

  const { total_problems, solved, attempted, not_started, solved_pct, topics } = stats;

  return (
    <div className="fade-in" style={{ padding: "44px 48px", maxWidth: 980, margin: "0 auto", background: "var(--bg)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div className="font-label" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: 4, marginBottom: 12 }}>
          YOUR PROGRESS
        </div>
        <h1 className="font-heading" style={{
          fontSize: 52, color: "var(--heading-color)", lineHeight: 1.0, marginBottom: 10,
          textShadow: "0 0 40px var(--accent)",
        }}>
          {copy.title}
        </h1>
        <p className="font-content" style={{ fontSize: 24, color: "var(--text-muted)" }}>
          {copy.sub}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total",     value: total_problems, color: "var(--accent)" },
          { label: "Solved",    value: solved,          color: "var(--easy)"   },
          { label: "Attempted", value: attempted,       color: "var(--medium)" },
          { label: "Remaining", value: not_started,     color: "var(--text-muted)" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: "var(--surface)", borderRadius: 16, padding: "22px 24px",
            border: `1px solid var(--border)`, position: "relative", overflow: "hidden",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 0 24px ${color}33`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: color, opacity: 0.1, filter: "blur(24px)" }} />
            <div className="font-heading" style={{ fontSize: 42, color, marginBottom: 4, lineHeight: 1 }}>{value}</div>
            <div className="font-label" style={{ fontSize: 10, color: "var(--card-text)", letterSpacing: 2, opacity: 0.7 }}>{label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "22px 26px", marginBottom: 36,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span className="font-content" style={{ fontSize: 24, color: "var(--card-text)" }}>Overall Completion</span>
          <span className="font-heading" style={{ fontSize: 32, color: "var(--accent)", textShadow: "0 0 20px var(--accent)" }}>{solved_pct}%</span>
        </div>
        <div style={{ height: 10, background: "var(--border)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${solved_pct}%`,
            background: "linear-gradient(90deg, var(--progress-start), var(--progress-end))",
            borderRadius: 5, transition: "width 0.9s ease",
            boxShadow: "0 0 12px var(--accent)",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{solved} solved</span>
          <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{total_problems} total</span>
        </div>
      </div>

      {/* Topics */}
      <div className="font-label" style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 3, marginBottom: 16 }}>
        ALL TOPICS
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))", gap: 12 }}>
        {topics.map(topic => {
          const pct = topic.completion_pct;
          const col = pct === 100 ? "var(--easy)" : pct > 0 ? "var(--medium)" : "var(--accent)";
          return (
            <div key={topic.slug} onClick={() => navigate(`/topic/${topic.slug}`)} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "16px 18px", cursor: "pointer",
              transition: "all 0.2s", display: "flex", alignItems: "center", gap: 14,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = col; e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${col}25`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <Ring pct={pct} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-content" style={{ fontSize: 20, color: "var(--card-text)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {topic.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
                  {topic.solved_count}/{topic.total_problems} solved
                </div>
                <div style={{ height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: 2, transition: "width 0.6s ease" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}