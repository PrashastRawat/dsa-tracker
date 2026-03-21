from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas, models, auth

router = APIRouter(prefix="/problems", tags=["problems"])


@router.post("/custom", response_model=schemas.ProblemOut)
def add_custom_problem(
    body: schemas.CustomProblemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    topic = crud.get_topic_by_id(db, body.topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    problem = crud.create_custom_problem(
        db, body.title, body.difficulty, body.leetcode_url, body.topic_id, current_user.id
    )
    return {**problem.__dict__, "status": "not_started"}


@router.delete("/custom/{problem_id}")
def delete_custom_problem(
    problem_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    deleted = crud.delete_custom_problem(db, problem_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Problem not found or not yours to delete")
    return {"message": "Deleted"}
