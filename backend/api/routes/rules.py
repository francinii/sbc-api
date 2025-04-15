from typing import List
from fastapi import APIRouter, Depends
from requests import Session
from models.rules_models import RuleCreate, RuleResponse
from database import get_db
from services.rule_service import RuleService
from models.request_models import Graphic, Rule
from services.graphic_service import GraphicService

router = APIRouter()

@router.get("/", response_model=List[RuleResponse])
async def process_model_input(db: Session = Depends(get_db)):    
    return RuleService(db).get_rules()


@router.post("/", response_model=RuleResponse)
def create_rule(rule: RuleCreate, db: Session = Depends(get_db)):
    return RuleService(db).create_rule(rule)


@router.delete("/{rule_id}")
def delete_rule(rule_id: int, db: Session = Depends(get_db)):
    try:
        return RuleService(db).delete_rule(rule_id)
    except ValueError as e:
        return {"error": str(e)}