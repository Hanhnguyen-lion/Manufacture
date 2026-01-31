def departmentEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "phone": item["phone"],
        "company_id": item["company_id"]
    }

def departmentCompanyEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "phone": item["phone"],
        "company_id": item["company_id"],
        "company_name": item["company_name"]
    }

def departmentsEntity(entity) -> list:
    return [departmentCompanyEntity(item) for item in entity]