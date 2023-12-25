from youtube_transcript_api import YouTubeTranscriptApi

from app.models.entity_dto import Entity
from app.models.video_dto import VideoTranscriptionItemDto
from app.services.yt_transcription_parser.yt_transcription_parser_service import \
    YouTubeTranscriptionParseService
from logger_conf import logger

from ..helpers.video_id_extractor import extract_video_id


def extract_video_subtitles(url: str) -> Entity[VideoTranscriptionItemDto]:
    try:
        collection = list()
        video_id = extract_video_id(url)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        for entry in transcript:
             parse_service = YouTubeTranscriptionParseService(entry)
             collection.append(parse_service.parse_data())
        
        return Entity(
            count=len(collection),
            items=collection
        )
    except Exception as e:
        logger.error(f"Error occured while extracting subtitles for video: {url} - {e}")
        return None