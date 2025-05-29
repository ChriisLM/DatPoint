from fastapi import HTTPException
from app.models.resource_model import ResourceCreate, ResourceOut, ResourceUpdate
from app.database.supabase_client import supabase
from uuid import UUID
from typing import Optional, List

async def create_resource(resource_data: ResourceCreate) -> ResourceOut:
    resource_dict = resource_data.model_dump()
    
    resource_dict["created_by"] = str(resource_dict["created_by"])
    response = supabase.table("resources").insert(resource_dict).execute()
    
    if hasattr(response, 'error') and response.error:
        raise Exception(f"Error creating resource: {response.error}")
  
    if not response.data or len(response.data) == 0:
        raise Exception("No resource data returned after creation")
    
    resource = response.data[0]
    return ResourceOut(**resource)

async def get_resource_by_id(resource_id: UUID) -> Optional[ResourceOut]:
    response = supabase.table("resources").select("*").eq("id", str(resource_id)).single().execute()
    
    if hasattr(response, 'error') and response.error:
        return None
    
    if not response.data:
        return None
    
    return ResourceOut(**response.data)

async def list_resources_by_user(current_user: UUID) -> List[ResourceOut]:
    response = supabase.table("resources").select("*").eq("created_by", str(current_user.id)).execute()
    
    if hasattr(response, 'error') and response.error:
        raise Exception("Error fetching resources")
    
    if not response.data or len(response.data) == 0:
        return None
    
    return [ResourceOut(**item) for item in response.data]

async def list_resources_by_format(format: str) -> List[ResourceOut]:
    normalized_format = format.lower()
    response = supabase.table("resources").select("*").ilike("format", normalized_format).execute()
    
    if hasattr(response, 'error') and response.error:
        raise Exception("Error fetching resources")
    
    if not response.data or len(response.data) == 0:
        return None
    
    return [ResourceOut(**item) for item in response.data]

async def update_resource(resource_id: UUID, resource_data: ResourceUpdate, user_id: UUID) -> ResourceOut | None:
    existing = supabase.table("resources").select("*").eq("id", resource_id).eq("user_id", user_id).execute()
    if not existing.data:
        return None
    
    response = supabase.table("resources").update(resource_data.model_dump(exclude_unset=True)).eq("id", resource_id).execute()
    
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=500, detail="Error updating resource")

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=500, detail="No data returned after update")
    
    updated = response.data[0]
    return ResourceOut(**updated)

async def delete_resource_by_id(resource_id: UUID):
    response = supabase.table("resources").delete().eq("id", resource_id).execute()
    
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=500, detail="Error deleting resource")
    
    return {"message": "Resource deleted successfully"}