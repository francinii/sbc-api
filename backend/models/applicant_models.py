from datetime import datetime
from pydantic import Field
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from experta import *

Base = declarative_base()

class Cliente(Base):
    __tablename__ = "clientes"

    cedula = Column(String, primary_key=True, index=True)
    nombre = Column(String, nullable=True)
    apellido = Column(String, nullable=True)
    ocupacion = Column(String, nullable=True)
    meses_trabajando = Column(Integer, nullable=True)
    salario_mensual = Column(Float, nullable=True)
    fecha_nacimiento = Column(Date, nullable=True)

    # Relación con Créditos
    creditos = relationship("Credito", back_populates="cliente")

class Credito(Base):
    __tablename__ = "creditos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    cliente_id = Column(String, ForeignKey("clientes.cedula"), nullable=False)
    deuda_total = Column(Float, nullable=True)
    cuota_mensual = Column(Float, nullable=True)
    fecha_inicio = Column(Date, nullable=True)
    tipo_deuda = Column(String, nullable=True)

    # Relación inversa con Cliente
    cliente = relationship("Cliente", back_populates="creditos")


class Applicant_Fact(Fact):
    """Datos del solicitante"""
    cedula = Field(str, mandatory=True)
    nombre = Field(str, mandatory=True)
    apellido = Field(str, mandatory=True)
    ocupacion = Field(str, mandatory=True)
    meses_trabajando = Field(int, default=0)
    salario_mensual = Field(float, default=0)
    edad = Field(int, default=0)
    deuda_total = Field(float, default=0.0)
    cuota_mensual_total = Field(float, default=0.0)
    score_credito=Field(float, default=0.0)

class Applicant_Fact_V2(Fact):
    cedula = Field(str, mandatory = True)
    nombre = Field(str, mandatory = True)
    apellido = Field(str, mandatory = True)
    tipoDocumento = Field(str, mandatory = True)
    fecha_nacimiento = Field(str, mandatory = True)
    edad = Field(int, mandatory = True)
    salario_mensual = Field(float, mandatory = True) # Salario neto USD, después de los rebajos
    saldo_deuda_pendiente = Field(float, default=0) # total pendiente USD
    cantidad_tarjetas_credito = Field(int, default=0)
    paga_monto_mínimo = Field(bool, default=True) # (Cómo paga la tarjetas, booleano)
    monto_inversion_mensual = Field(float,  default=0) # USD Cuanto invierte por mes
    fecha_experiencia_crediticia = Field(str, mandatory = True) # Fecha que inició a usar tarjetas de crédito.
    experiencia_crediticia = Field(int, default=0) # (En meses) Calculado de la fecha 
    cantidad_prestamos_activos = Field(int, default=0)
    delay_from_due_date = Field(int, default=0) # Cantidad de días
    balance_mensual = Field(int, default=0) # USD
    score_credito = Field(float, default=0)
