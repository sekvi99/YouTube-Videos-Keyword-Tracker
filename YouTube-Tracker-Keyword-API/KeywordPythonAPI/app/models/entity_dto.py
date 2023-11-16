from typing import Generic, List, TypeVar

from pydantic import BaseModel

TDataType = TypeVar('TDataType')

class Entity(BaseModel, Generic[TDataType]):
    count: int
    items: List[TDataType]