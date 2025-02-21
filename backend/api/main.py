from typing import List, Union
from fastapi import FastAPI
from services.service import Service

app = FastAPI()

@app.get("/get-model")
async def get_model_result(item: float, item2: float):
    return Service().call_model(item, item2)
