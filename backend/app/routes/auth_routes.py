from fastapi import APIRouter, HTTPException, status

from app.models.auth_models import TokenOut
from app.models.user_model import UserCreate, UserLogin, UserOut
from app.services.auth_services import login_user_service, refresh_token_service
from app.services.user_services import create_user, get_user_by_email

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate):
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = await create_user(user)
    return new_user


@router.post("/login", response_model=TokenOut)
async def login_user(user: UserLogin):
    return await login_user_service(user)

@router.post("/refresh", response_model=TokenOut)
async def refresh_token(refresh_token: str):
    return await refresh_token_service(refresh_token)