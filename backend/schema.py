from pydantic import BaseModel
from datetime import date


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"
    status: str = "pending"
    deadline: date | None = None

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    priority: str | None = None
    status: str | None = None
    deadline: date | None = None

