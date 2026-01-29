from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Request, Response

from models.employee import Employee
from schemas.employee import employeeEntity, employeesEntity

employee_router=APIRouter()

M_Employee = "M_Employee"

@employee_router.post("/")
async def create_employee(employee:Employee, request: Request):

    new_tem = request.app.M_Employee.insert_one(dict(employee))
    
    if new_tem is not None:
        return employeeEntity(request.app.database.M_Employee.find_one({"_id": ObjectId(new_tem.inserted_id)}))
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Employee Inserted fail")   

@employee_router.get("/")
async def find_all_employees(request: Request):
    return employeesEntity(request.app.database.M_Employee.find(limit=100))

@employee_router.get("/{id}")
async def find_one_employee(id: str, request: Request):
    
    item = employeeEntity(request.app.database.M_Employee.find_one({"_id": ObjectId(id)}))
    
    if item is not None:
        return item
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Employee with ID {id} not found")
    
@employee_router.put("/{id}")
async def update_employee(id: str, employee: Employee, request: Request):

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
    delete_result = employeeEntity(request.app.database.M_Employee.delete_one({"_id": ObjectId(id)}))
    
    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    
    raise HTTPException(status_code=status.HTTP_200_OK, 
                       detail=f"Employee deleted successfully")
