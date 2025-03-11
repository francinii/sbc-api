import os
from services.ml_model_service import MlModelService
from models.request_models import Applicant, MLModelInput
from services.inference_motor_service import InferenceMotorServices

class Service():
    def __init__(self):
        pass

    def call_model(self, items: float, items2: float):
        return "Hola mundo {} {} ".format(items, items2)
    
    def call_model_ml(self, features: dict):
        # The model expects a 2D array (even for a single input)
        return MlModelService('/app/data/modelo_rf').predict(features)
    
    def call_model_ml_light(self, features: dict):
        # The model expects a 2D array (even for a single input)
        return MlModelService('/app/data/modelo_rf_light').predict(features)
    
    def call_motor_inference(self, applicant: Applicant):       
        return InferenceMotorServices('/app/data/rules.json').inference_call(applicant)