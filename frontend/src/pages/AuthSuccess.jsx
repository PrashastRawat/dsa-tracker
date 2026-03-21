import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchMe } from "../api/client";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      fetchMe().then((user) => {
        setUser(user);
        navigate("/");
      });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Signing you in...</div>
    </div>
  );
}