from app.models.user_model import UserCreate, UserOut
from app.database.supabase_client import supabase as supabase_Configured
from uuid import UUID
from typing import Optional

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
