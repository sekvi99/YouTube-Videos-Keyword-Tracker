import logging
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any

from googleapiclient.discovery import build

from app.controller.abstract_api_controller import AbstractApiController
from app.exceptions.yt_engine_build_exception import \
    YouTubeEngineBuildException
from app.models.entity_dto import Entity


@dataclass(frozen=True)
class YouTubeApiController(AbstractApiController):
    
    _query_param: str # * Private instance of api query param
    _query_date_range: str = (datetime.utcnow() - timedelta(days=7)).isoformat() + 'Z' # ! Static date range to filter youtube movies
    _youtube_client: Any
    
    def __post_init__(self) -> None:
        """
        Overwritten post init for building yt engine
        """
        super().__post_init__()
        logging.info('Building YouTube engine')
        try:
            self._youtube_client = build('youtube', 'v3', developerKey=self._api_key)
            
        except YouTubeEngineBuildException:
            logging.error('Unknown error has occured, while building yt api engine')
        
    
    def parse_response(self) -> Entity:
        """_summary_

        Returns:
            Entity: _description_
        """
        search_response = self._youtube_client.search().list(
            q=self._query_param,
            part='id,snippet',
            maxResults=200,
            order='date',
            publishedAfter=self._query_date_range
        ).execute()
        
        # ! To Refactor just print for testing
        for item in search_response['items']:
            video_title = item['snippet']['title']
            video_id = item['id']['videoId']
            video_url = f'https://www.youtube.com/watch?v={video_id}'
            print(f'Tytuł: {video_title}\nID: {video_id}\nURL: {video_url}\n\n')