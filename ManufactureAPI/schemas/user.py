from datetime import datetime


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

def userCompanyEntity(item) -> dict:
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
        "company_code": item.get("company_code", ""),
        "company_name": item.get("company_name", ""),
        "token": item["token"],
        "create_date": item.get("create_date", "1900-01-01"),
        "modify_date": item.get("modify_date", "1900-01-01")
    }

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]

def usersCompanyEntity(entity) -> list:
    return [userCompanyEntity(item) for item in entity]