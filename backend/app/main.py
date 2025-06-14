from fastapi import FastAPI

from app.config import settings
from app.routes import auth_routes, resource_routes, search_routes, user_routes

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# Configurar CORS
# setup_cors(app)

app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(resource_routes.router)
app.include_router(search_routes.router)
