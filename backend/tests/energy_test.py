from pyJoules.energy_meter import measure_energy
from pyJoules.handler.csv_handler import CSVHandler
from requests import Session

from models.request_models import Applicant, MLModelBest
from services.service import Service

csv_handler = CSVHandler('energy_meassures.csv')

class EnergyTest():
    def __init__(self, db: Session):
        self.db = db
        pass

    async def GenerateWattMeassure(self, applicants: list[Applicant]):
        for applicant in applicants:
            await ServiceEnergyTest(self.db).call_model_and_motor(applicant)
        csv_handler.save_data()
        print("que pasa aqui??")
        return "check file energy_meassures.csv"

class ServiceEnergyTest():
    def __init__(self, db: Session):
        self.db = db
        pass

    @measure_energy(handler=csv_handler)
    def call_model_and_motor(self, applicant: Applicant):
        items: MLModelBest = {
            "Payment_of_Min_Amount": applicant.payment_of_min_amount,  # "Yes" or "No" OJO 
            "Monthly_Inhand_Salary": applicant.salario_mensual,
            "Outstanding_Debt": applicant.outstanding_debt,
            "Num_Credit_Card": applicant.num_credit_cards,
            "Age": applicant.edad
        }
        modelResult = Service(self.db).call_best_ml(items)
        #{'prediction_label': 'Standard', 'prediction_score': 0.8796}
        # print(applicant.score_credito) # 0.8796
        applicant.score_credito = modelResult["prediction_score"]
        
        return Service(self.db).call_motor_inference(applicant)
    

