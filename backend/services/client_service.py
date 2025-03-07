from sqlalchemy.orm import Session
from repositories.client_repository import ClientRepository

class ClienteService:
    """Servicio para manejar la lógica de negocio relacionada con Cliente."""

    @staticmethod
    def create(db: Session, cliente_data: dict):
        """Crea un nuevo cliente."""
        return ClientRepository.create(db, cliente_data)

    @staticmethod
    def get_client_by_id(db: Session, cedula: str):
        """Obtiene un cliente por su cédula."""
        cliente = ClientRepository.get_by_id(db, cedula)
        if not cliente:
            raise ValueError(f"Cliente con cédula {cedula} no encontrado")
        return cliente

    @staticmethod
    def get_all(db: Session):
        """Obtiene todos los clientes."""
        return ClientRepository.get_all(db)

    @staticmethod
    def update(db: Session, cedula: str, update_data: dict):
        """Actualiza un cliente por su cédula."""
        cliente = ClientRepository.update(db, cedula, update_data)
        if not cliente:
            raise ValueError(f"Cliente con cédula {cedula} no encontrado")
        return cliente

    @staticmethod
    def delete(db: Session, cedula: str):
        """Elimina un cliente por su cédula."""
        cliente = ClientRepository.delete(db, cedula)
        if not cliente:
            raise ValueError(f"Cliente con cédula {cedula} no encontrado")
        return cliente
