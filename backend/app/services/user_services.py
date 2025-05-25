from fastapi import Depends, HTTPException
from app.models.user_model import UserCreate, UserLoginOut, UserOut, UserUpdate
from app.database.supabase_client import supabase as supabase_Configured
from uuid import UUID
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.config import settings
from app.utils.security import hash_password

supabase = supabase_Configured
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def create_user(user_data: UserCreate) -> UserOut:
  user_dict = user_data.model_dump()
  user_dict['hash_password'] = hash_password(user_data.hash_password)
  
  response = supabase.table("users").insert(user_dict).execute()
  
  if hasattr(response, 'error') and response.error:
    raise Exception(f"Error creating user: {response.error}")
  
  if not response.data or len(response.data) == 0:
    raise Exception("No user data returned after creation")
  
  created_user = response.data[0]
  return UserOut(**created_user)

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserOut:
  try:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    user_id: str = UUID(payload.get("sub"))
    if user_id is None:
      raise HTTPException(status_code=401, detail="Invalid credentials")
  except JWTError:
    raise HTTPException(status_code=401, detail="Invalid token")

  user = await get_user_by_id(user_id)
  if user is None:
    raise HTTPException(status_code=404, detail="User not found")
  return user

async def get_user_by_email_verify(email: str) -> Optional[UserLoginOut]:
  response = supabase.table("users").select("*").eq("email", email).execute()
  
  if hasattr(response, 'error') and response.error:
    return None
  
  if not response.data or len(response.data) == 0:
    return None
  
  user = response.data[0]
  return UserLoginOut(**user)

async def get_user_by_email(email: str) -> Optional[UserOut]:
  response = supabase.table("users").select("*").eq("email", email).execute()
  
  if hasattr(response, 'error') and response.error:
    return None
  
  if not response.data or len(response.data) == 0:
    return None
  
  user = response.data[0]
  return UserOut(**user)

async def get_user_by_id(user_id: UUID) -> Optional[UserOut]:
  response = supabase.table("users").select("*").eq("id", str(user_id)).single().execute()
  
  if hasattr(response, 'error') and response.error:
    return None
  
  if not response.data:
    return None
  
  return UserOut(**response.data)

async def update_current_user(user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
  update_data = user_update.model_dump(exclude_unset=True)
  
  if not update_data:
    raise HTTPException(status_code=400, detail="No data provided for update.")

  response = supabase.table("users").update(update_data).eq("id", current_user["id"]).execute()
  
  if hasattr(response, 'error') and response.error:
    raise HTTPException(status_code=500, detail="Error updating user")

  if not response.data or len(response.data) == 0:
    raise HTTPException(status_code=500, detail="No data returned after update")

  return {"message": "User updated successfully", "data": response.data[0]}

async def delete_current_user(current_user: dict = Depends(get_current_user)):
  response = supabase.table("users").delete().eq("id", current_user["id"]).execute()

  if hasattr(response, 'error') and response.error:
    raise HTTPException(status_code=500, detail="Error deleting user")

  return {"message": "User deleted successfully"}