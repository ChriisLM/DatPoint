from fastapi import Depends, HTTPException
from app.models.user_model import UserCreate, UserOut, UserUpdate
from app.database.supabase_client import supabase as supabase_Configured
from uuid import UUID
from typing import Optional

from app.services.auth_services import get_current_user

supabase = supabase_Configured

def create_user(user_data: UserCreate) -> UserOut:
  response = supabase.table("users").insert(user_data.model_dump()).execute()

  if response.error:
    raise Exception(f"Error creating user: {response.error.message}")
  
  created_user = response.data[0]
  return UserOut(**created_user)

def get_user_by_email(email: str) -> Optional[UserOut]:
  response = supabase.table("users").select("*").eq("email", email).single().execute()
  
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