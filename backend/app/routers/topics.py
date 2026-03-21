from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import crud, schemas, models, auth

router = APIRouter(prefix="/topics", tags=["topics"])


@router.get("/", response_model=List[schemas.TopicSummary])
def list_topics(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    topics = crud.get_all_topics(db)
    result = []
    for topic in topics:
        enriched = crud.enrich_topic(db, topic, current_user.id)
        enriched.pop("problems")
        result.append(enriched)
    return result


@router.get("/{slug}", response_model=schemas.TopicOut)
def get_topic(
    slug: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    topic = crud.get_topic_by_slug(db, slug)
    if not topic:
        raise HTTPException(status_code=404, detail=f"Topic '{slug}' not found")
    return crud.enrich_topic(db, topic, current_user.id)