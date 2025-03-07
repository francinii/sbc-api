from fastapi import APIRouter
from services.service import Service

router = APIRouter()
@router.get("/get-model")
async def get_model_result(item: float, item2: float):
    return Service().call_model(item, item2)