from fastapi import APIRouter
from models.request_models import Graphic
from services.graphic_service import GraphicService

router = APIRouter()

@router.post("/graphic-01")
async def process_model_input(items: Graphic):    
    items_dict = items.model_dump()
    return GraphicService().graphic_01(items_dict)
