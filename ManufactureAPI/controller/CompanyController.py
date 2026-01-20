from fastapi import APIRouter, Request, Response, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models.company import Company, CompanyUpdate
M_Company: str = "M_Company"
router = APIRouter()

@router.post("/", response_description="Create a company", status_code=status.HTTP_201_CREATED, response_model=Company)
def create_company(request: Request, company: Company = Body(...)):
    company = jsonable_encoder(company)
    new_company = request.app.database[M_Company].insert_one(company)
    print("new_company.inserted_id="+new_company.inserted_id);
    created_company = request.app.database[M_Company].find_one(
        {"_id": new_company.inserted_id}
    )
    return created_company

@router.get("/", response_description="List all companies", response_model=List[Company])
def list_companies(request: Request):
    companies = list(request.app.database[M_Company].find(limit=100))
    return companies

@router.get("/{id}", response_description="Get a single company by id", response_model=Company)
def find_company(id: str, request: Request):
    if (company := request.app.database[M_Company].find_one({"_id": id})) is not None:
        return company
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Company with ID {id} not found")

@router.put("/{id}", response_description="Update a company", response_model=Company)
def update_company(id: str, request: Request, company: CompanyUpdate = Body(...)):
    company = {k: v for k, v in company.model_dump().items() if v is not None}
    if len(company) >= 1:
        update_result = request.app.database[M_Company].update_one(
            {"_id": id}, {"$set": company}
        )

        if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Company with ID {id} not found")

    if (
        existing_company := request.app.database[M_Company].find_one({"_id": id})
    ) is not None:
        return existing_company

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Company with ID {id} not found")

@router.delete("/{id}", response_description="Delete a company")
def delete_company(id: str, request:Request, response: Response):
    delete_result = request.app.database[M_Company].delete_one({"_id": id})
    if (delete_result.deleted_count == 1):
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Company with ID {id} not found")
