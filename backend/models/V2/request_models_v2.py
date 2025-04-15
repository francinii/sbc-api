from models.applicant_models import Applicant_Fact_V2
from pydantic import BaseModel

class ApplicantV2(BaseModel):
  cedula: str
  nombre: str
  apellido: str
  tipoDocumento: str
  fecha_nacimiento: str
  edad: int # calculado
  salario_mensual: float # Salario neto USD, después de los rebajos
  saldo_deuda_pendiente: float # total pendiente USD
  cantidad_tarjetas_credito: int
  paga_monto_mínimo: bool # (Cómo paga la tarjetas, booleano)
  monto_inversion_mensual: float # USD Cuanto invierte por mes
  fecha_experiencia_crediticia: str
  experiencia_crediticia: int # (En meses) Calculado de la fecha inició a usar tarjetas de crédito.
  cantidad_prestamos_activos: int
  delay_from_due_date: int # Cantidad de días
  balance_mensual: int # USD
  score_credito: float

  def convert_to_fact(self):
    return Applicant_Fact_V2(
      cedula=self.cedula,
      nombre=self.nombre,
      apellido=self.apellido,
      tipoDocumento=self.tipoDocumento,
      fecha_nacimiento=self.fecha_nacimiento,
      edad=self.edad,
      salario_mensual=self.salario_mensual,
      saldo_deuda_pendiente=self.saldo_deuda_pendiente,
      cantidad_tarjetas_credito=self.cantidad_tarjetas_credito,
      paga_monto_mínimo=self.paga_monto_mínimo,
      monto_inversion_mensual=self.monto_inversion_mensual,
      fecha_experiencia_crediticia=self.fecha_experiencia_crediticia,
      experiencia_crediticia=self.experiencia_crediticia,
      cantidad_prestamos_activos=self.cantidad_prestamos_activos,
      delay_from_due_date=self.delay_from_due_date,
      balance_mensual=self.balance_mensual,
      score_credito=self.score_credito    
    )
class MLModelBestV2(BaseModel):
  credit_scrore: float
  payment_of_min_amount: bool
  monthly_inhand_salary: float # check
  outstanding_debt: float # check
  num_credit_cards: int # check
  age: int # check


