export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "48px 40px", textAlign: "center", maxWidth: 380, width: "100%",
      }}>
        <div className="font-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: 3, marginBottom: 12 }}>
          DSA ROADMAP
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>LeetCode Tracker</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>
          Track your progress through the NeetCode 150. Sign in to get started.
        </p>

        <a
          href="http://localhost:8000/auth/login"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            background: "#fff", color: "#1a1a1a", textDecoration: "none",
            padding: "13px 24px", borderRadius: 10, fontWeight: 600, fontSize: 15,
            transition: "opacity 0.15s", width: "100%",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.83l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </a>

        <p style={{ marginTop: 24, fontSize: 12, color: "var(--text-muted)" }}>
          Your progress is saved per account
        </p>
      </div>
    </div>
  );
}