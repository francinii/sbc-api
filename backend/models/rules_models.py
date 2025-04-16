from datetime import date
from typing import List, Union
from models.applicant_models import Applicant_Fact
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from pydantic import BaseModel

Base = declarative_base()

class Rule(Base):
    __tablename__ = 'rules'
    id = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(String, nullable=False)
    score_change = Column(Float, default=0)
    effect = Column(String, nullable=False)
    conditions = relationship("Condition", back_populates="rule", cascade="all, delete-orphan")


class Condition(Base):
    __tablename__ = 'conditions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    rule_id = Column(Integer, ForeignKey('rules.id'), nullable=False)
    field = Column(String, nullable=False)         # e.g., "cuota_mensual_total"
    operator = Column(String, nullable=False)      # e.g., "$gt", "$lt", "="
    value = Column(String, nullable=False)         # Guardamos como string por flexibilidad (puede ser float, str, etc.)
    rule = relationship("Rule", back_populates="conditions")


# schemas/rule_schema.py
class ConditionResponse(BaseModel):
    id: int
    field: str
    operator: str
    value: Union[str, float]

    class Config:
        from_attributes = True

class RuleResponse(BaseModel):
    id: int
    message: str
    score_change: float
    effect: str
    conditions: List[ConditionResponse]  # ← clave

    class Config:
        from_attributes = True

class ConditionCreate(BaseModel):
    field: str
    operator: str
    value: Union[str, float]

class RuleCreate(BaseModel):
    message: str
    score_change: float
    effect: str
    conditions: List[ConditionCreate]