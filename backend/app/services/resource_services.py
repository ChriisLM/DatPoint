from datetime import datetime, time
from typing import List, Optional

from fastapi import HTTPException
from uuid import UUID

from app.database.supabase_client import supabase
from app.models.resource_model import ResourceCreate, ResourceOut, ResourceUpdate
from app.services.embedding_services import save_embedding_for_resource


async def create_resource(resource_data: ResourceCreate) -> ResourceOut:
    resource_dict = resource_data.model_dump()

    resource_dict["created_by"] = str(resource_dict["created_by"])
    response = supabase.table("resources").insert(resource_dict).execute()

    if hasattr(response, "error") and response.error:
        raise Exception(f"Error creating resource: {response.error}")

    if not response.data or len(response.data) == 0:
        raise Exception("No resource data returned after creation")

    resource = response.data[0]

    await save_embedding_for_resource(resource)

    return ResourceOut(**resource)


async def get_resource_by_id(resource_id: UUID) -> Optional[ResourceOut]:
    response = (
        supabase.table("resources").select("*").eq("id", str(resource_id)).execute()
    )

    if hasattr(response, "error") and response.error:
        return None

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=404, detail="Resource not found")

    return ResourceOut(**response.data[0])


async def list_resources_by_ids(resource_ids: List[UUID]) -> List[ResourceOut]:
    if not resource_ids:
        return []

    response = (
        supabase.table("resources")
        .select("*")
        .in_("id", [str(rid) for rid in resource_ids])
        .execute()
    )

    if hasattr(response, "error") and response.error:
        raise Exception(f"Error fetching resources: {response.error}")

    return [ResourceOut(**res) for res in response.data]


async def list_resources_by_user(current_user: UUID) -> List[ResourceOut]:
    response = (
        supabase.table("resources")
        .select("*")
        .eq("created_by", str(current_user.id))
        .execute()
    )

    if hasattr(response, "error") and response.error:
        raise Exception("Error fetching resources")

    if not response.data or len(response.data) == 0:
        raise Exception("No resource data returned after creation")

    return [ResourceOut(**item) for item in response.data]


async def list_resources_by_format(format: str) -> List[ResourceOut]:
    normalized_format = format.lower()
    response = (
        supabase.table("resources")
        .select("*")
        .ilike("format", normalized_format)
        .execute()
    )

    if hasattr(response, "error") and response.error:
        raise Exception("Error fetching resources")

    if not response.data or len(response.data) == 0:
        return None

    return [ResourceOut(**item) for item in response.data]


async def update_resource(
    resource_id: UUID, resource_data: ResourceUpdate, user_id: UUID
) -> ResourceOut | None:
    existing = (
        supabase.table("resources")
        .select("*")
        .eq("id", resource_id)
        .eq("created_by", user_id)
        .execute()
    )
    if not existing.data:
        return None

    update_dict = resource_data.model_dump(exclude_unset=True)
    response = (
        supabase.table("resources").update(update_dict).eq("id", resource_id).execute()
    )

    if hasattr(response, "error") and response.error:
        raise HTTPException(status_code=500, detail="Error updating resource")

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=500, detail="No data returned after update")

    updated = response.data[0]

    fields_to_check = ["title", "description", "tags"]
    if any(field in update_dict for field in fields_to_check):
        await save_embedding_for_resource(updated)

    return ResourceOut(**updated)


async def delete_resource_by_id(resource_id: UUID):
    response = supabase.table("resources").delete().eq("id", resource_id).execute()

    if hasattr(response, "error") and response.error:
        raise HTTPException(status_code=500, detail="Error deleting resource")

    if not response.data:
        raise HTTPException(status_code=404, detail="Resource not found")

    return {"message": "Resource deleted successfully"}


async def list_resources_by_date_range(
    start: str, end: str, current_user: UUID
) -> List[ResourceOut]:
    try:
        start_date = datetime.combine(
            datetime.strptime(start, "%Y-%m-%d").date(), time.min
        )
        end_date = datetime.combine(datetime.strptime(end, "%Y-%m-%d").date(), time.max)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid format of data. Use YYYY-MM-DD o YYYY-MM-DDTHH:MM:SS",
        )

    start_str = start_date.isoformat() + "Z"
    end_str = end_date.isoformat() + "Z"
    response = (
        supabase.table("resources")
        .select("*")
        .eq("created_by", str(current_user.id))
        .gte("created_at", start_str)
        .lte("created_at", end_str)
        .execute()
    )
    if hasattr(response, "error") and response.error:
        raise HTTPException(
            status_code=500,
            detail=f"Error filtering resources by date: {response.error}",
        )

    if not response.data:
        return []

    return [ResourceOut(**item) for item in response.data]
