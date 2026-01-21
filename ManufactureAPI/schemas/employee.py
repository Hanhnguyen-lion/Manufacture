def employeeEntity(item) -> dict:
    return{
        "id": str(item["_id"]),
        "department_id": item["department_id"],
        "name": item["name"],
        "job_title": item["job_title"],
        "hire_date": item["hire_date"],
        "employment_area": item["employment_area"],
        "date_of_birth": item["date_of_birth"],
        "type_of_blood": item["type_of_blood"],
        "place_of_birth": item["place_of_birth"],
        "driving_licence": item["driving_licence"],
        "licences": item["licences"],
        "address": item["address"],
        "phone_number": item["phone_number"],
        "email": item["email"],
        "gender": item["gender"]
    }

def employeesEntity(entity) -> list:
    return [employeeEntity(item) for item in entity]