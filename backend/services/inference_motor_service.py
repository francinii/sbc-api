
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
    def __init__(self, rules_file, db:Session):
        super().__init__()
        self.db = db
        self.score = 0
        #self.rules = self.load_rules(rules_file)
        self.rules_service = RuleService(db)
        self.rules = self.rules_service.format_rules() 
        self.answer_obj= []

    def load_rules(self, rules_file):
        with open(rules_file, 'r') as f:
            return json.load(f)
    
    def evaluate_rule(self, applicant: Applicant, condition):
        operators = {
            "$lt": lambda a, b: a < b,
            "$gt": lambda a, b: a > b,
            "$lte": lambda a, b: a <= b,
            "$gte": lambda a, b: a >= b,
            "$eq": lambda a, b: a == b
        }
        for field, constraints in condition.items(): 
            applicant_dict = applicant.as_dict()
            applicant_value = applicant_dict.get(field, None)
            # Verifica si el campo existe en el solicitante
            if applicant_value is None:
                print(f"Advertencia: {field} no encontrado en Cliente. Ignorando condición.")
                return False  # Si falta un campo requerido, la regla no se aplica
            
            if isinstance(constraints, str):
                return applicant_value == constraints
            else:
                for op, value in constraints.items():
                    if op in operators and not operators[op](applicant_value, value):
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
        #rules_file = "rules.json"
        #print(applicant)
        applicant_fact = applicant.convert_to_fact()
        self.reset()
        self.declare(applicant_fact)
        self.apply_rules(applicant_fact)
        return self.answer_obj
        #return self.get_final_score()

    def inference_callV2(self, applicant: ApplicantV2) -> list:
        applicant_fact = applicant.convert_to_fact()
        print(applicant_fact)
        self.reset()
        self.declare(applicant_fact)
        self.apply_rules(applicant_fact)
        return self.answer_obj

# Prueba del sistema
#rules_file = "rules.json" # Archivo JSON con reglas dinámicas
#engine = InferenceMotorServices(rules_file)
#engine.reset()
#applicant = Applicant(credit_history=750, income=3500.00, debt_to_income=0.2, job_stability=5)
#engine.declare(applicant)
#engine.apply_rules(applicant)
#engine.get_final_score()



