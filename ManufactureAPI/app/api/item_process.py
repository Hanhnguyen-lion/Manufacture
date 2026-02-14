from fastapi import APIRouter, status, Request

from app.model import ItemProcess

from app.schema import itemProcessEntity, itemProcessesEntity

from app.api.BaseApi import DeleteItem, CreateItem, UpdateItem

from app.api.BaseApi import GetAllItems, GetItemById
from utilis import Utilis

item_process_router = APIRouter()

J_Item_Process = "J_Item_Process"

Title = "Item Process"

@item_process_router.post("/add")
async def add(item: ItemProcess, request: Request):
    
    item.start_time = Utilis.encode_date(item.start_time)
    
    item.end_time = Utilis.encode_date(item.end_time)

    new_item = await CreateItem(request=request,
                      item=item,
                      table_name=J_Item_Process,
                      message_err=f"Create item process fail",
                      message_duplicate=f"Code already exists",
                      check_duplicate=False)
    
    if new_item.status_code == status.HTTP_200_OK:
        return itemProcessEntity(new_item.detail)
    
    return new_item

@item_process_router.get("/")
async def getItems(request: Request):
    
    items = get_item_process_detail(request)
    return items
    # items = await GetAllItems(request=request, table_name=J_Item_Process)
    # return itemProcessesEntity(items)

# @item_process_router.get("/item_process_detail")
# async def getItemProcessDetail(request: Request):
    
#     items = get_item_process_detail(request)
#     return items


def get_item_process_detail(request: Request):

    results = request.app.database['J_Item_Process'].aggregate([
        { "$lookup": {
            "from": "M_Item",
            "let": { "item_id": "$item_id" },
            "pipeline": [
            { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$item_id"] }}}
            ],
            "as": "item_details"
        }},
        {
            '$unwind': '$item_details'
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
        }
        ,
        {
            "$project":{
                "_id": { '$toString': "$_id" },
                "item_id": { '$toString': "$item_details._id" },
                "item_code": "$item_details.code",
                "item_name": "$item_details.name",
                "item_quantity": "$item_details.quantity",
                "item_start_plan_date": "$item_details.start_plan_date",
                "item_end_plan_date": "$item_details.end_plan_date",
                "item_production_date": "$item_details.production_date",
                "item_created_date": "$item_details.created_date",
                "process_details": [
                    {
                        "process_id": { '$toString': "$process_details._id" },
                        "code": "$process_details.code",
                        "name": "$process_details.name",
                        "description": "$process_details.description",
                        "duration": "$process_details.duration",
                        "cost": "$process_details.cost",
                        "company_id": "$process_details.company_id",
                        "department_id": "$process_details.department_id"
                    }
                ]
            }
        }
        ])
    # result_list = []
    # for doc in results:
    #     doc['_id'] = str(doc['_id'])
    #     result_list.append(doc)

    return list(results)


@item_process_router.get("/{id}")
async def getItemById(id: str, request:Request):
   
    item = await GetItemById(
        request=request, 
        id=id,
        table_name=J_Item_Process,
        message_err=f"{Title} with ID {id} not found")
    
    if item.status_code == status.HTTP_200_OK:
        return itemProcessEntity(item.detail)
    
    return item
    
@item_process_router.put("/{id}")
async def update(id: str, item: ItemProcess, request: Request):
    
    item.start_time = Utilis.encode_date(item.start_time)
    
    item.end_time = Utilis.encode_date(item.end_time)

    item = await UpdateItem(
        request=request, 
        id=id,
        item=item,
        table_name=J_Item_Process,
        message_duplicate="Code already exists",
        message_err=f"{Title} with ID {id} not found",
        check_duplicate=False)
    
    if item.status_code == status.HTTP_200_OK:
        return itemProcessEntity(item.detail)
    
    return item

@item_process_router.delete("/{id}")
async def delete(id: str, request: Request):
    
    delete_result = await DeleteItem(
        request=request,
        id=id,
        table_name=J_Item_Process,
        message_err=f"{Title} with ID {id} not found",
        message_success=f"{Title} deleted successfully")

    return delete_result