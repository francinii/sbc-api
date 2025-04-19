from database import get_db
from fastapi import APIRouter, Depends
import json
import os
from requests import Session

from models.request_models import Applicant
from tests.energy_test import EnergyTest


router = APIRouter()

@router.get("/test-api-energy-used")
async def get_model_and_motor_energy_test(db: Session = Depends(get_db)):
  file_path = os.path.join(os.path.dirname(__file__), "../../tests/30_applicants.json")
  with open(file_path,"r", encoding="utf-8") as file:
    applicants_data = json.load(file)
  applicants_list = [Applicant(**applicant) for applicant in applicants_data]

  return await EnergyTest(db).GenerateWattMeassure(applicants_list)





