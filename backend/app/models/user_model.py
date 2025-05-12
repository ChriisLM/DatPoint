from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
  email: EmailStr
  username: str
  full_name: Optional[str] = None
  role: str = "user"

class UserCreate(UserBase):
  password: str

class UserOut(UserBase):
  id: UUID
  created_at: datetime
  updated_at: datetime
  is_active: bool

  class Config:
    orm_mode = True
