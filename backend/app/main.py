from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import topics, progress, problems, auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="DSA Tracker API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://dsa-tracker-1w5i.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(topics.router)
app.include_router(progress.router)
app.include_router(problems.router)

@app.get("/")
def root():
    return {"message": "DSA Tracker API v2 ✅"}