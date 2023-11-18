from typing import List

from pydantic import BaseModel

from .keyword_dto import KeywordDto

class KeywordRaportDto(BaseModel):
    topTenVideos: List[KeywordDto]