from typing import Optional
from pydantic import BaseModel, EmailStr

class AuthUser(BaseModel):
    id: str
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    role: str = "user"

class TokenOut(BaseModel):
    success: bool
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    message: str
    user: AuthUser