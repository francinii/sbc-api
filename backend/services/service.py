import os

from requests import Session
from services.ml_model_service import MlModelService
from models.request_models import Applicant
from models.V2.request_models_v2 import ApplicantV2

from services.inference_motor_service import InferenceMotorServices

class Service():
    def __init__(self, db: Session):
        self.db = db
        pass

    def call_model(self, items: float, items2: float):
        return "Hola mundo {} {} ".format(items, items2)
    
    def call_model_ml(self, features: dict):
        # The model expects a 2D array (even for a single input)
        return MlModelService('/app/data/mejor_modelo_pycaret').predict(features)
    
    def call_model_ml_light(self, features: dict):
        # The model expects a 2D array (even for a single input)
        return MlModelService('/app/data/modelo_rf_light').predict(features)
    
    def call_motor_inference(self, applicant: Applicant):         
        return InferenceMotorServices('/app/data/rules_new.json', self.db).inference_call(applicant)
    
    def call_motor_inferencev2(self, applicant: ApplicantV2):         
        return InferenceMotorServices('/app/data/rules_v2.json', self.db).inference_callV2(applicant)