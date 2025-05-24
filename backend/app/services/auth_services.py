from fastapi import HTTPException
from app.models.user_model import UserLogin
from app.services.user_services import get_user_by_email
from app.models.auth_models import TokenOut
from app.utils.security import create_access_token, verify_password

async def login_user_service(user: UserLogin) -> TokenOut:
  db_user = await get_user_by_email(user.email)
  if not db_user or not verify_password(user.password, db_user.hashed_password):
    raise HTTPException(status_code=401, detail="Invalid credentials")

  token_data = {"sub": db_user.id}
  access_token = create_access_token(token_data)

  return TokenOut(access_token=access_token)