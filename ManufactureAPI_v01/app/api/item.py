from fastapi import APIRouter, status, Request

from app.model import Item

from app.schema import itemEntity, itemsEntity

from app.api.BaseApi import GetItemById, GetAllItems

from app.api.BaseApi import CreateItem, UpdateItem, DeleteItem

from utilis import Utilis

item_router = APIRouter()

M_Item = "M_Item"
Title = "Product"

@item_router.post("/add")
async def add(item: Item, request: Request):
    
    item.start_plan_date = Utilis.encode_date(item.start_plan_date)
    
    item.end_plan_date = Utilis.encode_date(item.end_plan_date)
    
    item.production_date = Utilis.encode_date(item.production_date)
    
    item.created_date = Utilis.encode_date(item.created_date)

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=M_Item,
                      message_err=f"Create item fail",
                      message_duplicate=f"Code already exists")
    
    if new_item.status_code == status.HTTP_200_OK:
        return itemEntity(new_item.detail)
    
    return new_item


@item_router.get("/")
async def getItems(request: Request):
    
    items = await GetAllItems(request=request, table_name=M_Item)
    return itemsEntity(items)

@item_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=M_Item,
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return itemEntity(item.detail)
    
    return item
    
@item_router.put("/{id}")
async def update(id: str, item: Item, request: Request):
    
    item.start_plan_date = Utilis.encode_date(item.start_plan_date)
    
    item.end_plan_date = Utilis.encode_date(item.end_plan_date)
    
    item.production_date = Utilis.encode_date(item.production_date)
    
    item.created_date = Utilis.encode_date(item.created_date)

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=M_Item,
        message_duplicate="Code already exists",
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return itemEntity(item.detail)
    
    return item

@item_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=M_Item,
        message_err=f"{Title} with ID {id} not found",
        message_success=f"{Title} deleted successfully")

    return delete_result    

