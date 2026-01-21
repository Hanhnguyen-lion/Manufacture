from bson import ObjectId
from fastapi import APIRouter

from models.employee import Employee
from database import get_db
from schemas.employee import employeeEntity, employeesEntity

employee_router=APIRouter()

M_Employee = "M_Employee"

@employee_router.post("/")
async def create_employee(employee:Employee):
    with get_db() as conn:
        conn.database.M_Employee.insert_one(dict(employee))
        return employeesEntity(conn.database.M_Employee.find())

@employee_router.get("/")
async def find_all_employees():
    with get_db() as conn:
        return employeesEntity(conn.database.M_Employee.find())

@employee_router.get("/{id}")
async def find_one_employee(id: str):
    with get_db() as conn:
        return employeeEntity(conn.database.M_Employee.find_one({"_id": ObjectId(id)}))
    
@employee_router.put("/{id}")
async def update_employee(id: str, employee: Employee):
    with get_db() as conn:
        conn.database.M_Employee.find_one_and_update({"_id": ObjectId(id)},{
            "$set": dict(employee)})
        return employeeEntity(conn.database.M_Employee.find_one({"_id": ObjectId(id)}))

@employee_router.delete("/{id}")
async def delete_employee(id: str):
    with get_db() as conn:
        return employeeEntity(conn.database.M_Employee.find_one_and_delete({"_id": ObjectId(id)}))
