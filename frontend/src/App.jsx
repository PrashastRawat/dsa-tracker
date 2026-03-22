import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TopicPage from "./pages/TopicPage";
import LoginPage from "./pages/LoginPage";
import AuthSuccess from "./pages/AuthSuccess";
import { fetchTopics } from "./api/client";

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);

  useEffect(() => {
    if (user) fetchTopics().then(setTopics).finally(() => setTopicsLoading(false));
  }, [user]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="font-label" style={{ color: "var(--accent)", fontSize: 12, letterSpacing: 2 }}>LOADING...</div>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar topics={topics} loading={topicsLoading} />
      <main style={{ flex: 1, overflowY: "auto", background: "var(--bg)" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topic/:slug" element={<TopicPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route path="/*" element={<ProtectedLayout />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}