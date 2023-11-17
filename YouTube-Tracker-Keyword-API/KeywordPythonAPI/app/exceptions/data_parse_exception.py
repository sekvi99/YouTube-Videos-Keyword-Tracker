class DataParseException(Exception):
    """
    Custom exception for data parsing errors.

    Args:
        Exception (_type_): Inheritence of base Exception class.
    """
    
    def __init__(self, message: str) -> None:  
        super().__init__(message)