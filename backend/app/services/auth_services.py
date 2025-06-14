from fastapi import HTTPException

from app.models.auth_models import TokenOut
from app.models.user_model import UserLogin
from app.services.user_services import get_user_by_email_verify
from app.utils.security import create_access_token, verify_password


async def login_user_service(user: UserLogin) -> TokenOut:
    db_user = await get_user_by_email_verify(user.email)
    if not db_user or not verify_password(user.hash_password, db_user.hash_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = {
        "sub": str(db_user.id),
        "username": db_user.username,
    }
    access_token = create_access_token(token_data)

    return TokenOut(access_token=access_token)
