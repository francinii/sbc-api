from requests import Session
from services.ml_model_service import MlModelService
from models.request_models import Applicant

from services.inference_motor_service import InferenceMotorServices

class Service():
    def __init__(self, db: Session):
        self.db = db
        pass

    def call_best_ml(self, features: dict):
        # The model expects a 2D array (even for a single input)
        return MlModelService('/app/data/modelo_final').predict(features)
    
    def call_motor_inference(self, applicant: Applicant):         
        return InferenceMotorServices(self.db).inference_call(applicant)
