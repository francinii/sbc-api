
from requests import Session
from services.rule_service import RuleService
from models.response_models import ApplicantResponse
from models.request_models import Applicant
from models.V2.request_models_v2 import ApplicantV2

from experta import *
import collections
import json

from models.applicant_models import Cliente

if not hasattr(collections, 'Mapping'):
    collections.Mapping = collections.abc.Mapping

'''class Cliente(Fact):
    """Datos del solicitante"""
    credit_history = Field(int, mandatory=True)
    income = Field(float, mandatory=True)
    debt_to_income = Field(float, mandatory=True)
    job_stability = Field(int, mandatory=True)
    approval_probability = Field(float, default=0.0)
    score = Field(int, default=0)
'''
class InferenceMotorServices(KnowledgeEngine):
    def __init__(self, db:Session):
        super().__init__()
        self.db = db
        self.score = 0
        self.rules_service = RuleService(db)
        self.rules = self.rules_service.format_rules() 
        self.answer_obj= []

    def load_rules(self, rules_file):
        with open(rules_file, 'r') as f:
            return json.load(f)
    
    def evaluate_rule(self, applicant: Applicant, condition: dict):
        operators = {
            "$lt": lambda a, b: a < b,
            "$gt": lambda a, b: a > b,
            "$lte": lambda a, b: a <= b,
            "$gte": lambda a, b: a >= b,
            "$eq": lambda a, b: a == b
        }        
        applicant_dict = applicant.as_dict()
        for field, constraints in condition.items():
            print(f"Evaluando campo: {field}")            
            applicant_value = applicant_dict.get(field)
            if applicant_value is None:
                print(f"Advertencia: {field} no encontrado en Cliente. Ignorando condición.")
                return False  # Campo no encontrado            
            # Si la condición es directa (e.g., "$eq": "true")
            if isinstance(constraints, dict):
                for op, value in constraints.items():
                    if op not in operators:
                        print(f"Operador {op} desconocido.")
                        return False  # operador inválido                    
                    # Manejar conversión de string 'true'/'false' a boolean si necesario
                    if isinstance(applicant_value, bool):
                        if isinstance(value, str):
                            value = value.lower() == 'true'

                    if not operators[op](applicant_value, value):
                        print(f"Falla condición: {applicant_value} {op} {value}")
                        return False
            else:
                if applicant_value != constraints:
                    return False
        return True


    def apply_rules(self, applicant: Cliente):        
        for rule in self.rules:
            if self.evaluate_rule(applicant, rule["condition"]):
                #self.score += rule["score_change"]                
                self.answer_obj.append(ApplicantResponse(
                    regla=str(rule["effect"]),                    
                    descripcion=str(rule["message"]),
                    puntos=str(rule["score_change"])
                ))
                print(f"{rule['message']} {'+' if rule['score_change'] > 0 else ''}{rule['score_change']} puntos")
    
    def get_final_score(self):
        print(f"Puntaje final del solicitante: {self.score}")        
        return self.score

    def inference_call(self, applicant: Applicant) -> list:
        applicant_fact = applicant.convert_to_fact()
        self.reset()
        self.declare(applicant_fact)
        self.apply_rules(applicant_fact)
        return self.answer_obj

    '''
    def inference_callV2(self, applicant: ApplicantV2) -> list:
        applicant_fact = applicant.convert_to_fact()
        print(applicant_fact)
        self.reset()
        self.declare(applicant_fact)
        self.apply_rules(applicant_fact)
        return self.answer_obj
    '''




