from pydantic import BaseModel, HttpUrl
from typing import Optional

class QARequest(BaseModel):
    question: str
    image_url: Optional[HttpUrl] = None

class QAResponse(BaseModel):
    answer: str
    used_fallback: bool = False
    error: Optional[str] = None 