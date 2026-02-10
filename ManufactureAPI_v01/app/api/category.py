from fastapi import APIRouter, status, Request

from app.model import Category

from app.schema import categoryEntity, categoriesEntity

from app.api.BaseApi import CreateItem, UpdateItem, DeleteItem, GetAllItems, GetItemById

category_router = APIRouter()

M_Category = "M_Category"

@category_router.post("/add")
async def add(item: Category, request: Request):

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=M_Category,
                      message_err=f"Create category fail",
                      message_duplicate=f"Code already exists")
    
    if new_item.status_code == status.HTTP_200_OK:
        return categoryEntity(new_item.detail)
    
    return new_item

@category_router.get("/")
async def getItems(request: Request):
    
    items = await GetAllItems(request=request, table_name=M_Category)
    return categoriesEntity(items)

@category_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=M_Category,
        message_err=f"Category with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return categoryEntity(item.detail)
    
    return item
    
@category_router.put("/{id}")
async def update(id: str, item: Category, request: Request):

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=M_Category,
        message_duplicate="Code already exists",
        message_err=f"Category with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return categoryEntity(item.detail)
    
    return item

@category_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=M_Category,
        message_err=f"Category with ID {id} not found",
        message_success=f"Category deleted successfully")

    return delete_result
    

