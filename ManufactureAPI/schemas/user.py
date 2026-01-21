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
        "company_id": item["company_id"],
        "token": item["token"],
    }

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]