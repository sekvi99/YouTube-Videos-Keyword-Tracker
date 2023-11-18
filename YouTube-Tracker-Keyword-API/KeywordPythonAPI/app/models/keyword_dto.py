from pydantic import BaseModel


class KeywordDto(BaseModel):
    videoTitle: str
    videoUrl: str
    views: str
    commentsCount: str
    publishedAt: str
    duration: str # TODO Check duration type
    channelTitle: str