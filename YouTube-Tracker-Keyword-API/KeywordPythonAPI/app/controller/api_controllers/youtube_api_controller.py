from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any

from googleapiclient.discovery import build

from app.controller.abstract_api_controller import AbstractApiController
from app.exceptions.data_parse_exception import DataParseException
from app.exceptions.yt_engine_build_exception import \
    YouTubeEngineBuildException
from app.models.entity_dto import Entity
from app.models.keyword_dto import KeywordDto
from app.services.yt_data_parser.yt_data_parsing_service import \
    YouTubeDataParseService
from logger_conf import logger


@dataclass
class YouTubeApiController(AbstractApiController):
    
    _query_param: str # * Private instance of api query param
    _query_date_range: str = None
    _youtube_client: Any = None
    
    def __post_init__(self) -> None:
        """
        Overwritten post init for building yt engine
        """
        super().__post_init__()
        logger.info('Building YouTube engine')
        try:
            self._youtube_client = build('youtube', 'v3', developerKey=self._api_key)
            self._query_date_range = (datetime.utcnow() - timedelta(days=7)).replace(microsecond=0, tzinfo=timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')  # ! Static date range to filter youtube movies
            
        except YouTubeEngineBuildException:
            logger.error('Unknown error has occured, while building yt api engine')
        
    
    def parse_response(self) -> Entity[KeywordDto]:
        """
        Declaration of method for parsing response from youtube api.

        Returns:
            Entity[KeywordDto]: Collection that respects Entity format.
        """
        logger.info('Extracting information from youtube api')
        search_response = self._youtube_client.search().list(
            q=self._query_param,
            part='id,snippet',
            maxResults=50,
            order='date',
            publishedAfter=self._query_date_range
        ).execute()
        
        collection = list()
        
        for item in search_response['items']:
            video_id = item['id']['videoId']
            video_info = self._youtube_client.videos().list(
                part='id,snippet,contentDetails,statistics',
                id=video_id
            ).execute()
            logger.info(f'Parsing api response for video: {video_id}')
            
            try:
                parser = YouTubeDataParseService(video_info)
                data = parser.parse_data(video_id)
                if data != None:
                    collection.append(data)
                    
            except (KeyError, TypeError) as e:
                logger.error(f"Error parsing data: {e}")
                
            except Exception:
                logger.error('Unknown error has occured')       
            
        return Entity(
            count=len(collection),
            items=collection
        )