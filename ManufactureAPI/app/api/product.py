from fastapi import APIRouter, status, Request

from app.model import Product

from app.schema import productEntity, productsEntity

from app.api.BaseApi import DeleteItem, CreateItem, UpdateItem

from app.api.BaseApi import GetAllItems, GetItemById

product_router = APIRouter()

M_Product = "M_Product"
Title = "Product"
@product_router.post("/add")
async def add(item: Product, request: Request):

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=M_Product,
                      message_err=f"Create product fail",
                      message_duplicate=f"Code already exists")
    
    if new_item.status_code == status.HTTP_200_OK:
        return productEntity(new_item.detail)
    
    return new_item

@product_router.get("/")
async def getItems(request: Request):
    
    items = await GetAllItems(request=request, table_name=M_Product)
    return productsEntity(items)

@product_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=M_Product,
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return productEntity(item.detail)
    
    return item
    
@product_router.put("/{id}")
async def update(id: str, item: Product, request: Request):

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=M_Product,
        message_duplicate="Code already exists",
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return productEntity(item.detail)
    
    return item

@product_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=M_Product,
        message_err=f"{Title} with ID {id} not found",
        message_success=f"{Title} deleted successfully")

    return delete_result