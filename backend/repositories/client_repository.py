from sqlalchemy.orm import Session
from models.applicant_models import Cliente  # Asegúrate de importar Cliente desde donde esté definido

class ClientRepository:
    """Repositorio para manejar operaciones CRUD de la entidad Cliente."""

    @staticmethod
    def create(db: Session, cliente_data: dict):
        """Crea un nuevo cliente en la base de datos."""
        nuevo_cliente = Cliente(**cliente_data)
        db.add(nuevo_cliente)
        db.commit()
        db.refresh(nuevo_cliente)
        return nuevo_cliente

    @staticmethod
    def get_by_id(db: Session, cedula: str):
        """Obtiene un cliente por su cédula."""
        return db.query(Cliente).filter(Cliente.cedula == cedula).first()

    @staticmethod
    def get_all(db: Session):
        """Obtiene todos los clientes."""
        return db.query(Cliente).all()

    @staticmethod
    def update(db: Session, cedula: str, update_data: dict):
        """Actualiza un cliente por su cédula."""
        cliente = db.query(Cliente).filter(Cliente.cedula == cedula).first()
        if cliente:
            for key, value in update_data.items():
                setattr(cliente, key, value)
            db.commit()
            db.refresh(cliente)
        return cliente

    @staticmethod
    def delete(db: Session, cedula: str):
        """Elimina un cliente por su cédula."""
        cliente = db.query(Cliente).filter(Cliente.cedula == cedula).first()
        if cliente:
            db.delete(cliente)
            db.commit()
        return cliente
