from enum import Enum

class ApiMethods(Enum):
    """
    Enum that determines possible api methods.

    Args:
        Enum (_type_): Enum Python Implementation
    """
    GET = 'GET'
    POST = 'POST'
    PUT = 'PUT'
    DELETE = 'DELETE'