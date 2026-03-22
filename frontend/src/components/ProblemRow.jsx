import { useState } from "react";
import { updateProgress } from "../api/client";

const STATUSES = ["not_started", "attempted", "solved"];
const STATUS_STYLE = {
  not_started: { label: "Not Started" },
  attempted:   { label: "Attempted"   },
  solved:      { label: "Solved"      },
};

export default function ProblemRow({ problem, onStatusChange, onDelete }) {
  const [status, setStatus] = useState(problem.status || "not_started");
  const [loading, setLoading] = useState(false);

  async function cycleStatus() {
    const next = STATUSES[(STATUSES.indexOf(status) + 1) % STATUSES.length];
    setLoading(true);
    try {
      await updateProgress(problem.id, next);
      setStatus(next);
      onStatusChange?.();
    } finally { setLoading(false); }
  }

  // Colors fully driven by CSS vars — always contrast correctly
  const circleColor = status === "solved" ? "var(--easy)" : status === "attempted" ? "var(--medium)" : "var(--border)";
  const circleTextColor = status === "solved" ? "var(--bg)" : status === "attempted" ? "var(--bg)" : "transparent";
  const badgeBg = status === "solved" ? "var(--easy)" : status === "attempted" ? "var(--medium)" : "var(--surface2)";
  const badgeText = status === "not_started" ? "var(--text-muted)" : "var(--bg)";
  const diffColor = { easy: "var(--easy)", medium: "var(--medium)", hard: "var(--hard)" };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "13px 20px",
      borderBottom: "1px solid var(--border)", transition: "background 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Circle toggle */}
      <button onClick={cycleStatus} disabled={loading} title="Click to cycle" style={{
        width: 24, height: 24, borderRadius: "50%",
        border: `2px solid ${circleColor}`,
        background: status !== "not_started" ? circleColor : "transparent",
        cursor: "pointer", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s", opacity: loading ? 0.5 : 1,
      }}>
        {status === "solved" && (
          <svg width="11" height="11" viewBox="0 0 10 10">
            <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="var(--bg)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        )}
        {status === "attempted" && (
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--bg)" }} />
        )}
      </button>

      {/* Title */}
      <a href={problem.leetcode_url} target="_blank" rel="noopener noreferrer" style={{
        flex: 1, fontSize: 14, fontWeight: 600,
        textDecoration: status === "solved" ? "line-through" : "none",
        textDecorationColor: "var(--text-muted)",
        color: status === "solved" ? "var(--text-muted)" : "var(--card-text)",
        display: "flex", alignItems: "center", gap: 8, fontFamily: "DM Sans, sans-serif",
      }}>
        {problem.title}
        {problem.is_custom && (
          <span style={{
            fontSize: 9, padding: "2px 7px", borderRadius: 4, letterSpacing: 1,
            background: "var(--accent)", color: "var(--btn-color)", fontWeight: 800,
          }}>CUSTOM</span>
        )}
        <svg width="11" height="11" viewBox="0 0 11 11" style={{ opacity: 0.35, flexShrink: 0 }}>
          <path d="M2 9L9 2M4 2h5v5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </a>

      {/* Difficulty */}
      <span className="font-label" style={{
        fontSize: 10, color: diffColor[problem.difficulty],
        width: 60, textAlign: "right", textTransform: "uppercase", letterSpacing: 1,
        fontWeight: 700,
      }}>
        {problem.difficulty}
      </span>

      {/* Status badge */}
      <span style={{
        fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 800,
        background: badgeBg, color: badgeText,
        width: 100, textAlign: "center", flexShrink: 0,
        fontFamily: "DM Sans, sans-serif", letterSpacing: 0.3,
        border: status === "not_started" ? "1px solid var(--border)" : "none",
      }}>
        {STATUS_STYLE[status].label}
      </span>

      {/* Delete */}
      <div style={{ width: 24, display: "flex", justifyContent: "center" }}>
        {onDelete && (
          <button onClick={onDelete} style={{
            background: "none", border: "none", color: "var(--text-muted)",
            cursor: "pointer", fontSize: 14, opacity: 0.4, transition: "all 0.15s", padding: 2,
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--hard)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >✕</button>
        )}
      </div>
    </div>
  );
}