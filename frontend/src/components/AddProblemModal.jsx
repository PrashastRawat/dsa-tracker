import { useState } from "react";
import { addCustomProblem } from "../api/client";

export default function AddProblemModal({ topics, currentTopicId, onClose, onAdded }) {
  const [form, setForm] = useState({
    title: "",
    difficulty: "medium",
    leetcode_url: "",
    topic_id: currentTopicId || (topics[0]?.id ?? ""),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  async function handleSubmit() {
    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.leetcode_url.trim()) { setError("LeetCode URL is required"); return; }
    if (!form.leetcode_url.includes("leetcode.com")) { setError("Must be a LeetCode URL"); return; }
    setLoading(true);
    setError("");
    try {
      const problem = await addCustomProblem({ ...form, topic_id: Number(form.topic_id) });
      onAdded(problem);
      onClose();
    } catch (e) {
      setError(e.response?.data?.detail || "Failed to add problem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000bb", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 14, padding: "28px 28px", width: "100%", maxWidth: 460,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Add Custom Problem</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        {[
          { label: "Problem Title", key: "title", type: "text", placeholder: "e.g. Two Sum" },
          { label: "LeetCode URL", key: "leetcode_url", type: "url", placeholder: "https://leetcode.com/problems/..." },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              placeholder={placeholder}
              style={{
                width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14,
                outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>Difficulty</label>
            <select
              value={form.difficulty}
              onChange={e => set("difficulty", e.target.value)}
              style={{
                width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14,
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>Topic</label>
            <select
              value={form.topic_id}
              onChange={e => set("topic_id", e.target.value)}
              style={{
                width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14,
              }}
            >
              {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>

        {error && <div style={{ color: "var(--hard)", fontSize: 13, marginBottom: 14 }}>⚠ {error}</div>}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "9px 18px", borderRadius: 8, border: "1px solid var(--border)",
            background: "transparent", color: "var(--text-muted)", cursor: "pointer", fontSize: 14,
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            padding: "9px 20px", borderRadius: 8, border: "none",
            background: "var(--accent)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600,
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? "Adding..." : "+ Add Problem"}
          </button>
        </div>
      </div>
    </div>
  );
}