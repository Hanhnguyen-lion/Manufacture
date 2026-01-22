from datetime import datetime
from pydantic import BaseModel

class Employee(BaseModel):
    company_id:str
    department_id:str
    name:str
    job_title:str
    hire_date:datetime
    employment_area:str
    date_of_birth:datetime
    type_of_blood:str
    place_of_birth:str
    driving_licence:str
    licences:str
    address:str
    phone_number:str
    email:str
    gender:str