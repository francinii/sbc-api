
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.model import router as model
from api.routes.clients import router as clients

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto a "*" si quieres permitir cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos los headers
)

app.include_router(model, prefix="/models", tags=["models"])
# app.include_router(clients, prefix="/clients", tags=["clients"])
