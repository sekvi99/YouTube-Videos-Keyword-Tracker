from pydantic import BaseModel
from .keyword_dto import KeywordDto
from typing import List

class KeywordRaportDto(BaseModel):
    topTenVideos: List[KeywordDto]