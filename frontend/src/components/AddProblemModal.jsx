import { useState } from "react";
import { addCustomProblem } from "../api/client";

export default function AddProblemModal({ topics, currentTopicId, onClose, onAdded }) {
  const [form, setForm] = useState({
    title: "", difficulty: "medium", leetcode_url: "", topic_id: currentTopicId || topics[0]?.id || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  async function handleSubmit() {
    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.leetcode_url.trim()) { setError("LeetCode URL is required"); return; }
    if (!form.leetcode_url.includes("leetcode.com")) { setError("Must be a LeetCode URL"); return; }
    setLoading(true); setError("");
    try {
      await addCustomProblem({ ...form, topic_id: Number(form.topic_id) });
      onAdded(); onClose();
    } catch (e) {
      setError(e.response?.data?.detail || "Failed to add problem");
    } finally { setLoading(false); }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000cc", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "var(--surface)", border: "2px solid var(--accent)",
        borderRadius: 18, padding: "32px 30px", width: "100%", maxWidth: 480,
        boxShadow: "0 0 60px var(--card-glow)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <h2 className="font-heading" style={{ fontSize: 26, color: "var(--heading-color)" }}>Add Custom Problem</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>

        {[
          { label: "Problem Title", key: "title", type: "text", placeholder: "e.g. Two Sum" },
          { label: "LeetCode URL", key: "leetcode_url", type: "url", placeholder: "https://leetcode.com/problems/..." },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 18 }}>
            <label className="font-label" style={{ display: "block", fontSize: 10, color: "var(--accent)", marginBottom: 7, letterSpacing: 2 }}>{label.toUpperCase()}</label>
            <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
              style={{
                width: "100%", background: "var(--surface2)", border: "2px solid var(--border)",
                borderRadius: 10, padding: "11px 14px", color: "var(--card-text)", fontSize: 15,
                outline: "none", fontFamily: "DM Sans, sans-serif",
              }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          {[
            { label: "Difficulty", key: "difficulty", options: [["easy","Easy"],["medium","Medium"],["hard","Hard"]] },
            { label: "Topic", key: "topic_id", options: topics.map(t => [t.id, t.name]) },
          ].map(({ label, key, options }) => (
            <div key={key}>
              <label className="font-label" style={{ display: "block", fontSize: 10, color: "var(--accent)", marginBottom: 7, letterSpacing: 2 }}>{label.toUpperCase()}</label>
              <select value={form[key]} onChange={e => set(key, e.target.value)} style={{
                width: "100%", background: "var(--surface2)", border: "2px solid var(--border)",
                borderRadius: 10, padding: "11px 14px", color: "var(--card-text)", fontSize: 14,
                fontFamily: "DM Sans, sans-serif",
              }}>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
        </div>

        {error && <div style={{ color: "var(--hard)", fontSize: 14, marginBottom: 16, fontWeight: 600 }}>⚠ {error}</div>}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "10px 20px", borderRadius: 10, border: "2px solid var(--border)",
            background: "transparent", color: "var(--text-muted)", cursor: "pointer", fontSize: 14, fontFamily: "DM Sans, sans-serif",
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            padding: "10px 22px", borderRadius: 10, border: "none",
            background: "var(--btn-bg)", color: "var(--btn-color)", cursor: "pointer",
            fontSize: 14, fontWeight: 800, fontFamily: "DM Sans, sans-serif",
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? "Adding..." : "+ Add Problem"}
          </button>
        </div>
      </div>
    </div>
  );
}