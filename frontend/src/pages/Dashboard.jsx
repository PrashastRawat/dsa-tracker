import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStats } from "../api/client";

function Ring({ pct, size = 56, stroke = 5, color = "var(--accent)" }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s ease" }} />
    </svg>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ padding: 40 }}>
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 80, marginBottom: 12, borderRadius: 12 }} />
      ))}
    </div>
  );

  if (!stats) return <div style={{ padding: 40, color: "var(--text-muted)" }}>Failed to load stats.</div>;

  const { total_problems, solved, attempted, not_started, solved_pct, topics } = stats;

  return (
    <div className="fade-in" style={{ padding: "36px 40px", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div className="font-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: 2, marginBottom: 8 }}>
          OVERVIEW
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: "var(--text)" }}>Your DSA Progress</h1>
        <p style={{ color: "var(--text-muted)", marginTop: 6, fontSize: 14 }}>
          Track your journey through the roadmap. Click any topic to start solving.
        </p>
      </div>

      {/* Top stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 36 }}>
        {[
          { label: "Total Problems", value: total_problems, color: "var(--accent)" },
          { label: "Solved", value: solved, color: "var(--easy)" },
          { label: "Attempted", value: attempted, color: "var(--attempted)" },
          { label: "Not Started", value: not_started, color: "var(--text-muted)" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "20px 22px",
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "Space Mono, monospace" }}>
              {value}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Overall progress bar */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 32,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Overall Completion</span>
          <span className="font-mono" style={{ fontSize: 13, color: "var(--accent)" }}>{solved_pct}%</span>
        </div>
        <div style={{ height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${solved_pct}%`,
            background: "linear-gradient(90deg, var(--accent), var(--easy))",
            borderRadius: 4,
            transition: "width 0.8s ease",
          }} />
        </div>
      </div>

      {/* Topic grid */}
      <div className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 14 }}>
        TOPICS
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {topics.map((topic) => (
          <div
            key={topic.slug}
            onClick={() => navigate(`/topic/${topic.slug}`)}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "18px 20px",
              cursor: "pointer",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.background = "var(--surface2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--surface)";
            }}
          >
            <Ring
              pct={topic.completion_pct}
              color={topic.completion_pct === 100 ? "var(--easy)" : "var(--accent)"}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {topic.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {topic.solved_count} / {topic.total_problems} solved
              </div>
              <div style={{ marginTop: 8, height: 3, background: "var(--border)", borderRadius: 2 }}>
                <div style={{
                  height: "100%",
                  width: `${topic.completion_pct}%`,
                  background: topic.completion_pct === 100 ? "var(--easy)" : "var(--accent)",
                  borderRadius: 2,
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}