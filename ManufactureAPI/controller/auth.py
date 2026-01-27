from fastapi import APIRouter, HTTPException, status, Depends, Response

from pydantic import EmailStr

from datetime import timedelta

from bson import ObjectId

from config import settings

from models.user import User, LoginUser

from database import get_db

from schemas.user import userEntity, usersEntity

import utils

# import oauth2

from oauth2 import AuthJWT

auth_router = APIRouter()

ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

# @auth_router.post("/register")
# async def create_user(user:User):
#     with get_db() as conn:
#         account = userEntity(conn.database.M_Account.find_one({"email": EmailStr(user.email.lower())}))
#         if account:
#             raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Account already exists")

#         user.password = utils.hash_password(user.password)
#         user.email = EmailStr(user.email.lower())

#         conn.database.M_Account.insert_one(dict(user))

#         return usersEntity(conn.database.M_Account.find())

    
# @auth_router.post("/login")    
# async def login(user: LoginUser):
#     with get_db() as conn:
#         Authorize: AuthJWT = Depends()

#         account:User = userEntity(conn.database.M_Account.find_one({"email": EmailStr(user.email.lower())}))
#         if not account:
#             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect Email or Password")
#         if not utils.verify_password(user.password, account.password):
#             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect Email or Password")
        
#         access_token = Authorize.create_access_token(
#             subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))
        
#         refresh_token = Authorize.create_refresh_token(
#             subject=str(user.id), expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN))

#         # Store refresh and access tokens in cookie
#         Response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60,
#                             ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
#         Response.set_cookie('refresh_token', refresh_token,
#                             REFRESH_TOKEN_EXPIRES_IN * 60, REFRESH_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
#         Response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60,
#                             ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')

#         # Send both access
#         return {'status': 'success', 'access_token': access_token}

# @auth_router.get('/refresh')
# async def refresh_token():
#     try:
#         with get_db() as conn:
#             Authorize: AuthJWT = Depends()
#             Authorize.jwt_refresh_token_required()

#             user_id = Authorize.get_jwt_subject()

#             if not user_id:
#                 raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                                     detail='Could not refresh access token')
#             user:User = userEntity(conn.database.M_Account.find_one({"_id": ObjectId(user_id)}))
            
#             if not user:
#                 raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                                     detail='The user belonging to this token no logger exist')
#             access_token = Authorize.create_access_token(
#                 subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))
#     except Exception as e:
#         error = e.__class__.__name__
#         if error == 'MissingTokenError':
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST, detail='Please provide refresh token')
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST, detail=error)

#     Response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60,
#                         ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
#     Response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60,
#                         ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')
#     return {'access_token': access_token}

# @auth_router.get("/logout")
# async def logout():
#     # user_id: str = Depends(oauth2.require_user())
#     Authorize: AuthJWT = Depends()
#     Authorize.unset_jwt_cookies()
#     Response.set_cookie('logged_in', '', -1)
#     return {'status': 'success'}
