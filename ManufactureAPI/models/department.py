import uuid
from pydantic import BaseModel

class Department(BaseModel):
    name:str
    phone:str
    company_id:str
