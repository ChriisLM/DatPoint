from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.resource_model import ResourceCreate, ResourceOut, ResourceUpdate
from app.services.resource_services import create_resource, delete_resource_by_id, get_resource_by_id, list_resources_by_date_range, list_resources_by_format, list_resources_by_user, update_resource
from uuid import UUID

from app.models.user_model import UserOut
from app.services.user_services import get_current_user

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.post("/", response_model=ResourceOut, status_code=status.HTTP_201_CREATED)
async def create_new_resource(resource: ResourceCreate):
    new_resource = await create_resource(resource)
    return new_resource

@router.get("/me", response_model=List[ResourceOut])
async def get_resources_by_me(current_user: UserOut = Depends(get_current_user)):
    list_resources = await list_resources_by_user(current_user)
    return list_resources

@router.get("/type/{format}", response_model=List[ResourceOut])
async def get_resources_by_format(format: str):
    response = await list_resources_by_format(format)
    return response

@router.get("/date/{start}/{end}", response_model=List[ResourceOut])
async def get_resources_by_date(start: str, end: str, current_user=Depends(get_current_user)):
    return await list_resources_by_date_range(start, end, current_user)

@router.get("/{resource_id}", response_model=ResourceOut)
async def get_resource(resource_id: UUID):
    resource = await get_resource_by_id(resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

@router.patch("/{resource_id}", response_model=ResourceOut)
async def update_resource_by_id(resource_id: UUID, resource_data: ResourceUpdate, user: UserOut = Depends(get_current_user)):
    updated_resource = await update_resource(resource_id, resource_data, user.id)
    if not updated_resource:
        raise HTTPException(status_code=404, detail="Resource not found or not yours")
    return updated_resource

@router.delete("/{resource_id}")
async def delete_resource(resource_id: UUID):
    return await delete_resource_by_id(resource_id)