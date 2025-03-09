from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from services.client_service import ClienteService
from database import get_db  # Asegúrate de tener esta función en tu configuración de la base de datos

router = APIRouter()

@router.post("/")
def create_cliente(cliente_data: dict, db: Session = Depends(get_db)):
    """Crea un nuevo cliente."""
    try:
        return ClienteService.create(db, cliente_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{cedula}")
def get_cliente(cedula: str, db: Session = Depends(get_db)):
    """Obtiene un cliente por su cédula."""
    try:
        return ClienteService.get_client_by_id(db, cedula)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/")
def get_all_clientes(db: Session = Depends(get_db)):
    """Obtiene todos los clientes."""
    return ClienteService.get_all(db)

@router.put("/{cedula}")
def update_cliente(cedula: str, update_data: dict, db: Session = Depends(get_db)):
    """Actualiza un cliente por su cédula."""
    try:
        return ClienteService.update(db, cedula, update_data)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{cedula}")
def delete_cliente(cedula: str, db: Session = Depends(get_db)):
    """Elimina un cliente por su cédula."""
    try:
        return ClienteService.delete(db, cedula)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
