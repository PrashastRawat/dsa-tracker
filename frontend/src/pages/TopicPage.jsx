import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTopic, fetchTopics, deleteCustomProblem } from "../api/client";
import ProblemRow from "../components/ProblemRow";
import AddProblemModal from "../components/AddProblemModal";

export default function TopicPage() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  function load() {
    if (!slug) return;
    setLoading(true);
    Promise.all([fetchTopic(slug), allTopics.length ? Promise.resolve(allTopics) : fetchTopics()])
      .then(([t, tops]) => { setTopic(t); setAllTopics(tops); })
      .finally(() => setLoading(false));
  }

  useEffect(() => { if (slug) load(); }, [slug]);

  async function handleDelete(problemId) {
    if (!confirm("Delete this custom problem?")) return;
    await deleteCustomProblem(problemId);
    load();
  }

  if (loading) return (
    <div style={{ padding: 48, background: "var(--bg)", minHeight: "100vh" }}>
      <div className="skeleton" style={{ height: 40, width: 220, marginBottom: 24 }} />
      {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 52, marginBottom: 6, borderRadius: 10 }} />)}
    </div>
  );

  if (!topic) return <div style={{ padding: 48, color: "var(--text)", fontSize: 20, background: "var(--bg)", minHeight: "100vh" }}>Topic not found.</div>;

  const filtered = topic.problems
    .filter(p => filter === "all" || p.difficulty === filter)
    .filter(p => statusFilter === "all" || p.status === statusFilter);

  const counts = { easy: 0, medium: 0, hard: 0 };
  topic.problems.forEach(p => counts[p.difficulty]++);
  const pct = topic.completion_pct;
  const barColor = pct === 100 ? "var(--easy)" : pct > 0 ? "var(--medium)" : "var(--accent)";

  return (
    <div className="fade-in" style={{ padding: "44px 48px", maxWidth: 960, background: "var(--bg)", minHeight: "100vh" }}>
      {showModal && (
        <AddProblemModal topics={allTopics} currentTopicId={topic.id}
          onClose={() => setShowModal(false)} onAdded={load} />
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="font-label" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: 4, marginBottom: 10 }}>TOPIC</div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 className="font-heading" style={{ fontSize: 40, color: "var(--heading-color)", lineHeight: 1.0, textShadow: "0 0 30px var(--accent)" }}>{topic.name}</h1>
            {topic.description && (
              <p className="font-content" style={{ color: "var(--text-muted)", fontSize: 20, marginTop: 6 }}>{topic.description}</p>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{
              background: "var(--surface)", border: `2px solid ${barColor}`,
              borderRadius: 14, padding: "14px 22px", textAlign: "center",
              boxShadow: `0 0 20px ${barColor}33`,
            }}>
              <div className="font-heading" style={{ fontSize: 28, color: barColor }}>{pct}%</div>
              <div className="font-label" style={{ fontSize: 10, color: "var(--card-text)", opacity: 0.6, letterSpacing: 1 }}>
                {topic.solved_count}/{topic.total_problems}
              </div>
            </div>
            <button onClick={() => setShowModal(true)} style={{
              padding: "12px 20px", borderRadius: 12, cursor: "pointer",
              border: `2px solid var(--accent)`, background: "var(--nav-active-bg)",
              color: "var(--nav-active-color)", fontSize: 14, fontWeight: 800,
              transition: "all 0.15s", fontFamily: "DM Sans, sans-serif",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--btn-color)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--nav-active-bg)"; e.currentTarget.style.color = "var(--nav-active-color)"; }}
            >+ Add Problem</button>
          </div>
        </div>
        <div style={{ height: 6, background: "var(--border)", borderRadius: 3, marginTop: 16, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, var(--progress-start), var(--progress-end))`, borderRadius: 3, transition: "width 0.7s ease", boxShadow: "0 0 10px var(--accent)" }} />
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { key: "all",    label: `All (${topic.problems.length})`, color: "var(--text-muted)" },
          { key: "easy",   label: `Easy (${counts.easy})`,          color: "var(--easy)"       },
          { key: "medium", label: `Medium (${counts.medium})`,      color: "var(--medium)"     },
          { key: "hard",   label: `Hard (${counts.hard})`,          color: "var(--hard)"       },
        ].map(({ key, label, color }) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer",
            border: `2px solid ${filter === key ? color : "var(--border)"}`,
            background: filter === key ? color : "transparent",
            color: filter === key ? "var(--bg)" : color,
            transition: "all 0.15s", fontFamily: "DM Sans, sans-serif",
          }}>{label}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["all","not_started","attempted","solved"].map(k => (
            <button key={k} onClick={() => setStatusFilter(k)} style={{
              padding: "6px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer",
              border: `2px solid ${statusFilter === k ? "var(--accent)" : "var(--border)"}`,
              background: statusFilter === k ? "var(--accent)" : "transparent",
              color: statusFilter === k ? "var(--btn-color)" : "var(--text-muted)",
              transition: "all 0.15s", fontFamily: "DM Sans, sans-serif", fontWeight: 600,
              textTransform: "capitalize",
            }}>{k.replace("_"," ")}</button>
          ))}
        </div>
      </div>

      {/* Problem list */}
      <div style={{ background: "var(--surface)", border: "2px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: "2px solid var(--border)", background: "var(--surface2)" }}>
          <div style={{ width: 22 }} />
          <div className="font-label" style={{ flex: 1, fontSize: 10, color: "var(--card-text)", opacity: 0.6, letterSpacing: 2 }}>PROBLEM</div>
          <div className="font-label" style={{ width: 60, fontSize: 10, color: "var(--card-text)", opacity: 0.6, letterSpacing: 2, textAlign: "right" }}>DIFF</div>
          <div className="font-label" style={{ width: 100, fontSize: 10, color: "var(--card-text)", opacity: 0.6, letterSpacing: 2, textAlign: "center" }}>STATUS</div>
          <div style={{ width: 24 }} />
        </div>
        {filtered.length === 0
          ? <div style={{ padding: 36, textAlign: "center", color: "var(--text-muted)", fontSize: 16 }}>No problems match the filter.</div>
          : filtered.map(p => (
            <ProblemRow key={p.id} problem={p} onStatusChange={load}
              onDelete={p.is_custom ? () => handleDelete(p.id) : null} />
          ))
        }
      </div>
      <div className="font-label" style={{ marginTop: 14, fontSize: 10, color: "var(--text-muted)", letterSpacing: 1 }}>
        CLICK CIRCLE TO CYCLE STATUS · TITLE OPENS LEETCODE ↗
      </div>
    </div>
  );
}