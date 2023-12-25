from app.models.video_dto import VideoTranscriptionItemDto
from app.services.abstract_parsing_service import AbstractParseService
from logger_conf import logger


class YouTubeTranscriptionParseService(AbstractParseService):
    
    def parse_data(self) -> VideoTranscriptionItemDto:
        try:
            return VideoTranscriptionItemDto(
                timeFrom=float(self._data_to_parse['start']),
                timeTo=float(self._data_to_parse['start'] + self._data_to_parse['duration']),
                subtitles=str(self._data_to_parse['text'])
            )
            
        except Exception as e:
            logger.error(f"Error parsing data: {e}")
            return None
    