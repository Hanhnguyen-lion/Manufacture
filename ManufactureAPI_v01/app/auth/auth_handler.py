from typing import Dict

import time

import jwt

JWT_SECRET = "mysecret_key"

JWT_ALGORITHM = "HS256"

def token_response(token:str):
    return {
        "access_token": token
    }

def signJWT(
        user_id: str, 
        last_name: str, 
        first_name: str, 
        user_role: str, 
        company_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "last_name": last_name,
        "first_name": first_name,
        "role": user_role,
        "company_id": company_id,
        "expires": time.time() + 900
    }

    token = jwt.encode(payload=payload, algorithm=JWT_ALGORITHM, key=JWT_SECRET)

    return token_response(token=token)

def decodeJWT(token:str):
    try:
        decoded_token = jwt.decode(jwt=token, key=JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] > time.time() else None
    except:
        return {}