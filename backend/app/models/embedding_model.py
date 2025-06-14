from pydantic import BaseModel
from uuid import UUID


class EmbeddingBase(BaseModel):
    resource_id: UUID
    embedding: list[float]


class EmbeddingCreate(EmbeddingBase):
    pass


class EmbeddingOut(EmbeddingBase):
    id: UUID
    resource_id: UUID

    class Config:
        from_attributes = True
