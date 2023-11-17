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
        
        collection = list()
        
        try:
            for item in search_response['items']:
                video_id = item['id']['videoId']
                video_info = self._youtube_client.videos().list(
                    part='id,snippet,contentDetails,statistics',
                    id=video_id
                ).execute()
                
                collection.append(self._api_data_parser.parse_data(video_info))
            
            return collection
        
        except DataParseException:
            logging.error('Error occured while parsing data')
        except Exception:
            logging.error('Unknown error has occured')    
        

        # # ! To Refactor just print for testing
        # for item in search_response['items']:
        #     video_id = item['id']['videoId']

        #     # Retrieve additional information
        #     video_info = self._youtube_client.videos().list(
        #         part='id,snippet,contentDetails,statistics',
        #         id=video_id
        #     ).execute()

        #     snippet = video_info['items'][0]['snippet']
        #     content_details = video_info['items'][0]['contentDetails']
        #     statistics = video_info['items'][0]['statistics']

        #     video_title = snippet['title']
        #     video_url = f'https://www.youtube.com/watch?v={video_id}'
        #     views = statistics['viewCount']
        #     comments = statistics['commentCount']
        #     published_at = snippet['publishedAt']
        #     duration = content_details['duration']
        #     channel_title = snippet['channelTitle']

        #     print(f'Tytuł: {video_title}')
        #     print(f'ID: {video_id}')
        #     print(f'URL: {video_url}')
        #     print(f'Views: {views}')
        #     print(f'Comments: {comments}')
        #     print(f'Published At: {published_at}')
        #     print(f'Duration: {duration}')
        #     print(f'Channel Title: {channel_title}')
        #     print('\n')