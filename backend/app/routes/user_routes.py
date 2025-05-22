from fastapi import APIRouter, Depends
from app.models.user_model import UserBase, UserOut, UserUpdate
from app.services.auth_services import get_current_user
from app.services.user_services import delete_current_user, update_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/me", response_model=UserOut)
async def get_me(current_user: UserBase = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserOut)
async def update_me(data: UserUpdate, current_user: UserOut = Depends(get_current_user)):
    return update_current_user(current_user, data)

@router.delete("/me")
async def delete_me(current_user: UserOut = Depends(get_current_user)):
    return delete_current_user(current_user)