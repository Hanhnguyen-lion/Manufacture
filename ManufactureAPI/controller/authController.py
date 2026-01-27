from fastapi import APIRouter, Depends

from config import settings
from models.user import User

from oauth2 import AuthJWT


auth_router = APIRouter()

ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

@auth_router.post('/register')
async def create_user(user: User):
    pass

@auth_router.post('/login')
async def login(Authorize: AuthJWT = Depends()):
    pass