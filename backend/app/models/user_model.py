from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr
from uuid import UUID


class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    role: str = "user"


class UserCreate(UserBase):
    hash_password: str


class UserLogin(BaseModel):
    email: EmailStr
    hash_password: str


class UserUpdate(BaseModel):
    username: str
    email: EmailStr


class UserOut(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        from_attributes = True


class UserLoginOut(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    is_active: bool
    hash_password: str

    class Config:
        from_attributes = True
