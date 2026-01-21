from bson import ObjectId
from fastapi import APIRouter

from models.user import User
from database import get_db
from schemas.user import userEntity, usersEntity

user_router=APIRouter()

M_Account = "M_Account"

@user_router.post("/")
async def create_user(user:User):
    with get_db() as conn:
        conn.database.M_Account.insert_one(dict(user))
        return usersEntity(conn.database.M_Account.find())

@user_router.get("/")
async def find_all_users():
    with get_db() as conn:
        return usersEntity(conn.database.M_Account.find())

@user_router.get("/{id}")
async def find_one_user(id: str):
    with get_db() as conn:
        return userEntity(conn.database.M_Account.find_one({"_id": ObjectId(id)}))
    
@user_router.put("/{id}")
async def update_User(id: str, user: User):
    with get_db() as conn:
        conn.database.M_Account.find_one_and_update({"_id": ObjectId(id)},{
            "$set": dict(user)})
        return userEntity(conn.database.M_Account.find_one({"_id": ObjectId(id)}))

@user_router.delete("/{id}")
async def delete_user(id: str):
    with get_db() as conn:
        return userEntity(conn.database.M_Account.find_one_and_delete({"_id": ObjectId(id)}))
