from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.config import settings
from app.models.user_model import UserOut
from app.services.user_services import get_user_by_id

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