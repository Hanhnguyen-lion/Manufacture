import datetime

class Utilis:
    @staticmethod
    def encode_date(value):
            return datetime.datetime.combine(
                    value,
                    datetime.datetime.min.time())