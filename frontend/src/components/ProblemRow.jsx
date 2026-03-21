import { useState } from "react";
import { updateProgress } from "../api/client";

const STATUSES = ["not_started", "attempted", "solved"];
const STATUS_STYLE = {
  not_started: { bg: "transparent", color: "#6b6b80", label: "Not Started" },
  attempted:   { bg: "#fbbf2422", color: "#fbbf24", label: "Attempted" },
  solved:      { bg: "#4ade8022", color: "#4ade80", label: "Solved" },
};
const DIFF_COLOR = { easy: "var(--easy)", medium: "var(--medium)", hard: "var(--hard)" };

export default function ProblemRow({ problem, onStatusChange, onDelete }) {
  const [status, setStatus] = useState(problem.status || "not_started");
  const [loading, setLoading] = useState(false);
  const s = STATUS_STYLE[status];

  async function cycleStatus() {
    const next = STATUSES[(STATUSES.indexOf(status) + 1) % STATUSES.length];
    setLoading(true);
    try {
      await updateProgress(problem.id, next);
      setStatus(next);
      onStatusChange?.();
    } finally { setLoading(false); }
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "12px 18px",
      borderBottom: "1px solid var(--border)", transition: "background 0.15s",
      background: status === "solved" ? "#4ade8006" : "transparent",
    }}
      onMouseEnter={e => e.currentTarget.style.background = status === "solved" ? "#4ade8010" : "var(--surface2)"}
      onMouseLeave={e => e.currentTarget.style.background = status === "solved" ? "#4ade8006" : "transparent"}
    >
      {/* Status circle */}
      <button onClick={cycleStatus} disabled={loading} title="Click to cycle status" style={{
        width: 20, height: 20, borderRadius: "50%", border: `2px solid ${s.color}`,
        background: status === "solved" ? s.color : "transparent",
        cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s", opacity: loading ? 0.5 : 1,
      }}>
        {status === "solved" && <svg width="9" height="9" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#0a0a0f" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>}
        {status === "attempted" && <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }} />}
      </button>

      {/* Title */}
      <a href={problem.leetcode_url} target="_blank" rel="noopener noreferrer" style={{
        flex: 1, fontSize: 13, fontWeight: 500, textDecoration: status === "solved" ? "line-through" : "none",
        textDecorationColor: "var(--text-muted)", color: status === "solved" ? "var(--text-muted)" : "var(--text)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        {problem.title}
        {problem.is_custom && <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, background: "var(--accent)33", color: "var(--accent)", fontWeight: 600 }}>CUSTOM</span>}
        <svg width="10" height="10" viewBox="0 0 11 11" style={{ opacity: 0.35, flexShrink: 0 }}>
          <path d="M2 9L9 2M4 2h5v5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        </svg>
      </a>

      {/* Difficulty */}
      <span style={{ fontSize: 11, fontFamily: "Space Mono, monospace", color: DIFF_COLOR[problem.difficulty], width: 52, textAlign: "right", textTransform: "capitalize" }}>
        {problem.difficulty}
      </span>

      {/* Status badge */}
      <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: s.bg, color: s.color, fontWeight: 500, width: 90, textAlign: "center", flexShrink: 0, border: `1px solid ${s.color}44` }}>
        {s.label}
      </span>

      {/* Delete button for custom problems */}
      <div style={{ width: 24, display: "flex", justifyContent: "center" }}>
        {onDelete && (
          <button onClick={onDelete} title="Delete custom problem" style={{
            background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer",
            fontSize: 14, opacity: 0.5, transition: "opacity 0.15s", padding: 2,
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--hard)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >✕</button>
        )}
      </div>
    </div>
  );
}