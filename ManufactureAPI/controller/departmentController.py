from fastapi import APIRouter, HTTPException, status

from models.department import Department
from database import get_db
from schemas.department import departmentEntity, departmentsEntity
from bson import ObjectId

M_Department: str = "M_Department"
department = APIRouter()

@department.post("/")
async def create_department(department:Department):
    with get_db() as conn:
        conn.database.M_Department.insert_one(dict(department))
        return departmentsEntity(conn.database.M_Department.find())

@department.get("/")
async def find_all_departments():
    with get_db() as conn:
        return departmentsEntity(conn.database.M_Department.find())

@department.get("/{id}")
async def find_one_department(id: str):
    with get_db() as conn:
        item = departmentEntity(conn.database.M_Department.find_one({"_id": ObjectId(id)}))
        if item is not None:
            return item
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Department with ID {id} not found")
    
@department.put("/{id}")
async def update_department(id: str, department:Department):
    with get_db() as conn:
        conn.database.M_Department.find_one_and_update({"_id": ObjectId(id)},{
            "$set": dict(department)})
        return departmentEntity(conn.database.M_Department.find_one({"_id": ObjectId(id)}))

@department.delete("/{id}")
async def delete_department(id: str):
    with get_db() as conn:
        return departmentEntity(conn.database.M_Department.find_one_and_delete({"_id": ObjectId(id)}))
