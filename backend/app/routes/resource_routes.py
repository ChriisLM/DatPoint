from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.resource_model import ResourceCreate, ResourceOut, ResourceUpdate
from app.services.resource_services import create_resource, get_resource_by_id, list_resources_by_user
from uuid import UUID

from app.models.user_model import UserBase
from app.services.auth_services import get_current_user

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.post("/", response_model=ResourceOut, status_code=status.HTTP_201_CREATED)
async def create_new_resource(resource: ResourceCreate):
    new_resource = await create_resource(resource)
    return new_resource

@router.get("/me", response_model=List[ResourceOut])
async def get_resources_by_me(current_user: UserBase = Depends(get_current_user)):
    list_resources = await list_resources_by_user(current_user)
    return list_resources

@router.get("/{resource_id}", response_model=ResourceOut)
async def get_resource(resource_id: UUID):
    resource = await get_resource_by_id(resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

@router.patch("/{resource_id}", response_model=ResourceOut)
async def update_resource(resource_id: UUID, resource_data: ResourceUpdate, user: UserBase = Depends(get_current_user)):
    updated_resource = await update_resource(resource_id, resource_data, user["id"])
    if not updated_resource:
        raise HTTPException(status_code=404, detail="Resource not found or not yours")
    return updated_resource