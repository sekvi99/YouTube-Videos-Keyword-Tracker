from abc import ABC, abstractmethod
from dataclasses import dataclass

from app.exceptions.api_method_exception import ApiMethodException
from app.exceptions.api_url_exception import ApiUrlException
from app.helpers.regex_url_checker import UrlRegexChecker
from app.models.entity_dto import Entity, TDataType
from logger_conf import logger

from .api_methods import ApiMethods


@dataclass
class AbstractApiController(ABC):
    
    _api_key: str # Api key
    _api_url: str # * Private variable for selecting propper url to get data from
    _api_method: str # * Private variable that stores information about http method
    
    def __post_init__(self) -> None:
        """
        Post init method for checking whether provided api method exist in declared enum.

        Raises:
            ApiMethodException: Occures when provided api method does not exist in enum context.
        """
        if not any(method.value == self._api_method for method in ApiMethods):
            logger.error(f"Can't create api request with provided method: {self._api_method}")
            raise ApiMethodException(f"Wrong api method: {self._api_method}")
        
        if not UrlRegexChecker.is_url_valid(self._api_url):
            logger.error(f"Provided url: {self._api_url} doesn't match endpoint criteria")
            raise ApiUrlException(f"Provided url: {self._api_url} does not match endpoint criteria")
        
    @property
    def api_url(self) -> str:
        """
        Declaration of getter for api url.

        Returns:
            str: String representation of api url.
        """
        return self._api_url
    
    @api_url.setter
    def api_url(self, value: str) -> None:
        """
        Declaration of setter for api url.

        Args:
            value (str): String representation of url.
        """
        if not UrlRegexChecker.is_url_valid(value):
            raise ApiUrlException(f"Provided url: {value} does not match endpoint criteria")
    
        self._api_url = value
        
    @property
    def api_method(self) -> str:
        """
        Declaration of getter for api method.

        Returns:
            str: String representation of api method.
        """
        return self._api_method
    
    @api_method.setter
    def api_method(self, value: str) -> None:
        """
        Declaration of setter for api method.

        Args:
            value (str): String representation of api method.
        """
        if not any(method.value == value for method in ApiMethods):
            raise ApiMethodException(f"Wrong api method: {value}")
        
        self._api_method = value 
        
    @abstractmethod
    def parse_response(self) -> Entity[TDataType]:
        """
        Should return parsed information of provided data type in given data type.

        Returns:
            Entity[TDataType]: Parsed information of provided data type in entity format.
        """
        ...