from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(tags=["progress"])


@router.patch("/progress/{problem_id}", response_model=schemas.ProgressOut)
def update_progress(
    problem_id: int,
    body: schemas.ProgressUpdate,
    db: Session = Depends(get_db),
):
    """
    Called when user clicks the status button on a problem card.
    Uses PATCH (not PUT) because we're updating one field, not replacing the resource.
    """
    problem = crud.get_problem_by_id(db, problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    return crud.upsert_progress(db, problem_id, body.status)


@router.get("/stats/summary", response_model=schemas.StatsOut)
def get_stats(db: Session = Depends(get_db)):
    """
    Dashboard stats: total solved, attempted, completion %.
    Also returns per-topic summary for the progress rings.
    """
    stats = crud.get_global_stats(db)
    topics = crud.get_all_topics(db)
    topic_summaries = []

    for topic in topics:
        enriched = crud.enrich_topic(db, topic)
        enriched.pop("problems")
        topic_summaries.append(enriched)

    return {**stats, "topics": topic_summaries}