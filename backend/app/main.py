from fastapi import FastAPI
from app.routes import user_routes, resource_routes
from app.config import settings

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# Configurar CORS
# setup_cors(app)

# Incluir rutas
# app.include_router(auth_routes.router, prefix="/auth", tags=["Authentication"])
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(resource_routes.router, prefix="/resource", tags=["Resources"])