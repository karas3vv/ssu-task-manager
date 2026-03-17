from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Category
from ..schemas import CategoryRead
from ..security import get_current_user

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryRead])
def get_categories(db: Session = Depends(get_db), _user=Depends(get_current_user)):
    return db.query(Category).order_by(Category.title.asc()).all()
