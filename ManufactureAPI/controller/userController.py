from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status, Request, Response

from auth.auth_handler import signJWT, decodeJWT
from auth.auth_bearer import JWTBearer
from models.user import User, loginSchema
from schemas.user import userEntity, usersCompanyEntity, usersEntity

user_router=APIRouter()

M_Account = "M_Account"

@user_router.post("/", dependencies=[Depends(JWTBearer())])
async def create_user(user:User, request: Request):
    exists_item = request.app.database.M_Account.find_one(
        {
            "email": {"$regex": user.email, "$options": "i"}
        })
    
    if exists_item:
        return HTTPException(status_code=status.HTTP_409_CONFLICT,
                             detail=f"Email already exists") 

    token = signJWT(
        user_id=user.email, 
        role=user.role,
        company_id=user.company_id)
    
    user.token = token["access_token"]

    new_tem = request.app.database.M_Account.insert_one(dict(user))
    if new_tem is not None:
        return token
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"User Inserted fail")   

@user_router.get("/users")
async def get_users(request: Request):

    return usersEntity(request.app.database.M_Account.find(limit=100))

@user_router.get("/")
async def find_all_users(request: Request):

    results = request.app.database['M_Account'].aggregate([
    { 
        "$lookup": {
            "from": "M_Company",
            "let": { "company_id": "$company_id" },
            "pipeline": [
                { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$company_id"] }}}
            ],
            "as": "company_details"
        }
    },
    {
        '$unwind': {
            "path": "$company_details",
            "preserveNullAndEmptyArrays": True 
        }
    },
    {
        "$project":{
            "_id": "$_id",
            "password": 1,
            "first_name": 1,
            "last_name": 1,
            "dob": 1,
            "gender": 1,
            "address": 1,
            "phone": 1,
            "email": 1,
            "role": 1,
            "account_type": 1,
            "token": 1,
            'company_id': 1,
            'company_code': '$company_details.code',
            'company_name': '$company_details.name'
        }
    }
    ])
    return usersCompanyEntity(list(results))

@user_router.get("/{id}")
async def find_one_user(id: str, request: Request):
    
    item = userEntity(request.app.database.M_Account.find_one({"_id": ObjectId(id)}))
    
    if item is not None:
        return item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with ID {id} not found")
    
@user_router.put("/{id}", dependencies=[Depends(JWTBearer())])
async def update_User(id: str, user: User, request: Request):

    exists_item = request.app.database.M_Account.find_one(
                                      {"email": {"$regex": user.email, "$options": "i"},
                                       "_id": {"$ne": ObjectId(id)}})

    if exists_item:
        return HTTPException(
            status_code=status.HTTP_409_CONFLICT, 
            detail="Email already exists")
    
    token = signJWT(
        user_id=user.email, 
        role=user.role,
        company_id=user.company_id)
    
    user.token = token["access_token"]

    update_result = request.app.database.M_Account.update_one({"_id": ObjectId(id)},{
        "$set": dict(user)})
    
    if update_result.matched_count <= 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with ID {id} not found")
    
    if token["access_token"]:
        return token["access_token"]
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"User with ID {id} not found")

@user_router.delete("/{id}")
async def delete_user(id: str, request: Request, response: Response):

    delete_result = request.app.database.M_Account.delete_one({"_id": ObjectId(id)})
    
    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    
    raise HTTPException(status_code=status.HTTP_200_OK, 
                       detail=f"User deleted successfully")

@user_router.post("/Authenticate")
async def Authenticate(request: Request, user: loginSchema):
    exists_item = request.app.database.M_Account.find_one(
                                      {"email": {"$regex": user.email, "$options": "i"},
                                       "password": {"$eq": user.password}})
    if exists_item:
        exists_item = userEntity(exists_item)
        token = signJWT(
            exists_item["email"],
            exists_item["role"],
            exists_item["company_id"])
        # user_item = {
        #     "email": exists_item["email"],
        #     "role": exists_item["role"],
        #     "account_type":exists_item["account_type"],
        #     "company_id": exists_item["company_id"]
        # }
        return HTTPException(status_code=status.HTTP_200_OK, detail=token["access_token"])
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                         detail="Email or Password incorrect")

@user_router.get("/Authenticate/{token}")
async def DecodeToken(token: str):
    if token:
        decode_token = decodeJWT(token)
        return HTTPException(status_code=status.HTTP_200_OK, detail=decode_token)
    return HTTPException(status_code=status.HTTP_403_FORBIDDEN, 
                         detail="Invalid token or expired token.")
