from fastapi import APIRouter, Depends
from requests import Session
from database import get_db
from models.request_models import Applicant, MLModelBest
from services.service import Service

router = APIRouter()

@router.post("/sbc-inference-engine")
async def get_model_sbc_result(applicant: Applicant, db: Session = Depends(get_db)):
    return Service(db).call_motor_inference(applicant)

@router.post("/ml-final-model")
async def process_model_input(items: MLModelBest, db: Session = Depends(get_db)):    
    items_dict = items.model_dump()
    return Service(db).call_best_ml(items_dict)