from datetime import date
from models.applicant_models import Applicant_Fact
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from pydantic import BaseModel

class Applicant(BaseModel):
    cedula : str
    nombre :  str
    apellido :  str
    ocupacion  : str
    meses_trabajando : int
    salario_mensual : float
    edad : int
    deuda_total : float
    cuota_mensual_total : float
    score_credito: float

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
            score_credito=self.score_credito          
        )

class MLModelBest(BaseModel):
    Age: int # check
    #Credit_Score: str
    Monthly_Inhand_Salary: float # check
    Delay_from_due_date: int #check
    Monthly_Balance: float
