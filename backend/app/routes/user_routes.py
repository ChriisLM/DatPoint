from fastapi import APIRouter, HTTPException, status
from app.models.user_model import UserCreate, UserOut
from app.services.user_services import create_user, get_user_by_email

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register", response_model=UserOut,status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate):
  existing_user = await get_user_by_email(user.email)
  if existing_user:
    raise HTTPException(status_code=400, detail="Email already registered")
  
  new_user = await create_user(user)
  return new_user