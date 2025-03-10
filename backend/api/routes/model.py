from fastapi import APIRouter
from services.inference_motor_service import InferenceMotorServices
from models.request_models import Applicant
from services.service import Service

router = APIRouter()
@router.get("/get-model")
async def get_model_result(item: float, item2: float):
    return Service().call_model(item, item2)

@router.post("/sbc-model")
async def get_model_sbc_result(applicant: Applicant):
    return Service().call_motor_inference(applicant)