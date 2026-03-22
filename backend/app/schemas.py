from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.models import DifficultyEnum, StatusEnum


# ─── User ────────────────────────────────────────────────────────

class UserOut(BaseModel):
    id: int
    email: str
    name: str
    avatar: Optional[str] = None
    model_config = {"from_attributes": True}


# ─── Problem ─────────────────────────────────────────────────────

class ProblemBase(BaseModel):
    title: str
    difficulty: DifficultyEnum
    leetcode_url: str
    order_index: int


class ProblemOut(ProblemBase):
    id: int
    topic_id: int
    is_custom: bool = False
    status: StatusEnum = StatusEnum.not_started
    model_config = {"from_attributes": True}


class CustomProblemCreate(BaseModel):
    title: str
    difficulty: DifficultyEnum
    leetcode_url: str
    topic_id: int


# ─── Topic ───────────────────────────────────────────────────────

class TopicBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    order_index: int


class TopicOut(TopicBase):
    id: int
    problems: List[ProblemOut] = []
    total_problems: int = 0
    solved_count: int = 0
    completion_pct: float = 0.0
    model_config = {"from_attributes": True}


class TopicSummary(TopicBase):
    id: int
    total_problems: int = 0
    solved_count: int = 0
    completion_pct: float = 0.0
    model_config = {"from_attributes": True, "use_enum_values": True}

# ─── Progress ────────────────────────────────────────────────────

class ProgressUpdate(BaseModel):
    status: StatusEnum


class ProgressOut(BaseModel):
    problem_id: int
    status: StatusEnum
    updated_at: Optional[datetime] = None
    model_config = {"from_attributes": True}


# ─── Stats ───────────────────────────────────────────────────────

class StatsOut(BaseModel):
    total_problems: int
    solved: int
    attempted: int
    not_started: int
    solved_pct: float
    topics: List[TopicSummary]