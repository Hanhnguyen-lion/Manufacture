from contextlib import asynccontextmanager
from dotenv import dotenv_values
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from config import settings
# from controller import CompanyController, userController
from controller.companyController import company
from controller.departmentController import department

config = dotenv_values(".env");


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     app.mongodb_client = MongoClient(config["ATLAS_URI"])
#     app.database = app.mongodb_client[config["DB_NAME"]]
#     print("Connected to the MongoDB database!")
#     yield
#     app.mongodb_client.close()
#     print("Close to the MongoDB database!")


# app = FastAPI(lifespan=lifespan);
app = FastAPI();
origins = [
    settings.CLIENT_ORIGIN,
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(CompanyController.router, tags=["companies"], prefix="/api/company")

app.include_router(company, tags=["companies"], prefix="/api/company")
app.include_router(department, tags=["departments"], prefix="/api/department")
