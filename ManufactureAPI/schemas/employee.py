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

def employeeDepartmentEntity(item) -> dict:
    return{
        "id": str(item["_id"]),
        "code": item["code"],
        "name": item["name"],
        "job_title": item["job_title"],
        "company_id": item["company_id"],
        "company_name": item["company_name"],
        "department_name": item["department_name"]
    }

def employeesEntity(entity) -> list:
    return [employeeEntity(item) for item in entity]

def employeesDepartmentEntity(entity) -> list:
    return [employeeDepartmentEntity(item) for item in entity]