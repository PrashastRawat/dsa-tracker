from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import topics, progress

# Create all tables on startup (safe to call repeatedly)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DSA Tracker API",
    description="Backend for the DSA Roadmap + LeetCode Tracker",
    version="1.0.0",
)

# ─── CORS ────────────────────────────────────────────────────────
# Allows the React dev server (port 5173) to call this API (port 8000)
# In production, replace "*" with your actual frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────
app.include_router(topics.router)
app.include_router(progress.router)


@app.get("/")
def root():
    return {"message": "DSA Tracker API is running ✅"}


@app.get("/health")
def health():
    return {"status": "ok"}