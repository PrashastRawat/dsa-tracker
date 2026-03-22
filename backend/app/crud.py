from sqlalchemy.orm import Session
from app import models
from app.models import StatusEnum


# ─── Topics ─────────────────────────────────────────────────────

def get_all_topics(db: Session):
    return db.query(models.Topic).order_by(models.Topic.order_index).all()


def get_topic_by_slug(db: Session, slug: str):
    return db.query(models.Topic).filter(models.Topic.slug == slug).first()


def get_topic_by_id(db: Session, topic_id: int):
    return db.query(models.Topic).filter(models.Topic.id == topic_id).first()


# ─── Problems ────────────────────────────────────────────────────

def get_problems_by_topic(db: Session, topic_id: int):
    return (
        db.query(models.Problem)
        .filter(models.Problem.topic_id == topic_id)
        .order_by(models.Problem.order_index)
        .all()
    )


def get_problem_by_id(db: Session, problem_id: int):
    return db.query(models.Problem).filter(models.Problem.id == problem_id).first()


def create_custom_problem(db: Session, title: str, difficulty: str, leetcode_url: str, topic_id: int, user_id: int):
    # Set order_index to end of topic list
    max_order = db.query(models.Problem).filter(models.Problem.topic_id == topic_id).count()
    problem = models.Problem(
        topic_id=topic_id,
        title=title,
        difficulty=difficulty,
        leetcode_url=leetcode_url,
        order_index=max_order + 1,
        is_custom=True,
        created_by=user_id,
    )
    db.add(problem)
    db.commit()
    db.refresh(problem)
    # Auto-create a progress row for this user
    progress = models.UserProgress(user_id=user_id, problem_id=problem.id, status=StatusEnum.not_started)
    db.add(progress)
    db.commit()
    return problem


def delete_custom_problem(db: Session, problem_id: int, user_id: int):
    problem = db.query(models.Problem).filter(
        models.Problem.id == problem_id,
        models.Problem.created_by == user_id,
        models.Problem.is_custom == True,
    ).first()
    if not problem:
        return False
    db.query(models.UserProgress).filter(models.UserProgress.problem_id == problem_id).delete()
    db.delete(problem)
    db.commit()
    return True


# ─── Progress ────────────────────────────────────────────────────

def get_progress(db: Session, problem_id: int, user_id: int):
    return (
        db.query(models.UserProgress)
        .filter(models.UserProgress.problem_id == problem_id, models.UserProgress.user_id == user_id)
        .first()
    )


def upsert_progress(db: Session, problem_id: int, user_id: int, status: StatusEnum):
    progress = get_progress(db, problem_id, user_id)
    if progress:
        progress.status = status
    else:
        progress = models.UserProgress(problem_id=problem_id, user_id=user_id, status=status)
        db.add(progress)
    db.commit()
    db.refresh(progress)
    return progress


# ─── Stats ───────────────────────────────────────────────────────

def get_global_stats(db: Session, user_id: int):
    total = db.query(models.Problem).count()
    solved = (
        db.query(models.UserProgress)
        .filter(models.UserProgress.user_id == user_id, models.UserProgress.status == StatusEnum.solved)
        .count()
    )
    attempted = (
        db.query(models.UserProgress)
        .filter(models.UserProgress.user_id == user_id, models.UserProgress.status == StatusEnum.attempted)
        .count()
    )
    not_started = total - solved - attempted
    return {
        "total_problems": total,
        "solved": solved,
        "attempted": attempted,
        "not_started": not_started,
        "solved_pct": round((solved / total * 100), 1) if total else 0.0,
    }


def enrich_topic(db: Session, topic: models.Topic, user_id: int) -> dict:
    problems = get_problems_by_topic(db, topic.id)
    total = len(problems)
    solved = 0
    problems_out = []
    for p in problems:
        progress = get_progress(db, p.id, user_id)
        status = progress.status if progress else StatusEnum.not_started
        if status == StatusEnum.solved:
            solved += 1
        problems_out.append({
            "id": p.id,
            "topic_id": p.topic_id,
            "title": p.title,
            "difficulty": p.difficulty.value,
            "leetcode_url": p.leetcode_url,
            "order_index": p.order_index,
            "is_custom": p.is_custom,
            "status": status.value,
        })
    return {
        "id": topic.id,
        "name": topic.name,
        "slug": topic.slug,
        "description": topic.description,
        "order_index": topic.order_index,
        "problems": problems_out,
        "total_problems": total,
        "solved_count": solved,
        "completion_pct": round((solved / total * 100), 1) if total else 0.0,
    }