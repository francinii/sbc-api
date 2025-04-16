
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes.model import router as model 
from api.routes.graphics import router as graphics
from api.routes.rules import router as rules

from scripts.seeder_runner import run_rule_seeder

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto a "*" si quieres permitir cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos los headers
)

app.include_router(model, prefix="/models", tags=["models"])
app.include_router(graphics, prefix="/graphics", tags=["graphics"])
app.include_router(rules, prefix="/rules", tags=["rules"])

@app.on_event("startup")
def on_startup():
    run_rule_seeder()
