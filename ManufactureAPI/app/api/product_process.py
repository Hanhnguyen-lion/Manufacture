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
    
    # items = await GetAllItems(request=request, table_name=J_Product_Process)
    # return productProcessesEntity(items)

    return get_product_process_detail(request=request)

def get_product_process_detail(request: Request):

    results = request.app.database['J_Product_Process'].aggregate([
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
                "from": "M_Process",
                "let": { "process_id": "$process_id" },
                "pipeline": [
                    { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$process_id"] }}}
                ],
                "as": "process_details"
            }
        },
        {
            '$unwind': '$process_details'
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
                "process_details": [
                    {
                        "item_id": { '$toString': "$process_details._id" },
                        "code": "$process_details.code",
                        "name": "$process_details.name",
                        "description": "$process_details.description",
                        "cost": "$process_details.cost",
                        "company_id": "$process_details.company_id",
                        "department_id": "$process_details.department_id",
                    }
                ]
            }
        }
        ])

    return list(results)

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