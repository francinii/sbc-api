
from typing import List

from requests import Session
from models.rules_models import RuleCreate
from models.request_models import Rule
from repositories.rules_repository import RuleRepository


class RuleService:
    def __init__(self, db: Session):
        self.db = db
        self.rules_repository = RuleRepository()
        pass

    def get_rules(self):
        return self.rules_repository.get_raw_rules(self.db)  

    def format_rules(self):
        """Formatea las reglas y condiciones obtenidas de la base de datos."""
        rules_data = []
        rules = self.get_rules()
        for rule in rules:
            condition_dict = {}

            # Obtenemos las condiciones relacionadas con la regla
            for cond in rule.conditions:
                field = cond.field
                op = cond.operator
                value = cond.value
                # Convertimos el valor a float si es numérico, si no lo dejamos como string
                try:
                    parsed_value = float(value)
                except ValueError:
                    parsed_value = value
                # Aseguramos que la condición esté correctamente estructurada
                if field not in condition_dict:
                    condition_dict[field] = {}
                condition_dict[field][op] = parsed_value

            rules_data.append({
                "condition": condition_dict,
                "score_change": rule.score_change,
                "message": rule.message,
                "effect": rule.effect
            })
        
        return rules_data


    def create_rule(self, rule: RuleCreate):
        return self.rules_repository.create_rule_with_conditions(self.db, rule.model_dump())

    def delete_rule(self, rule_id: int):
        success = self.rules_repository.delete_rule_by_id(self.db, rule_id)
        if not success:
            raise ValueError(f"No se encontró la regla con id {rule_id}")
        return {"message": "Regla eliminada exitosamente"}