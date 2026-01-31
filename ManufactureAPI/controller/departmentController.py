from fastapi import APIRouter, HTTPException, status, Request, Response

from models.department import Department
from schemas.department import departmentEntity, departmentsEntity
from bson import ObjectId

M_Department: str = "M_Department"
department = APIRouter()

@department.post("/")
async def create_department(department:Department, request: Request):
    
    new_tem = request.app.database.M_Department.insert_one(dict(department))
    
    if new_tem is not None:
        return departmentEntity(request.app.database.M_Department.find_one({"_id": ObjectId(new_tem.inserted_id)}))
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Department Inserted fail")   

@department.get("/")
async def find_all_departments(request: Request):
    return departmentsEntity(get_departments(request))

# @department.get("/department_list")
# async def get_department_list(request: Request):
#     return get_departments(request)

@department.get("/{id}")
async def find_one_department(id: str, request: Request):
    
    item = departmentEntity(request.app.database.M_Department.find_one({"_id": ObjectId(id)}))
    
    if item is not None:
        return item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Department with ID {id} not found")
    
@department.put("/{id}")
async def update_department(id: str, department:Department, request: Request):
    
    update_result = request.app.database.M_Department.update_one({"_id": ObjectId(id)},{
        "$set": dict(department)})
    
    if update_result.matched_count <= 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Department with ID {id} not found")
    
    exists_item = departmentEntity(request.app.database.M_Department.find_one({"_id": ObjectId(id)}))
    
    if exists_item is not None:
        return exists_item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Department with ID {id} not found")

@department.delete("/{id}")
async def delete_department(id: str, request: Request, response: Response):
    
    delete_result = departmentEntity(request.app.database.M_Department.delete_one({"_id": ObjectId(id)}))
    
    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    
    raise HTTPException(status_code=status.HTTP_200_OK, 
                       detail=f"Department deleted successfully")

def get_departments(request: Request):

    results = request.app.database['M_Department'].aggregate([
    { 
        "$lookup": {
            "from": "M_Company",
            "let": { "company_id": "$company_id" },
            "pipeline": [
                { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$company_id"] }}}
            ],
            "as": "company_details"
        }
    },
    {
        '$unwind': '$company_details'
    },
    {
        "$project":{
            #"_id": { '$toString': "$_id" },
            "_id": "$_id",
            "name": 1,
            "phone": 1,
            "company_id": 1,
            'company_code': '$company_details.code',
            'company_name': '$company_details.name'
        }
    }
    ])


    return list(results)    


