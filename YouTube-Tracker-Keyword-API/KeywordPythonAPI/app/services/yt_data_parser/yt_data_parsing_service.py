from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from app.models.keyword_dto import KeywordDto
from app.services.abstract_parsing_service import AbstractParseService
from logger_conf import logger


@dataclass
class YouTubeDataParseService(AbstractParseService):

    _video_url_pattern: Optional[str] = None

    def __post_init__(self) -> None:
         self._video_url_pattern = 'https://www.youtube.com/watch?v={}'

    def _parse_date(self, date_str: str) -> datetime:
        """
        Private method responsible for parsing date_str to datetime obj.

        Args:
            date_str (str): String representaiton od date.

        Returns:
            datetime: Parsed datetime obj
        """
        try:
            return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        except (ValueError, TypeError) as e:
            logger.error(f"Error parsing date: {e}")
            return None

    def parse_data(self, video_id: int) -> KeywordDto:
        """
        Declaration of parser parse_data method.

        Args:
            video_id (int): Id of youtube video.

        Returns:
            KeywordDto: Parsed yt video information that requires format of keywordDto.
        """
        try:
            item = self._data_to_parse['items'][0]
            snippet = item.get('snippet', {})
            content_details = item.get('contentDetails', {})
            statistics = item.get('statistics', {})
            logger.info('Correctly extracted: snippet, contentDetails and statistics')
            
            parsed_object = KeywordDto(
                videoTitle=snippet.get('title', None),
                videoUrl=self._video_url_pattern.format(video_id),
                views=statistics.get('viewCount', None),
                commentsCount=statistics.get('commentCount', None),
                publishedAt=snippet.get('publishedAt', None),
                duration=content_details.get('duration', None),
                channelTitle=snippet.get('channelTitle', None)
            )
            
            logger.info('Correctly parsed object')
            return parsed_object

        except (KeyError, TypeError) as e:
            logger.error(f"Error parsing data: {e}")
            return None 

