from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict

from app.models.entity_dto import TDataType


@dataclass
class AbstractParseService(ABC):
    
    _data_to_parse: Dict[str, Any] # * Data to parse of some type
    
    @abstractmethod
    def parse_data(self) -> TDataType:
        """
        Should return parsed information in form of Entity.

        Returns:
            Entity: Returns data as Entity form.
        """
        ...