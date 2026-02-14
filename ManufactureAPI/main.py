import uvicorn

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from pymongo import MongoClient

from dotenv import dotenv_values

from contextlib import asynccontextmanager

from app.api.company import app_router

from app.api.category import category_router

from app.api.storage import storage_router

from app.api.product import product_router

from app.api.item import item_router

from app.api.process import process_router

from app.api.product_item import product_item_router

from app.api.product_process import product_process_router

from app.api.item_process import item_process_router

from app.api.user import user_router

config = dotenv_values(".env")

@asynccontextmanager
async def lifespan(app: FastAPI):

    app.mongodb_client = MongoClient(config["ATLAS_URI"])

    app.database = app.mongodb_client[config["DB_NAME"]]

    print("Connected to the MongoDB database!")

    yield

    app.mongodb_client.close()

    print("Close to the MongoDB database!")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(app_router, tags=["companies"], prefix="/Manufacture/api/company_departments")
app.include_router(category_router, tags=["categoies"], prefix="/Manufacture/api/category")
app.include_router(storage_router, tags=["storages"], prefix="/Manufacture/api/storage")
app.include_router(product_router, tags=["products"], prefix="/Manufacture/api/product")
app.include_router(item_router, tags=["items"], prefix="/Manufacture/api/item")
app.include_router(process_router, tags=["processes"], prefix="/Manufacture/api/process")
app.include_router(product_process_router, tags=["product_processes"], prefix="/Manufacture/api/product_process")
app.include_router(product_item_router, tags=["product_items"], prefix="/Manufacture/api/product_item")
app.include_router(item_process_router, tags=["item_processes"], prefix="/Manufacture/api/item_process")
app.include_router(user_router, tags=["users"], prefix="/Manufacture/api/account")

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8081, reload=True)
