from fastapi import APIRouter, HTTPException, Request, Response, status

from models.company import Company
from schemas.company import companiesEntity, CompanyEntity
from bson import ObjectId

M_Company: str = "M_Company"
company = APIRouter()

@company.post("/")
async def create_company(company:Company, request: Request):
    new_company = request.app.database.M_Company.insert_one(dict(company))
    if new_company is not None:
        return CompanyEntity(request.app.database.M_Company.find_one({"_id": ObjectId(new_company.inserted_id)}))
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Company Inserted fail")   

@company.get("/")
async def find_all_companies(request: Request):
    return companiesEntity(request.app.database.M_Company.find(limit=100))

@company.get("/{id}")
async def find_one_company(id: str, request:Request):
    company =  CompanyEntity(request.app.database.M_Company.find_one({"_id": ObjectId(id)}))
    if company is not None:
        return company
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Company with ID {id} not found")
    
@company.put("/{id}")
async def update_company(id: str, company: Company, request: Request):
    update_result = request.app.database.M_Company.update_one({"_id": ObjectId(id)},{
        "$set": dict(company)})
    if update_result.matched_count <= 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"Company with ID {id} not found")
    exists_company = CompanyEntity(request.app.database.M_Company.find_one({"_id": ObjectId(id)}))
    if exists_company is not None:
        return exists_company
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                        detail=f"Company with ID {id} not found")

@company.delete("/{id}")
async def delete_company(id: str, request: Request, response: Response):
    delete_result = request.app.database.M_Company.delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    raise HTTPException(status_code=status.HTTP_200_OK,
                        detail=f"Company deleted successfully");
