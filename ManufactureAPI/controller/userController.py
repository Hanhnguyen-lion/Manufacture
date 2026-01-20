from fastapi import APIRouter

from models.user import User
from database import get_db
from schemas.user import userEntity, usersEntity

user=APIRouter()
M_Account = "M_Account"
@user.get("/")
async def find_all_users():
    with get_db() as conn:
        return usersEntity(conn.database.M_Account.find())