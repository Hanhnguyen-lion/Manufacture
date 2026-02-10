from fastapi import APIRouter, status, Request

from app.api.BaseApi import CreateItem, UpdateItem, DeleteItem

from app.api.BaseApi import GetAllItems, GetItemById

from app.model import Storage

from app.schema import storageEntity, storagesEntity

storage_router = APIRouter()

M_Storage = "M_Storage"

@storage_router.post("/add")
async def add(item: Storage, request: Request):

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=M_Storage,
                      message_err=f"Create storage fail",
                      message_duplicate=f"Code already exists")
    
    if new_item.status_code == status.HTTP_200_OK:
        return storageEntity(new_item.detail)
    
    return new_item

@storage_router.get("/")
async def getItems(request: Request):
    
    items = await GetAllItems(request=request, table_name=M_Storage)
    return storagesEntity(items)

@storage_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=M_Storage,
        message_err=f"Storage with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return storageEntity(item.detail)
    
    return item
    
@storage_router.put("/{id}")
async def update(id: str, item: Storage, request: Request):

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=M_Storage,
        message_duplicate="Code already exists",
        message_err=f"Storage with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return storageEntity(item.detail)
    
    return item

@storage_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=M_Storage,
        message_err=f"Storage with ID {id} not found",
        message_success=f"Storage deleted successfully")

    return delete_result
