from sqlalchemy.orm import Session
from models.rules_models import Condition, Rule  # Asegúrate de importar correctamente el modelo Rule

class RuleRepository:
    """Repositorio para manejar operaciones CRUD de la entidad Rule."""

    @staticmethod
    def get_raw_rules(db: Session):
        """Obtiene todas las reglas en la base de datos tal cual están, sin procesar."""
        return db.query(Rule).all()

    @staticmethod
    def create_rule_with_conditions(db: Session, rule_data: dict):
        conditions_data = rule_data.pop("conditions", [])
        new_rule = Rule(**rule_data)
        db.add(new_rule)
        db.commit()
        db.refresh(new_rule)
        for cond in conditions_data:
            new_condition = Condition(**cond, rule_id=new_rule.id)
            db.add(new_condition)
        db.commit()
        db.refresh(new_rule)
        return new_rule

    @staticmethod
    def delete_rule_by_id(db: Session, rule_id: int):
        rule = db.query(Rule).filter(Rule.id == rule_id).first()
        if rule:
            db.delete(rule)
            db.commit()
            return True
        return False