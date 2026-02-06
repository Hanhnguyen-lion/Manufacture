from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Request, Response

from models.employee import Employee
from schemas.employee import employeeEntity, employeesDepartmentEntity, employeesEntity

employee_router=APIRouter()

M_Employee = "M_Employee"

@employee_router.post("/")
async def create_employee(employee:Employee, request: Request):
    exists_employee = request.app.database.M_Employee.find_one(
        {
            "code": {"$regex": employee.code, "$options": "i"}
        })
    
    if exists_employee:
        return HTTPException(status_code=status.HTTP_409_CONFLICT,
                             detail=f"Code already exists") 

    new_tem = request.app.database.M_Employee.insert_one(dict(employee))
    
    if new_tem is not None:
        return employeeEntity(request.app.database.M_Employee.find_one({"_id": ObjectId(new_tem.inserted_id)}))
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Employee Inserted fail")   

@employee_router.get("/")
async def find_all_employees(request: Request):
    return employeesDepartmentEntity(get_employees(request=request))

@employee_router.get("/employees_company/{company_id}")
async def get_employees_company(request: Request, company_id: str):
    items = [li for li in get_employees(request) if li["company_id"] == company_id]
    return employeesDepartmentEntity(items)

@employee_router.get("/{id}")
async def find_one_employee(id: str, request: Request):
    
    item = employeeEntity(request.app.database.M_Employee.find_one({"_id": ObjectId(id)}))
    
    if item is not None:
        return item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Employee with ID {id} not found")
    
@employee_router.put("/{id}")
async def update_employee(id: str, employee: Employee, request: Request):

    exists_employee = request.app.database.M_Employee.find_one(
                                      {"code": {"$regex": employee.code, "$options": "i"},
                                       "_id": {"$ne": ObjectId(id)}})
    if exists_employee:
        return HTTPException(
            status_code=status.HTTP_409_CONFLICT, 
            detail="Code already exists")

    update_result = request.app.database.M_Employee.update_one({"_id": ObjectId(id)},{
        "$set": dict(employee)})
    
    if update_result.matched_count <= 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with ID {id} not found")
    
    exists_item = employeeEntity(request.app.database.M_Employee.find_one({"_id": ObjectId(id)}))
    
    if exists_item is not None:
        return exists_item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Employee with ID {id} not found")

@employee_router.delete("/{id}")
async def delete_employee(id: str, request: Request, response: Response):
    delete_result = request.app.database.M_Employee.delete_one({"_id": ObjectId(id)})
    
    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    
    raise HTTPException(status_code=status.HTTP_200_OK, 
                       detail=f"Employee deleted successfully")

def get_employees(request: Request):

    results = request.app.database['M_Employee'].aggregate([
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
        "$lookup": {
            "from": "M_Department",
            "let": { "department_id": "$department_id" },
            "pipeline": [
                { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$department_id"] }}}
            ],
            "as": "department_details"
        }
    },
    {
        '$unwind': '$department_details'
    },
    {
        "$project":{
            #"_id": { '$toString': "$_id" },
            "_id": "$_id",
            "code": 1,
            "name": 1,
            "job_title": 1,
            "company_id": 1,
            'company_code': '$company_details.code',
            'company_name': '$company_details.name',
            'department_name': '$department_details.name'
        }
    }
    ])
    return list(results)    

