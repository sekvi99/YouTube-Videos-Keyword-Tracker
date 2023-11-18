from app.services.abstract_parsing_service import AbstractParseService
from dataclasses import dataclass
from app.models.keyword_dto import KeywordDto
from typing import Optional
from datetime import datetime
import logging

@dataclass
class YouTubeDataParseService(AbstractParseService):

    _video_url_pattern: Optional[str] = None

    def __post_init__(self) -> None:
         self._video_url_pattern = 'https://www.youtube.com/watch?v={}'

    def _parse_date(self, date_str: str) -> datetime:
        try:
            # Add your date parsing logic here
            # Example: return datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%SZ')
            pass
        except (ValueError, TypeError) as e:
            print(f"Error parsing date: {e}")
            return None

    def _parse_duration(self, duration_str: str) -> str:
        try:
            # Add your duration parsing logic here
            # Example: return f"{hours} hours, {minutes} minutes, {seconds} seconds"
            pass
        except (ValueError, TypeError) as e:
            print(f"Error parsing duration: {e}")
            return None

    def parse_data(self, video_id: int) -> KeywordDto:
        try:
            item = self._data_to_parse['items'][0]
            snippet = item.get('snippet', {})
            content_details = item.get('contentDetails', {})
            statistics = item.get('statistics', {})

            parsed_object = KeywordDto(
                videoTitle=snippet.get('title'),
                videoUrl=self._video_url_pattern.format(video_id),
                views=statistics.get('viewCount'),
                commentsCount=statistics.get('commentCount'),
                publishedAt=snippet.get('publishedAt'),
                duration=content_details.get('duration'),
                channelTitle=snippet.get('channelTitle')
            )
            return parsed_object

        except (KeyError, TypeError) as e:
            logging.error(f"Error parsing data: {e}")
            return None 

