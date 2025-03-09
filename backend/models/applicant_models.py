from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

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
