from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Request

from app.model import ProductItem

from app.schema import productItemEntity, productItemsEntity

from app.api.BaseApi import DeleteItem, CreateItem, UpdateItem

from app.api.BaseApi import GetAllItems, GetItemById

product_item_router = APIRouter()

J_Product_Item = "J_Product_Item"
Title = "Product Item"

@product_item_router.post("/add")
async def add(item: ProductItem, request: Request):

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=J_Product_Item,
                      message_err=f"Create product item fail",
                      message_duplicate=f"Code already exists",
                      check_duplicate=False)
    
    if new_item.status_code == status.HTTP_200_OK:
        return productItemEntity(new_item.detail)
    
    return new_item

@product_item_router.get("/")
async def getItems(request: Request):
    
    # items = await GetAllItems(request=request, table_name=J_Product_Item)
    # return productItemsEntity(items)

    return get_product_item_detail(request=request)

def get_product_item_detail(request: Request):

    results = request.app.database['J_Product_Item'].aggregate([
        { "$lookup": {
            "from": "M_Product",
            "let": { "product_id": "$product_id" },
            "pipeline": [
            { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$product_id"] }}}
            ],
            "as": "product_details"
        }},
        {
            '$unwind': '$product_details'
        },
        { 
            "$lookup": {
                "from": "M_Item",
                "let": { "item_id": "$item_id" },
                "pipeline": [
                    { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$item_id"] }}}
                ],
                "as": "item_details"
            }
        },
        {
            '$unwind': '$item_details'
        },
        {
            "$project":{
                "_id": { '$toString': "$_id" },
                "product_id": { '$toString': "$product_details._id" },
                "product_code": "$product_details.code",
                "product_name": "$product_details.name",
                "product_standard_price": "$product_details.standard_price",
                "product_unit_of_measure": "$product_details.unit_of_measure",
                "product_company_id": "$product_details.company_id",
                "product_department_id": "$product_details.department_id",
                "product_category_id": "$product_details.category_id",
                "item_details": [
                    {
                        "item_id": { '$toString': "$item_details._id" },
                        "code": "$item_details.code",
                        "name": "$item_details.name",
                        "status": "$item_details.status",
                        "quantity": "$item_details.quantity",
                        "start_plan_date": "$item_details.start_plan_date",
                        "end_plan_date": "$item_details.end_plan_date",
                        "production_date": "$item_details.production_date",
                        "created_date": "$item_details.created_date",
                        "company_id": "$item_details.company_id",
                        "department_id": "$item_details.department_id",
                        "product_id": "$item_details.product_id",
                        "storage_id": "$item_details.storage_id"
                    }
                ]
            }
        }
        ])

    return list(results)

@product_item_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=J_Product_Item,
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return productItemEntity(item.detail)
    
    return item
    
@product_item_router.put("/{id}")
async def update(id: str, item: ProductItem, request: Request):

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=J_Product_Item,
        message_duplicate="Code already exists",
        message_err=f"{Title} with ID {id} not found",
        check_duplicate=False)
    
    if item.status_code == status.HTTP_200_OK:
        return productItemEntity(item.detail)
    
    return item

@product_item_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=J_Product_Item,
        message_err=f"{Title} with ID {id} not found",
        message_success=f"{Title} deleted successfully")

    return delete_result
    