import uuid
from typing import Optional
from pydantic import BaseModel, Field

class Company(BaseModel):
    id:uuid.UUID = Field(default_factory=uuid.uuid4, alias="_id")
    name:str = Field(default_factory=str)
    description:str = Field(default_factory=str)
    country:str = Field(default_factory=str)
    address:str = Field(default_factory=str)
    phone:str = Field(default_factory=str)
    email:str = Field(default_factory=str)
    # create_date:datetime = Field(default=datetime.datetime.now(datetime.UTC))
    # modify_date:datetime = Field(default=datetime.datetime.now(datetime.UTC))
    class Config:
        validate_by_name = True
        json_schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "name": "name_1",
                "description": "description_1",
                "country": "Viet Nam",
                "address": "...",
                "phone": "123456789",
                "email": "test@test.com"
            }
        }

class CompanyUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str] = None
    country: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class Config:
    json_schema_extra = {
        "example": {
            "name": "name_1",
            "description": "description_1",
            "country": "Viet Nam",
            "address": "...",
            "phone": "123456789",
            "email": "test@test.com"
        }
    }
