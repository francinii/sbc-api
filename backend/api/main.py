
from fastapi import FastAPI
from api.routes.model import router as model
from api.routes.clients import router as clients

app = FastAPI()
app.include_router(model, prefix="/models", tags=["models"])
app.include_router(clients, prefix="/clients", tags=["clients"])
#@app.get("/get-model")
#async def get_model_result(item: float, item2: float):
#    return Service().call_model(item, item2)

