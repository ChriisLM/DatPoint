from fastapi import Depends, HTTPException
from app.models.user_model import UserCreate, UserOut, UserUpdate
from app.database.supabase_client import supabase as supabase_Configured
from uuid import UUID
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.config import settings

supabase = supabase_Configured
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def create_user(user_data: UserCreate) -> UserOut:
  response = supabase.table("users").insert(user_data.model_dump()).execute()
  if response.error:
    raise Exception(f"Error creating user: {response.error.message}")
  
  created_user = response.data[0]
  return UserOut(**created_user)

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

def get_user_by_email(email: str) -> Optional[UserOut]:
  response = supabase.table("users").select("*").eq("email", email).execute()
  if response.error:
    return None
  
  user = response.data
  return UserOut(**user)

def get_user_by_id(user_id: UUID) -> Optional[UserOut]:
  response = supabase.table("users").select("*").eq("id", str(user_id)).single().execute()
  
  if response.error:
    return None
  
  return UserOut(**response.data)

def update_current_user(user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
  update_data = user_update.model_dump(exclude_unset=True)
  
  if not update_data:
    raise HTTPException(status_code=400, detail="No data provided for update.")

  response = supabase.table("users").update(update_data).eq("id", current_user["id"]).execute()
  
  if response.error:
    raise HTTPException(status_code=500, detail="Error updating user")

  return {"message": "User updated successfully", "data": response.data[0]}

def delete_current_user(current_user: dict = Depends(get_current_user)):
  response = supabase.table("users").delete().eq("id", current_user["id"]).execute()

  if response.error:
    raise HTTPException(status_code=500, detail="Error deleting user")

  return {"message": "User deleted successfully"}