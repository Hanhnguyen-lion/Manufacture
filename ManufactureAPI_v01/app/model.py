from datetime import date, datetime
from pydantic import BaseModel

class Company(BaseModel):
    code:str
    name:str
    description:str
    country:str
    address:str
    phone:str
    email:str

class Category(BaseModel):
    code:str
    name:str
    description:str

class Product(BaseModel):
    code:str
    name:str
    description:str
    company_id:str
    department_id:str
    category_id:str
    standard_price:int
    unit_of_measure: int

class Storage(BaseModel):
    code:str
    name:str
    company_id:str
    department_id:str

class Process(BaseModel):
    code:str
    name:str
    description:str
    duration: str
    cost: float
    company_id:str
    department_id:str

class Item(BaseModel):
    code:str
    name:str
    status:str
    quantity: int
    start_plan_date: date
    end_plan_date: date
    production_date: date
    created_date: date
    company_id:str
    department_id:str
    product_id: str
    storage_id: str

class ProductProcess(BaseModel):
    product_id: str
    process_id: str
    sequence_order: int

class ItemProcess(BaseModel):
    item_id: str
    process_id: str
    start_time: datetime
    end_time: datetime
    status: str

class ProductItem(BaseModel):
    product_id: str
    item_id: str
    quantity_required: int

class Department(BaseModel):
    name:str
    phone:str
    company_id:str    