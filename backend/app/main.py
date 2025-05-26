from fastapi import FastAPI
from app.routes import auth_routes, resource_routes, user_routes
from app.config import settings

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# Configurar CORS
# setup_cors(app)

app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(resource_routes.router)