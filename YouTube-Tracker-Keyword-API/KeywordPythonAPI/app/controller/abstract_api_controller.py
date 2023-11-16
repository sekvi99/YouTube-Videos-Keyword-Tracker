import logging
from abc import ABC, abstractmethod
from dataclasses import dataclass

from api_methods import ApiMethods

from app.exceptions.api_method_exception import ApiMethodException
from app.exceptions.api_url_exception import ApiUrlException
from app.helpers.regex_url_checker import UrlRegexChecker


@dataclass
class AbstractApiController(ABC):
    
    _api_url: str # * Private variable for selecting propper url to get data from
    _api_method: str # * Private variable that stores information about http method
    
    def __post_init__(self) -> None:
        """
        Post init method for checking whether provided api method exist in declared enum.

        Raises:
            ApiMethodException: Occures when provided api method does not exist in enum context.
        """
        if not self._api_method in list(ApiMethods):
            logging.error(f"Can't create api request with provided method: {self._api_method}")
            raise ApiMethodException(f"Wrong api method: {self._api_method}")
        
        if not UrlRegexChecker.is_url_valid(self._api_url):
            logging.error(f"Provided url: {self._api_url} doesn't match endpoint criteria")
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
            value (str): _description_
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
        """_summary_

        Args:
            value (str): _description_
        """
        if not value in list(ApiMethods):
            raise ApiMethodException(f"Wrong api method: {self._api_method}")
        
        self._api_method = value 