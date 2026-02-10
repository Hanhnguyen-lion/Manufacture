from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Request

from app.model import Process

from app.schema import processEntity, processesEntity

from app.api.BaseApi import DeleteItem, CreateItem, UpdateItem

from app.api.BaseApi import GetAllItems, GetItemById

process_router = APIRouter()

M_Process = "M_Process"
Title = "Process"

@process_router.post("/add")
async def add(item: Process, request: Request):

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=M_Process,
                      message_err=f"Create process fail",
                      message_duplicate=f"Code already exists")
    
    if new_item.status_code == status.HTTP_200_OK:
        return processEntity(new_item.detail)
    
    return new_item

@process_router.get("/")
async def getItems(request: Request):
    
    items = await GetAllItems(request=request, table_name=M_Process)
    return processesEntity(items)

@process_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=M_Process,
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return processEntity(item.detail)
    
    return item
    
@process_router.put("/{id}")
async def update(id: str, item: Process, request: Request):

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=M_Process,
        message_duplicate="Code already exists",
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return processEntity(item.detail)
    
    return item

@process_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=M_Process,
        message_err=f"{Title} with ID {id} not found",
        message_success=f"{Title} deleted successfully")

    return delete_result    

