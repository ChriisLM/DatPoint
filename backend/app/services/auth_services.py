from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.config import settings
from app.models.user_model import UserLogin, UserOut
from app.services.user_services import get_user_by_email, get_user_by_id
from app.models.auth_models import TokenOut
from app.utils.security import create_access_token, verify_password

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)) -> UserOut:
  try:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    user_id: str = payload.get("sub")
    if user_id is None:
      raise HTTPException(status_code=401, detail="Invalid credentials")
  except JWTError:
    raise HTTPException(status_code=401, detail="Invalid token")

  user = get_user_by_id(user_id)
  if user is None:
    raise HTTPException(status_code=404, detail="User not found")
  return user

async def login_user_service(user: UserLogin) -> TokenOut:
  db_user = await get_user_by_email(user.email)
  if not db_user or not verify_password(user.password, db_user.hashed_password):
    raise HTTPException(status_code=401, detail="Invalid credentials")

  token_data = {"sub": db_user.id}
  access_token = create_access_token(token_data)

  return TokenOut(access_token=access_token)