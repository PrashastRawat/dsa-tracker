import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000", });

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If token expires, kick user to login
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const fetchMe = () => api.get("/auth/me").then((r) => r.data);
export const fetchTopics = () => api.get("/topics").then((r) => r.data);
export const fetchTopic = (slug) => api.get(`/topics/${slug}`).then((r) => r.data);
export const fetchStats = () => api.get("/stats/summary").then((r) => r.data);
export const updateProgress = (problemId, status) =>
  api.patch(`/progress/${problemId}`, { status }).then((r) => r.data);
export const addCustomProblem = (data) =>
  api.post("/problems/custom", data).then((r) => r.data);
export const deleteCustomProblem = (id) =>
  api.delete(`/problems/custom/${id}`).then((r) => r.data);