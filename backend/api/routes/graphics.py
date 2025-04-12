from fastapi import APIRouter
from models.graphic_models import GraphicResponseModel
from services.graphic_service import GraphicService

router = APIRouter()

@router.get("/graphic01", response_model=GraphicResponseModel)
def get_graphic_01():
    return GraphicService().graphic_01()

@router.get("/graphic02", response_model=GraphicResponseModel)
def get_graphic_02():
    return GraphicService().graphic_02()

@router.get("/graphic03", response_model=GraphicResponseModel)
def get_graphic_03():
    return GraphicService().graphic_03()

@router.get("/graphic04", response_model=GraphicResponseModel)
def get_graphic_04():
    return GraphicService().graphic_04()

@router.get("/graphic05", response_model=GraphicResponseModel)
def get_graphic_05():
    return GraphicService().graphic_05()