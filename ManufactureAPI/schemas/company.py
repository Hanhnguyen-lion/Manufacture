
from pydantic import Field


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

def companiesEntity(entity) -> list:
    return [CompanyEntity(item) for item in entity]