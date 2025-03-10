from pydantic import BaseModel

class ApplicantResponse(BaseModel):
    regla : str
    descripcion :  str
    puntos: str

