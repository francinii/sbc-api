from fastapi import APIRouter
from models.request_models import Applicant, MLModelInput, MLModelInputLight
from services.service import Service

router = APIRouter()
@router.get("/get-ml-model")
async def get_model_result(items: MLModelInput):
    return Service().call_model_ml(items)

@router.post("/ml-model-process")
async def process_model_input(items: MLModelInput):    
    items_dict = items.model_dump()
    return Service().call_model_ml(items_dict)


@router.post("/ml-model-process-light")
async def process_model_input(items: MLModelInputLight):    
    items_dict = items.model_dump()
    return Service().call_model_ml_light(items_dict)


@router.post("/sbc-model")
async def get_model_sbc_result(applicant: Applicant):
    return Service().call_motor_inference(applicant)