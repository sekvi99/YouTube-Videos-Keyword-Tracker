import logging
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any

from googleapiclient.discovery import build
from app.controller.abstract_api_controller import AbstractApiController
from app.exceptions.yt_engine_build_exception import \
    YouTubeEngineBuildException
from app.models.entity_dto import Entity
from app.exceptions.data_parse_exception import DataParseException
from app.models.keyword_dto import KeywordDto
from app.services.yt_data_parser.yt_data_parsing_service import YouTubeDataParseService

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
        logging.info('Building YouTube engine')
        try:
            self._youtube_client = build('youtube', 'v3', developerKey=self._api_key)
            self._query_date_range = (datetime.utcnow() - timedelta(days=7)).replace(microsecond=0, tzinfo=timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')  # ! Static date range to filter youtube movies
            
        except YouTubeEngineBuildException:
            logging.error('Unknown error has occured, while building yt api engine')
        
    
    def parse_response(self) -> Entity[KeywordDto]:
        """_summary_

        Returns:
            Entity: _description_
        """
        search_response = self._youtube_client.search().list(
            q=self._query_param,
            part='id,snippet',
            maxResults=50,
            order='date',
            publishedAfter=self._query_date_range
        ).execute()
        
        collection = list()
        try:
            for item in search_response['items']:
                video_id = item['id']['videoId']
                video_info = self._youtube_client.videos().list(
                    part='id,snippet,contentDetails,statistics',
                    id=video_id
                ).execute()
                parser = YouTubeDataParseService(video_info)
                data = parser.parse_data(video_id)
                if data != None:
                    collection.append(data)

            return Entity(
                count=len(collection),
                items=collection
            )
        
        except DataParseException:
            logging.error('Error occured while parsing data')
        except Exception:
            logging.error('Unknown error has occured')