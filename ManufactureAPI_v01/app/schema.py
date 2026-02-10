
def departmentEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "phone": item["phone"],
        "company_id": item["company_id"]
    }

def categoryEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "code": item["code"],
        "name": item["name"],
        "description": item["description"]
    }

def productEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "code": item["code"],
        "name": item["name"],
        "description": item["description"],
        "standard_price": item["standard_price"],
        "unit_of_measure": item["unit_of_measure"],
        "company_id": item["company_id"],
        "department_id": item["department_id"],
        "category_id": item["category_id"]
    }

def storageEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "code": item["code"],
        "name": item["name"],
        "company_id": item["company_id"],
        "department_id": item["department_id"]
    }

def processEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "code": item["code"],
        "name": item["name"],
        "description": item["description"],
        "duration": item["duration"],
        "cost": item["cost"],
        "company_id": item["company_id"],
        "department_id": item["department_id"]
    }

def itemEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "code": item["code"],
        "name": item["name"],
        "status": item["status"],
        "quantity": item["quantity"],
        "start_plan_date": item["start_plan_date"],
        "end_plan_date": item["end_plan_date"],
        "production_date": item["production_date"],
        "created_date": item["created_date"],
        "company_id": item["company_id"],
        "department_id": item["department_id"],
        "product_id": item["product_id"],
        "storage_id": item["storage_id"]
    }

def productProcessEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "product_id": item["product_id"],
        "process_id": item["process_id"],
        "sequence_order": item["sequence_order"]
    }

def itemProcessEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "item_id": item["item_id"],
        "process_id": item["process_id"],
        "start_time": item["start_time"],
        "end_time": item["end_time"],
        "status": item["status"]
    }

def productItemEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "product_id": item["product_id"],
        "item_id": item["item_id"],
        "quantity_required": item["quantity_required"]
    }

def departmentsEntity(entity) -> list:
    return [departmentEntity(item) for item in entity]

def categoriesEntity(entity) -> list:
    return [categoryEntity(item) for item in entity]

def productsEntity(entity) -> list:
    return [productEntity(item) for item in entity]

def storagesEntity(entity) -> list:
    return [storageEntity(item) for item in entity]

def processesEntity(entity) -> list:
    return [processEntity(item) for item in entity]

def itemsEntity(entity) -> list:
    return [itemEntity(item) for item in entity]

def productItemsEntity(entity) -> list:
    return [productItemEntity(item) for item in entity]

def itemProcessesEntity(entity) -> list:
    return [itemProcessEntity(item) for item in entity]

def productProcessesEntity(entity) -> list:
    return [productProcessEntity(item) for item in entity]

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

def companiesDepartemntEntity(entity) -> list:
    return [CompanyDepartmentEntity(item) for item in entity]