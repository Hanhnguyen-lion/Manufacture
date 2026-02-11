from datetime import datetime

from dotenv import dotenv_values

from fastapi import APIRouter, HTTPException, status, Request, Depends

from app.model import User, LoginSchema

from app.schema import userEntity, usersEntity

from app.api.BaseApi import DeleteItem, CreateItem, UpdateItem

from app.api.BaseApi import GetAllItems, GetItemById

from app.auth.auth_bearer import JWTBearer

from app.auth.auth_handler import signJWT, decodeJWT

from utilis import Utilis

user_router = APIRouter()

config = dotenv_values(".env")

M_Account = "M_Account"
Title = "User"
@user_router.post("/add", dependencies=[Depends(JWTBearer())])
async def add(item: User, request: Request):

    token = signJWT(
        user_id=item.email,
        user_role=item.role,
        company_id=item.company_id)
    
    item.token = token["access_token"]
    
    item.create_date = datetime.now()
    item.modify_date = datetime.now()

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=M_Account,
                      message_err=f"Create user fail",
                      message_duplicate=f"Email already exists",
                      value_duplicate=item.email,
                      key_duplicate="email")
    
    if new_item.status_code == status.HTTP_200_OK:
        return userEntity(new_item.detail)
    
    return new_item

@user_router.get("/", dependencies=[Depends(JWTBearer())])
async def getItems(request: Request):
    
    items = await GetAllItems(request=request, table_name=M_Account)
    return usersEntity(items)

@user_router.get("/{id}", dependencies=[Depends(JWTBearer())])
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=M_Account,
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return userEntity(item.detail)
    
    return item
    
@user_router.put("/{id}", dependencies=[Depends(JWTBearer())])
async def update(id: str, item: User, request: Request):
    token = signJWT(
        user_id=item.email, 
        role=item.role,
        company_id=item.company_id)
    
    item.token = token["access_token"]
    
    exists_item = await GetItemById(
        request=request,
        id=id,
        table_name=M_Account,
        message_err=f"{Title} with ID {id} not found")
    
    today = datetime.now()
    
    if exists_item.get("create_date", "1900-01-01") == "1900-01-01":
        item.create_date = today
    else:
        item.create_date = exists_item["create_date"]

    item.modify_date = today

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=M_Account,
        message_duplicate="Email already exists",
        message_err=f"{Title} with ID {id} not found",
        value_duplicate=item.email,
        key_duplicate="email")
    
    if item.status_code == status.HTTP_200_OK:
        return userEntity(item.detail)
    
    return item

@user_router.delete("/{id}", dependencies=[Depends(JWTBearer())])
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=M_Account,
        message_err=f"{Title} with ID {id} not found",
        message_success=f"{Title} deleted successfully")

    return delete_result

@user_router.post("/authenticate")
async def authenticate(request: Request, loginItem: LoginSchema):
    exists_item = request.app.database.M_Account.find_one(
                                      {"email": {"$regex": loginItem.email, "$options": "i"},
                                       "password": {"$eq": loginItem.password}})
    if exists_item:
        
        exists_item = userEntity(exists_item)

        role = exists_item["role"]
        account_type = exists_item["account_type"]
        create_date = exists_item["create_date"]

        freeExpireDay = config["FreeExpireDay"]
        memberExpireDay = config["MemberExpireDay"]

        expire:bool = False
        if role != "Super Admin":
            if account_type == "Free":
                expire = Utilis.expire_date(create_date.date(), int(freeExpireDay))
            else:
                expire = Utilis.expire_date(create_date.date(), int(memberExpireDay))

        if expire:

            return HTTPException(status_code=status.HTTP_409_CONFLICT, detail="This Account is expire.")
        
        else:
            token = signJWT(
                exists_item["email"],
                exists_item["last_name"],
                exists_item["first_name"],
                exists_item["role"],
                exists_item["company_id"])

            return HTTPException(status_code=status.HTTP_200_OK, detail=token["access_token"])

    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                         detail="Email or Password incorrect")        
    
