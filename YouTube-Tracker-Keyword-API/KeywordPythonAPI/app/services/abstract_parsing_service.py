from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Generic, List

from app.models.entity_dto import Entity, TDataType


@dataclass
class AbstractParseService(ABC, Generic[TDataType]):
    
    _data_to_parse: List[TDataType] # * Data to parse of some type
    
    @abstractmethod
    def parse_data(self) -> Entity[TDataType]:
        """
        Should return parsed information in form of Entity.

        Returns:
            Entity: Returns data as Entity form.
        """
        ...