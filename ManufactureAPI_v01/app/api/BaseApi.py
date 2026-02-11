
from bson import ObjectId
from fastapi import Request, HTTPException, status

async def DeleteItem(
        request: Request, 
        id: str, 
        table_name: str,
        message_err:str,
        message_success:str):

    delete_result = request.app.database[table_name].delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return HTTPException(status_code=status.HTTP_200_OK,
                            detail=message_success)

    return HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                    detail=message_err)

async def CreateItem(
        request: Request, 
        item: any, 
        table_name: str,
        message_err:str,
        message_duplicate:str,
        check_duplicate:bool=True,
        key_duplicate:str="code",
        value_duplicate:str=None):

    if check_duplicate:
        if value_duplicate is None:
             value_duplicate = item.code
        exists_item = request.app.database[table_name].find_one(
            {
                key_duplicate: {"$regex": value_duplicate, "$options": "i"}
            })
        
        if exists_item:
            return HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail=message_duplicate) 

    new_item = request.app.database[table_name].insert_one(dict(item))
    
    if new_item is not None:
        return HTTPException(status_code=status.HTTP_200_OK,
                            detail=request.app.database[table_name].find_one({"_id": ObjectId(new_item.inserted_id)}))
    
    return HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=message_err)   

async def GetAllItems(
        request: Request, 
        table_name: str):
    
    return list(request.app.database[table_name].find(limit=100))

async def GetItemById(
        request:Request, 
        id: str, 
        table_name: str,
        message_err: str):
   
    item =  request.app.database[table_name].find_one({"_id": ObjectId(id)})
    
    if item is not None:
        return HTTPException(status_code=status.HTTP_200_OK,
                            detail=item)
    
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=message_err)
    
async def UpdateItem(
        request: Request, 
        id: str, 
        item: any, 
        table_name: str,
        message_err: str,
        message_duplicate: str,
        check_duplicate:bool=True,
        key_duplicate:str="code",
        value_duplicate:str=None):

    if check_duplicate:
        if value_duplicate is None:
             value_duplicate = item.code
        exists_item = request.app.database[table_name].find_one(
                                        {key_duplicate: {"$regex": item[value_duplicate], "$options": "i"},
                                        "_id": {"$ne": ObjectId(id)}})
        if exists_item:
            return HTTPException(
                status_code=status.HTTP_409_CONFLICT, 
                detail=message_duplicate)

    update_result = request.app.database[table_name].update_one({"_id": ObjectId(id)},{
        "$set": dict(item)})
    
    if update_result.matched_count <= 0:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=message_err)
    
    exists_item = request.app.database[table_name].find_one({"_id": ObjectId(id)})
    
    if exists_item is not None:
        return HTTPException(status_code=status.HTTP_200_OK,
                            detail=exists_item)
    
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                        detail=message_err)
