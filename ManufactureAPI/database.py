# from fastapi import FastAPI
from pymongo import MongoClient
from config import settings

def get_db():
    conn = MongoClient(settings.ATLAS_URI)
    try:
        conn.database = conn[settings.DB_NAME];
        print("Connected to MongoDB Atlas successfully!")
    except Exception as e:
        print(f"Connection failed: {e}")
    return conn
            