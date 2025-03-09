from sqlalchemy.orm import Session
from models.applicant_models import Credito  # Asegúrate de importar Credito desde donde esté definido

class CreditRepository:
    """Repositorio para manejar operaciones CRUD de la entidad Credito."""

    @staticmethod
    def create(db: Session, credito_data: dict):
        """Crea un nuevo crédito en la base de datos."""
        nuevo_credito = Credito(**credito_data)
        db.add(nuevo_credito)
        db.commit()
        db.refresh(nuevo_credito)
        return nuevo_credito

    @staticmethod
    def get_by_id(db: Session, credito_id: int):
        """Obtiene un crédito por su ID."""
        return db.query(Credito).filter(Credito.id == credito_id).first()

    @staticmethod
    def get_all_by_client(db: Session, cliente_id: str):
        """Obtiene todos los créditos de un cliente específico."""
        return db.query(Credito).filter(Credito.cliente_id == cliente_id).all()

    @staticmethod
    def get_all(db: Session):
        """Obtiene todos los créditos en la base de datos."""
        return db.query(Credito).all()

    @staticmethod
    def update(db: Session, credito_id: int, update_data: dict):
        """Actualiza un crédito por su ID."""
        credito = db.query(Credito).filter(Credito.id == credito_id).first()
        if credito:
            for key, value in update_data.items():
                setattr(credito, key, value)
            db.commit()
            db.refresh(credito)
        return credito

    @staticmethod
    def delete(db: Session, credito_id: int):
        """Elimina un crédito por su ID."""
        credito = db.query(Credito).filter(Credito.id == credito_id).first()
        if credito:
            db.delete(credito)
            db.commit()
        return credito
