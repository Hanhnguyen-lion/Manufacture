
def companyEntity(item) -> dict:
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

def employeeEntity(item) -> dict:
    return{
        "id": str(item["_id"]),
        "company_id": item.get("company_id", None),
        "department_id": item["department_id"],
        "code": item["code"],
        "name": item["name"],
        "job_title": item["job_title"],
        "hire_date": item["hire_date"],
        "employment_area": item["employment_area"],
        "date_of_birth": item["date_of_birth"],
        "type_of_blood": item["type_of_blood"],
        "place_of_birth": item["place_of_birth"],
        "driving_licence": bool(item["driving_licence"]),
        "licences": bool(item["licences"]),
        "address": item["address"],
        "phone_number": item["phone_number"],
        "email": item["email"],
        "gender": item["gender"]
    }

def departmentEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "phone": item["phone"],
        "company_id": item["company_id"]
    }

def userEntity(item) -> dict:
    return{
        "id": str(item["_id"]),
        "password": item["password"],
        "first_name": item["first_name"],
        "last_name": item["last_name"],
        "dob": item["dob"],
        "gender": item["gender"],
        "address": item["address"],
        "phone": item["phone"],
        "email": item["email"],
        "role": item["role"],
        "account_type": item["account_type"],
        "company_id": item.get("company_id", ""),
        "token": item["token"],
        "create_date": item.get("create_date", "1900-01-01"),
        "modify_date": item.get("modify_date", "1900-01-01")
    }

def loginEntity(item) -> dict:
    return{
        "email": item["email"],
        "password": item["password"]
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

def companiesEntity(entity) -> list:
    return [companyEntity(item) for item in entity]

def companiesDepartemntEntity(entity) -> list:
    return [CompanyDepartmentEntity(item) for item in entity]

def employeesEntity(entity) -> list:
    return [employeeEntity(item) for item in entity]

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]
