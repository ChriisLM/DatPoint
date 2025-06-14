from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel
from uuid import UUID


class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None
    resource_type: str
    format: str
    file_path: Optional[str] = None
    link_url: Optional[str] = None
    metadata: Optional[dict] = None
    tags: Optional[List[str]] = []
    is_public: bool = False
    priority: Optional[str] = "normal"


class ResourceCreate(ResourceBase):
    created_by: UUID


class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    format: Optional[str] = None
    file_path: Optional[str] = None
    link_url: Optional[str] = None
    metadata: Optional[dict] = None
    tags: Optional[List[str]] = None
    is_public: Optional[bool] = None
    priority: Optional[str] = None


class ResourceOut(ResourceBase):
    id: UUID
    created_by: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ResourceWithSimilarity(BaseModel):
    resource: ResourceOut
    similarity: float
