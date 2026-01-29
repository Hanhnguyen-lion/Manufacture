from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Request, Response

from models.user import User
from schemas.user import userEntity, usersEntity

user_router=APIRouter()

M_Account = "M_Account"

@user_router.post("/")
async def create_user(user:User, request: Request):

    new_tem = request.app.M_Employee.insert_one(dict(user))
    
    if new_tem is not None:
        return usersEntity(request.app.database.M_Account.find_one({"_id": ObjectId(new_tem.inserted_id)}))
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"User Inserted fail")   

@user_router.get("/")
async def find_all_users(request: Request):

    return usersEntity(request.app.database.M_Account.find(limit=100))

@user_router.get("/{id}")
async def find_one_user(id: str, request: Request):
    
    item = userEntity(request.app.database.M_Account.find_one({"_id": ObjectId(id)}))
    
    if item is not None:
        return item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with ID {id} not found")
    
@user_router.put("/{id}")
async def update_User(id: str, user: User, request: Request):

    update_result = request.app.database.M_Account.update_one({"_id": ObjectId(id)},{
        "$set": dict(user)})
    
    if update_result.matched_count <= 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with ID {id} not found")
    
    exists_item = userEntity(request.app.database.M_Account.find_one({"_id": ObjectId(id)}))
    
    if exists_item is not None:
        return exists_item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"User with ID {id} not found")

@user_router.delete("/{id}")
async def delete_user(id: str, request: Request, response: Response):

    delete_result = userEntity(request.app.database.M_Account.delete_one({"_id": ObjectId(id)}))
    
    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    
    raise HTTPException(status_code=status.HTTP_200_OK, 
                       detail=f"User deleted successfully")
