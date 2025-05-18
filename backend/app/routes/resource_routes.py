from fastapi import APIRouter, HTTPException, status
from app.models.resource_model import ResourceCreate, ResourceOut
from app.services.resource_services import create_resource, get_resource_by_id
from uuid import UUID

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.post("/", response_model=ResourceOut, status_code=status.HTTP_201_CREATED)
async def create_new_resource(resource: ResourceCreate):
    new_resource = await create_resource(resource)
    return new_resource

@router.get("/{resource_id}", response_model=ResourceOut)
async def get_resource(resource_id: UUID):
    resource = await get_resource_by_id(resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource