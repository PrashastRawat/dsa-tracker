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
    setLoading(true);
    Promise.all([fetchTopic(slug), allTopics.length ? Promise.resolve(allTopics) : fetchTopics()])
      .then(([t, tops]) => { setTopic(t); setAllTopics(tops); })
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [slug]);

  async function handleDelete(problemId) {
    if (!confirm("Delete this custom problem?")) return;
    await deleteCustomProblem(problemId);
    load();
  }

  if (loading) return (
    <div style={{ padding: 40 }}>
      <div className="skeleton" style={{ height: 36, width: 200, marginBottom: 24 }} />
      {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 50, marginBottom: 6, borderRadius: 8 }} />)}
    </div>
  );

  if (!topic) return <div style={{ padding: 40, color: "var(--text-muted)" }}>Topic not found.</div>;

  const filtered = topic.problems
    .filter(p => filter === "all" || p.difficulty === filter)
    .filter(p => statusFilter === "all" || p.status === statusFilter);

  const counts = { easy: 0, medium: 0, hard: 0 };
  topic.problems.forEach(p => counts[p.difficulty]++);

  return (
    <div className="fade-in" style={{ padding: "36px 40px", maxWidth: 900 }}>
      {showModal && (
        <AddProblemModal
          topics={allTopics}
          currentTopicId={topic.id}
          onClose={() => setShowModal(false)}
          onAdded={load}
        />
      )}

      <div style={{ marginBottom: 24 }}>
        <div className="font-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: 2, marginBottom: 8 }}>TOPIC</div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 600 }}>{topic.name}</h1>
            {topic.description && <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 5 }}>{topic.description}</p>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
              <div className="font-mono" style={{ fontSize: 20, fontWeight: 700, color: topic.completion_pct === 100 ? "var(--easy)" : "var(--accent)" }}>
                {topic.completion_pct}%
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{topic.solved_count}/{topic.total_problems}</div>
            </div>
            <button onClick={() => setShowModal(true)} style={{
              padding: "10px 16px", borderRadius: 10, border: "1px solid var(--accent)",
              background: "var(--accent)22", color: "var(--accent)", cursor: "pointer",
              fontSize: 13, fontWeight: 600, transition: "all 0.15s", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--accent)44"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--accent)22"}
            >
              + Add Problem
            </button>
          </div>
        </div>

        <div style={{ height: 4, background: "var(--border)", borderRadius: 2, marginTop: 14, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${topic.completion_pct}%`,
            background: topic.completion_pct === 100 ? "var(--easy)" : "linear-gradient(90deg, var(--accent), #a78bfa)",
            borderRadius: 2, transition: "width 0.6s ease",
          }} />
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { key: "all", label: `All (${topic.problems.length})`, color: "var(--text-muted)" },
          { key: "easy", label: `Easy (${counts.easy})`, color: "var(--easy)" },
          { key: "medium", label: `Medium (${counts.medium})`, color: "var(--medium)" },
          { key: "hard", label: `Hard (${counts.hard})`, color: "var(--hard)" },
        ].map(({ key, label, color }) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: "5px 13px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
            border: `1px solid ${filter === key ? color : "var(--border)"}`,
            background: filter === key ? color + "22" : "transparent",
            color: filter === key ? color : "var(--text-muted)",
            transition: "all 0.15s",
          }}>{label}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["all", "not_started", "attempted", "solved"].map(k => (
            <button key={k} onClick={() => setStatusFilter(k)} style={{
              padding: "5px 10px", borderRadius: 20, fontSize: 11, cursor: "pointer",
              border: `1px solid ${statusFilter === k ? "var(--accent)" : "var(--border)"}`,
              background: statusFilter === k ? "var(--accent)22" : "transparent",
              color: statusFilter === k ? "var(--accent)" : "var(--text-muted)",
              transition: "all 0.15s", textTransform: "capitalize",
            }}>{k.replace("_", " ")}</button>
          ))}
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 18px", borderBottom: "1px solid var(--border)", background: "var(--surface2)" }}>
          <div style={{ width: 22 }} />
          <div style={{ flex: 1, fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>PROBLEM</div>
          <div style={{ width: 52, fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textAlign: "right" }}>DIFF</div>
          <div style={{ width: 90, fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textAlign: "center" }}>STATUS</div>
          <div style={{ width: 24 }} />
        </div>

        {filtered.length === 0
          ? <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>No problems match the filter.</div>
          : filtered.map(p => (
            <ProblemRow key={p.id} problem={p} onStatusChange={load} onDelete={p.is_custom ? () => handleDelete(p.id) : null} />
          ))
        }
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)" }}>
        💡 Click circle to cycle status · Click title to open LeetCode ↗ · Custom problems can be deleted
      </div>
    </div>
  );
}