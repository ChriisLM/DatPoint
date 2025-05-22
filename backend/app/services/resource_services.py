from fastapi import HTTPException
from app.models.resource_model import ResourceCreate, ResourceOut, ResourceUpdate
from app.database.supabase_client import supabase
from uuid import UUID
from typing import Optional, List

def create_resource(resource_data: ResourceCreate) -> ResourceOut:
    response = supabase.table("resource").insert(resource_data.model_dump()).execute()
    
    if response.error:
        raise Exception(f"Error creating resource: {response.error.message}")
    
    resource = response.data[0]
    return ResourceOut(**resource)

def get_resource_by_id(resource_id: UUID) -> Optional[ResourceOut]:
    response = supabase.table("resource").select("*").eq("id", str(resource_id)).single().execute()
    
    if response.error:
        return None
    
    return ResourceOut(**response.data)

def list_resources_by_user(user_id: UUID) -> List[ResourceOut]:
    response = supabase.table("resource").select("*").eq("created_by", str(user_id)).execute()
    
    if response.error:
        raise Exception("Error fetching resources")
    
    return [ResourceOut(**item) for item in response.data]

def update_resource(resource_id: UUID, resource_data: ResourceUpdate, user_id: UUID) -> ResourceOut | None:
    existing = supabase.table("resource").select("*").eq("id", resource_id).eq("user_id", user_id).execute()
    if not existing.data:
        return None
    
    response = supabase.table("resource").update(resource_data.model_dump(exclude_unset=True)).eq("id", resource_id).execute()
    
    if response.error:
        raise Exception("Error updating resource")
    
    updated = response.data[0]
    return ResourceOut(**updated)

def delete_resource_by_id(resource_id: UUID):
    response = supabase.table("resource").delete().eq("id", resource_id).execute()
    
    if response.error:
        raise HTTPException(status_code=500, detail="Error deleting resource")
    
    return {"message": "Resource deleted successfully"}