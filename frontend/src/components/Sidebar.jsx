import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

const icons = {
  "arrays-hashing":"▦","two-pointers":"⇌","sliding-window":"⧉","stack":"⊟",
  "binary-search":"⌕","linked-list":"⬡","trees":"⌘","tries":"⊤","heap":"⋀",
  "backtracking":"↩","graphs":"◎","advanced-graphs":"◉","dynamic-programming":"◈",
  "greedy":"⟶","intervals":"⊞","math-geometry":"△","bit-manipulation":"⊕",
};

export default function Sidebar({ topics, loading }) {
  const { user, logout } = useAuth();

  return (
    <aside style={{
      width: 272, minHeight: "100vh",
      background: "var(--sidebar-bg)",
      borderRight: "2px solid var(--border)",
      display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 20px 16px", borderBottom: "2px solid var(--border)" }}>
        <div className="font-label" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: 4, marginBottom: 6 }}>
          NEETCODE 150
        </div>
        <div className="font-heading" style={{
          fontSize: 22, color: "var(--heading-color)", lineHeight: 1.2,
          textShadow: "0 0 20px var(--accent)",
        }}>
          DSA Tracker
        </div>
      </div>

      {/* User */}
      {user && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
          borderBottom: "1px solid var(--border)", background: "var(--nav-active-bg)",
        }}>
          {user.avatar
            ? <img src={user.avatar} alt="" style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid var(--accent)", objectFit: "cover" }} />
            : <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "var(--btn-color)" }}>
                {user.name[0]}
              </div>
          }
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sidebar-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div className="font-label" style={{ fontSize: 9, color: "var(--accent)", letterSpacing: 2 }}>SIGNED IN</div>
          </div>
          <button onClick={logout} style={{
            background: "none", border: "1px solid var(--border)", borderRadius: 6,
            color: "var(--text-muted)", cursor: "pointer", fontSize: 12, padding: "3px 8px", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent2)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >✕</button>
        </div>
      )}

      {/* Nav */}
      <nav style={{ padding: "10px 8px", flex: 1, overflowY: "auto" }}>
        <NavLink to="/" end style={({ isActive }) => navStyle(isActive)}>
          <span style={{ fontSize: 15 }}>⊞</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Dashboard</span>
        </NavLink>

        <div className="font-label" style={{ fontSize: 9, color: "var(--text-muted)", padding: "12px 12px 4px", letterSpacing: 3 }}>
          TOPICS
        </div>

        {loading
          ? Array(10).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 36, margin: "3px 2px", borderRadius: 8 }} />)
          : topics.map(topic => (
            <NavLink key={topic.slug} to={`/topic/${topic.slug}`} style={({ isActive }) => navStyle(isActive)}>
              <span style={{ fontSize: 13, width: 20, textAlign: "center", flexShrink: 0 }}>{icons[topic.slug] || "◆"}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{topic.name}</span>
              <span style={{
                fontSize: 11, flexShrink: 0,
                color: topic.completion_pct === 100 ? "var(--easy)" : topic.solved_count > 0 ? "var(--medium)" : "var(--text-muted)",
              }}>
                {topic.solved_count}/{topic.total_problems}
              </span>
            </NavLink>
          ))
        }
      </nav>

      <div style={{ padding: "12px 14px", borderTop: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="font-label" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: 1 }}>OPENS LEETCODE ↗</div>
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

function navStyle(isActive) {
  return {
    display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
    borderRadius: 9, marginBottom: 2, textDecoration: "none",
    background: isActive ? "var(--nav-active-bg)" : "transparent",
    color: isActive ? "var(--nav-active-color)" : "var(--text-muted)",
    borderLeft: isActive ? "3px solid var(--accent)" : "3px solid transparent",
    transition: "all 0.15s",
  };
}