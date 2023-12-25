from pydantic import BaseModel


class VideoDto(BaseModel):
    videoUrl: str
    
class VideoTranscriptionItemDto(BaseModel):
    timeFrom: float
    timeTo: float
    subtitles: str