from datetime import timedelta
from fastapi import HTTPException, status
from jose import JWTError

from app.models.auth_models import TokenOut
from app.models.user_model import UserLogin
from app.services.user_services import get_user_by_email_verify
from app.utils.security import create_token, decode_token, verify_password
from app.config import settings

ACCESS_TOKEN_EXPIRE = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
REFRESH_TOKEN_EXPIRE = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

async def login_user_service(user: UserLogin) -> TokenOut:
    db_user = await get_user_by_email_verify(user.email)
    if not db_user or not verify_password(user.hash_password, db_user.hash_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = {
        "sub": str(db_user.id),
        "username": db_user.username,
    }
    access_token = create_token(token_data, ACCESS_TOKEN_EXPIRE)
    refresh_token = create_token(token_data, REFRESH_TOKEN_EXPIRE)

    return TokenOut(
        access_token=access_token,
        refresh_token=refresh_token
    )

async def refresh_token_service(refresh_token: str) -> TokenOut:
    try:
        payload = decode_token(refresh_token)
        user_id = payload.get("sub")
        username = payload.get("username")

        if not user_id or not username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )

        token_data = {"sub": user_id, "username": username}

        access_token = create_token(token_data, ACCESS_TOKEN_EXPIRE)
        new_refresh_token = create_token(token_data, REFRESH_TOKEN_EXPIRE)

        return TokenOut(
            access_token=access_token,
            refresh_token=new_refresh_token
        )

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
