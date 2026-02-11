from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Request

from app.model import ProductProcess

from app.schema import productProcessEntity, productProcessesEntity

from app.api.BaseApi import DeleteItem, CreateItem, UpdateItem

from app.api.BaseApi import GetAllItems, GetItemById

product_process_router = APIRouter()

J_Product_Process = "J_Product_Process"
Title = "Product Process"

@product_process_router.post("/add")
async def add(item: ProductProcess, request: Request):

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=J_Product_Process,
                      message_err=f"Create product process fail",
                      message_duplicate=f"Code already exists",
                      check_duplicate=False)
    
    if new_item.status_code == status.HTTP_200_OK:
        return productProcessEntity(new_item.detail)
    
    return new_item

@product_process_router.get("/")
async def getItems(request: Request):
    
    items = await GetAllItems(request=request, table_name=J_Product_Process)
    return productProcessesEntity(items)

@product_process_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=J_Product_Process,
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return productProcessEntity(item.detail)
    
    return item
    
@product_process_router.put("/{id}")
async def update(id: str, item: ProductProcess, request: Request):

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=J_Product_Process,
        message_duplicate="Code already exists",
        message_err=f"{Title} with ID {id} not found",
        check_duplicate=False)
    
    if item.status_code == status.HTTP_200_OK:
        return productProcessEntity(item.detail)
    
    return item

@product_process_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=J_Product_Process,
        message_err=f"{Title} with ID {id} not found",
        message_success=f"{Title} deleted successfully")

    return delete_result