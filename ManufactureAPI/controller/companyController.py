from fastapi import APIRouter

from models.company import Company
from database import get_db
from schemas.company import companiesEntity, CompanyEntity
from bson import ObjectId

M_Company: str = "M_Company"
company = APIRouter()

@company.post("/")
async def create_company(company:Company):
    with get_db() as conn:
        conn.database.M_Company.insert_one(dict(company))
        return companiesEntity(conn.database.M_Company.find())

@company.get("/")
async def find_all_companies():
    with get_db() as conn:
        return companiesEntity(conn.database.M_Company.find())

@company.get("/{id}")
async def find_one_company(id: str):
    with get_db() as conn:
        return CompanyEntity(conn.database.M_Company.find_one({"_id": ObjectId(id)}))
    
@company.put("/{id}")
async def update_company(id: str, company: Company):
    with get_db() as conn:
        conn.database.M_Company.find_one_and_update({"_id": ObjectId(id)},{
            "$set": dict(company)})
        return CompanyEntity(conn.database.M_Company.find_one({"_id": ObjectId(id)}))

@company.delete("/{id}")
async def delete_company(id: str):
    with get_db() as conn:
        return CompanyEntity(conn.database.M_Company.find_one_and_delete({"_id": ObjectId(id)}))
