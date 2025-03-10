import os
from models.request_models import Applicant
from services.inference_motor_service import InferenceMotorServices

class Service():
    def __init__(self):
        pass

    def call_model(self, items: float, items2: float):
        #model = joblib.load('model.pkl')
        #return model.predict(X_test)
        return "Hola mundo {} {} ".format(items, items2)
    
    def call_model_ml(self, items: float, items2: float):
        return "Hola mundo {} {} ".format(items, items2)    
    
    def call_motor_inference(self, applicant: Applicant):       
        return InferenceMotorServices('/app/data/rules.json').inference_call(applicant)