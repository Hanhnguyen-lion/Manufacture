import uuid
from pydantic import BaseModel, Field

class Company(BaseModel):
    name:str
    description:str
    country:str
    address:str
    phone:str
    email:str
    # create_date:datetime = Field(default=datetime.datetime.now(datetime.UTC))
    # modify_date:datetime = Field(default=datetime.datetime.now(datetime.UTC))
