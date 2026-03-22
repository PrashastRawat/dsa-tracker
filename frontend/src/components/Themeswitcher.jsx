import { useState } from "react";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const current = THEMES.find(t => t.id === theme);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        background: "var(--surface2)", border: "1px solid var(--accent)",
        borderRadius: 8, padding: "6px 12px", cursor: "pointer",
        color: "var(--accent)", fontSize: 13, display: "flex", alignItems: "center", gap: 7,
        fontFamily: "DM Sans, sans-serif", fontWeight: 600, transition: "all 0.15s",
        boxShadow: "0 0 10px var(--card-glow)",
      }}>
        <span style={{ fontSize: 15 }}>{current?.emoji}</span>
        <span style={{ fontSize: 11 }}>Theme</span>
        <span style={{ fontSize: 9 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
            transform: "translateX(-50%)",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 14, overflow: "hidden", zIndex: 100,
            boxShadow: "0 16px 48px #00000099", minWidth: 200,
          }}>
            <div className="font-label" style={{ padding: "10px 14px 6px", fontSize: 9, color: "var(--text-muted)", letterSpacing: 2 }}>
              PICK YOUR THEME
            </div>
            {THEMES.map(t => (
              <button key={t.id} onClick={() => { setTheme(t.id); setOpen(false); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "11px 14px", border: "none", cursor: "pointer",
                background: theme === t.id ? "var(--nav-active-bg)" : "transparent",
                color: theme === t.id ? "var(--nav-active-color)" : "var(--text-muted)",
                fontSize: 14, fontFamily: "DM Sans, sans-serif", fontWeight: 600,
                borderLeft: theme === t.id ? "3px solid var(--accent)" : "3px solid transparent",
                transition: "all 0.12s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                onMouseLeave={e => e.currentTarget.style.background = theme === t.id ? "var(--nav-active-bg)" : "transparent"}
              >
                <span style={{ fontSize: 20 }}>{t.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <div>{t.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.5, fontWeight: 400 }}>{t.dark ? "Dark" : "Light"}</div>
                </div>
                {theme === t.id && <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: 14 }}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}