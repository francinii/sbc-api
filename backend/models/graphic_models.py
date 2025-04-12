from typing import List, Dict
from pydantic import BaseModel

class LineData(BaseModel):
    name: str
    data: List[float]
    color: str

class BarData(BaseModel):
    name: str
    data: List[int]

class GraphicResponseModel(BaseModel):
    id: int
    labelx: List[int] 
    bar: BarData
    lines: List[LineData]
    title: str
    description: str
