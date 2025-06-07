from typing import Dict, List
from sentence_transformers import SentenceTransformer
from app.database.supabase_client import supabase

model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embedding(text: str) -> list[float]:
    try:
        return model.encode(text).tolist()
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return []

async def save_embedding_for_resource(resource: dict):
    title = resource.get("title", "")
    description = resource.get("description", "")
    tags = resource.get("tags", [])

    text = f"{title}. {description}. Tags: {', '.join(tags)}"

    embedding = generate_embedding(text)
    if not embedding:
        print("Empty embedding, skipping save.")
        return

    resource_id = str(resource["id"])
    existing = supabase.table("resource_embeddings").select("*").eq("resource_id", resource_id).execute()

    if existing.data and len(existing.data) > 0:
        embedding_id = existing.data[0]["id"]
        response = supabase.table("resource_embeddings").update({"embedding": embedding}).eq("id", embedding_id).execute()
    else:
        response = supabase.table("resource_embeddings").insert({
            "resource_id": resource_id,
            "embedding": embedding
        }).execute()

    if hasattr(response, 'error') and response.error:
        raise Exception(f"Error saving/updating embedding: {response.error}")

    return response.data[0]

async def search_similar_resources(query: str, top_k: int = 5) -> List[Dict]:
    embedding = generate_embedding(query)

    response = supabase.rpc("match_resource_embeddings", {
        "query_embedding": embedding,
        "match_count": top_k
    }).execute()

    if hasattr(response, 'error') and response.error:
        raise Exception(f"Error in similarity search: {response.error}")

    matches = response.data or []

    return [{"resource_id": match["resource_id"], "similarity": match["similarity"]} for match in matches]