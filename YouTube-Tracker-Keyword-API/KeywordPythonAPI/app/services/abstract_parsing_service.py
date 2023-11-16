from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

from app.models.entity_dto import Entity


@dataclass
class AbstractParseService(ABC):
    
    _data_to_parse: List[str] # ! Provide propper data type after checking api
    
    @abstractmethod
    def parse_data(self) -> Entity:
        """
        Should return parsed information in form of Entity.

        Returns:
            Entity: Returns data as Entity form.
        """
        ...