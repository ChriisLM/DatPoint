from fastapi import APIRouter, Depends
from app.models.user_model import UserBase, UserOut
from backend.app.services.auth_services import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/me", response_model=UserOut)
async def get_me(current_user: UserBase = Depends(get_current_user)):
    return current_user