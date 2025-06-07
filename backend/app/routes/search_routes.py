from typing import List
from fastapi import APIRouter, HTTPException

from app.models.resource_model import ResourceWithSimilarity
from app.utils.resource_similarity import find_similar_resources

router = APIRouter(prefix="/search", tags=["Search"])

@router.get("/", response_model=List[ResourceWithSimilarity])
async def search_resources(query: str):
  try:
    return await find_similar_resources(query)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))