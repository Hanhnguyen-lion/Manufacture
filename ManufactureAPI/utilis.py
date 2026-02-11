from datetime import date, timedelta, datetime

class Utilis:
    @staticmethod
    def encode_date(value):
            return datetime.datetime.combine(
                    value,
                    datetime.datetime.min.time())

    @staticmethod
    def expire_date(expireDate: date, expireDay: int):
    
        today = date.today()
        days_until_expiry = today - expireDate
        remaining_days = days_until_expiry.days
        if remaining_days <= expireDay:
                return False
        else:
                return True