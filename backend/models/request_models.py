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
    fecha_nacimiento : str
    deuda_total : float
    cuota_mensual_total : float

    def convert_to_fact(self):
        return Applicant_Fact(
            cedula=self.cedula,
            nombre=self.nombre,
            apellido=self.apellido,
            ocupacion=self.ocupacion,
            meses_trabajando=self.meses_trabajando,
            salario_mensual=self.salario_mensual,
            fecha_nacimiento=self.fecha_nacimiento,
            deuda_total=self.deuda_total,
            cuota_mensual_total=self.cuota_mensual_total            
        )

class MLModelInputLight(BaseModel):
    Age: int # check
    Credit_Score: str
    Monthly_Inhand_Salary: float # check
    Delay_from_due_date: int #check
    Monthly_Balance: float

class MLModelInput(BaseModel):
    Customer_ID: str
    Age: int
    Occupation: str
    Annual_Income: float
    Monthly_Inhand_Salary: float
    Num_Bank_Accounts: int
    Num_Credit_Card: int
    Interest_Rate: float
    Num_of_Loan: int
    Delay_from_due_date: int
    Num_of_Delayed_Payment: int
    Changed_Credit_Limit: float
    Num_Credit_Inquiries: int
    Credit_Mix: str
    Outstanding_Debt: float
    Credit_Utilization_Ratio: float
    Credit_History_Age: float
    Payment_of_Min_Amount: str
    Total_EMI_per_month: float
    Amount_invested_monthly: float
    Payment_Behaviour: str
    Monthly_Balance: float
    Last_Loan_9: int
    Last_Loan_8: int
    Last_Loan_7: int
    Last_Loan_6: int
    Last_Loan_5: int
    Last_Loan_4: int
    Last_Loan_3: int
    Last_Loan_2: int
    Last_Loan_1: int
    Credit_Score: str

    def encode_occupation(self):
        """Encode occupation as a one-hot vector."""
        occupations = ['Engineer', 'Doctor', 'Teacher', 'Lawyer', 'Scientist']  # Example categories
        encoded = [1 if self.Occupation == occ else 0 for occ in occupations]
        return encoded
