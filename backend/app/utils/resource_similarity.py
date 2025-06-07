from typing import List
from uuid import UUID

from app.models.resource_model import ResourceWithSimilarity
from app.services.embedding_services import search_similar_resources
from app.services.resource_services import list_resources_by_ids


async def find_similar_resources(query: str, top_k: int = 5) -> List[ResourceWithSimilarity]:
    matches = await search_similar_resources(query, top_k)

    resource_ids = [UUID(m["resource_id"]) for m in matches]
    similarity_map = {UUID(m["resource_id"]): m["similarity"] for m in matches}

    resources = await list_resources_by_ids(resource_ids)

    return [
        ResourceWithSimilarity(resource=res, similarity=similarity_map.get(res.id, 0.0))
        for res in resources if res.id in similarity_map
    ]