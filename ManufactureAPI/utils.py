# from passlib.context import CryptContext

from datetime import date, timedelta

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# def hash_password(password: str):
#     return pwd_context.hash(password)


# def verify_password(password: str, hashed_password: str):
#     return pwd_context.verify(password, hashed_password)

def expire_date(expireDate: date, expireDay: int):
    
    today = date.today()
    days_until_expiry = today - expireDate
    remaining_days = days_until_expiry.days
    if remaining_days <= expireDay:
        return False
    else:
        return True
