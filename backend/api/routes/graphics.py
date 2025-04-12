from fastapi import APIRouter
from models.graphic_models import GraphicResponseModel
from services.graphic_service import GraphicService

router = APIRouter()

@router.get("/graphic01/{variable}", response_model=GraphicResponseModel)
def get_graphic_01(variable: str):
    return GraphicService().graphic(variable)
