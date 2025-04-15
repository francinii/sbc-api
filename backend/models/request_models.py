from datetime import date
from enum import Enum
from typing import List
from models.applicant_models import Applicant_Fact
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from pydantic import BaseModel

class Applicant(BaseModel):
    cedula: str
    nombre: str
    apellido: str
    ocupacion: str
    meses_trabajando: int
    salario_mensual: float
    edad: int
    deuda_total: float
    cuota_mensual_total: float
    score_credito: float
    monthly_inhand_salary: float
    outstanding_debt: float
    num_credit_cards: int
    payment_of_min_amount: str    # "Yes" or "No"
    monto_inversion_mensual: float
    experiencia_crediticia: int
    cantidad_prestamos_activos: int

    def convert_to_fact(self):
        return Applicant_Fact(
            cedula=self.cedula,
            nombre=self.nombre,
            apellido=self.apellido,
            ocupacion=self.ocupacion,
            meses_trabajando=self.meses_trabajando,
            salario_mensual=self.salario_mensual,
            edad=self.edad,
            deuda_total=self.deuda_total,
            cuota_mensual_total=self.cuota_mensual_total,
            score_credito=self.score_credito,
            monthly_inhand_salary=self.monthly_inhand_salary,
            outstanding_debt=self.outstanding_debt,
            num_credit_cards=self.num_credit_cards,
            payment_of_min_amount=self.payment_of_min_amount,
            monto_inversion_mensual=self.monto_inversion_mensual,
            experiencia_crediticia=self.experiencia_crediticia,
            cantidad_prestamos_activos=self.cantidad_prestamos_activos
        )
    
class MLModelBestOld(BaseModel):
    Age: int # check
    Monthly_Inhand_Salary: float # check Payment_of_Min_Amount
    Delay_from_due_date: int #check
    Monthly_Balance: float

class MLModelBest(BaseModel):
    Payment_of_Min_Amount: str  # "Yes" or "No" OJO 
    Monthly_Inhand_Salary: float
    Outstanding_Debt: float
    Num_Credit_Card: int
    Age: int

class Graphic(BaseModel):
    id: int
    labelx: List[float]
    labely: List[float]
    data: List[float]
    title: str
    description: str

class Rule(BaseModel):
    id: int
    name: str
    description: str
    rule: str