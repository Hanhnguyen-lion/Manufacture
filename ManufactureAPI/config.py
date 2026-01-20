from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ATLAS_URI:str
    DB_NAME:str
    CLIENT_ORIGIN:str
    class Config:
        env_file = "./.env"
settings = Settings()