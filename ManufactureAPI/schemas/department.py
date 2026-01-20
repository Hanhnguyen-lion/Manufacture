def departmentEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "phone": item["phone"],
        "company_id": item["company_id"]
    }

def departmentsEntity(entity) -> list:
    return [departmentEntity(item) for item in entity]