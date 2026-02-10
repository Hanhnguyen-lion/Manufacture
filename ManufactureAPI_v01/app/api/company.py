from bson import ObjectId
from fastapi import APIRouter, Request

from app.schema import companiesDepartemntEntity


app_router = APIRouter()

@app_router.get("/")
async def load_company_departments(request: Request):
   
    result = get_company_departments(request)
    return companiesDepartemntEntity(result)


def get_company_departments(request: Request):

    results = request.app.database['M_Company'].aggregate([
        { "$lookup": {
            "from": "M_Department",
            "let": { "id": "$_id" },
            "pipeline": [
            { "$match": { "$expr": { "$eq": [{ "$toString": "$$id" }, "$company_id"] }}}
            ],
            "as": "department_details"
        }}
        ])

    return list(results)  
