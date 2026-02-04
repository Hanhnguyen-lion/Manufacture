
from pydantic import Field

from schemas.department import departmentsEntity


def CompanyEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "code": item.get("code", None),
        "name": item["name"],
        "description": item["description"],
        "country": item["country"],
        "address": item["address"],
        "phone": item["phone"],
        "email": item["email"]
    }

def CompanyDepartmentEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "code": item.get("code", None),
        "name": item["name"],
        "description": item["description"],
        "country": item["country"],
        "address": item["address"],
        "phone": item["phone"],
        "email": item["email"],
        "departments":departmentsEntity(item["department_details"])
    }

def companiesEntity(entity) -> list:
    return [CompanyEntity(item) for item in entity]


def companiesDepartemntEntity(entity) -> list:
    return [CompanyDepartmentEntity(item) for item in entity]