from datetime import datetime
from pydantic import BaseModel

class User(BaseModel):
    password:str
    first_name:str
    last_name:str
    dob:datetime
    gender:str
    address:str
    phone:str
    email:str
    role:str
    account_type:str
    company_id:str
    token:str
    create_date:datetime
    modify_date:datetime

class loginSchema(BaseModel):
    email:str
    password:str