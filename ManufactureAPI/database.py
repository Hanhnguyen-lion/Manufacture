from fastapi import FastAPI
from pymongo import MongoClient
from config import settings

app = FastAPI()
def get_db():
    app.mongodb_client = MongoClient(settings.ATLAS_URI)
    try:
        app.database = app.mongodb_client[settings.DB_NAME]
        print("Connected to MongoDB Atlas successfully!")
    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        app.mongodb_client.close()
            