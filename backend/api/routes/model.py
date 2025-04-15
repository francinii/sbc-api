from fastapi import APIRouter, Depends
from requests import Session
from database import get_db
from models.request_models import Applicant, MLModelBest
from models.V2.request_models_v2 import ApplicantV2
from services.service import Service

router = APIRouter()

@router.post("/sbc-inference-engine")
async def get_model_sbc_result(applicant: Applicant, db: Session = Depends(get_db)):
    return Service(db).call_motor_inference(applicant)

@router.post("/ml-final-model")
async def process_model_input(items: MLModelBest, db: Session = Depends(get_db)):    
    items_dict = items.model_dump()
    return Service(db).call_best_ml(items_dict)

'''
@router.post("/ml-best-model")
async def process_model_input(items: MLModelBest, db: Session = Depends(get_db)):    
    items_dict = items.model_dump()
    return Service(db).call_model_ml(items_dict)

#@router.post("/ml-model-process-light")
#async def process_model_input(items: MLModelBest):    
#    items_dict = items.model_dump()
#    return Service().call_model_ml_light(items_dict)


@router.post("/sbc-model")
async def get_model_sbc_result(applicant: Applicant, db: Session = Depends(get_db)):
    return Service(db).call_motor_inference(applicant)


@router.post("/sbc-inference-engine")
async def get_model_sbc_result(applicant: ApplicantV2, db: Session = Depends(get_db)):
    return Service(db).call_motor_inferencev2(applicant)
'''