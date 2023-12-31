from pydantic import BaseModel


class KeywordDto(BaseModel):
    videoTitle: str
    videoUrl: str
    views: int
    commentsCount: int
    publishedAt: str
    duration: str # TODO Check duration type
    channelTitle: str