import time

from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware

from app.consts import *
from app.controller.api_controllers.youtube_api_controller import \
    YouTubeApiController
from app.helpers.process_audio_request import get_audio, transcribe_audio
from app.helpers.process_subtitles_request import extract_video_subtitles
from app.models.entity_dto import Entity
from app.models.keyword_dto import KeywordDto
from app.models.keyword_raport_dto import KeywordRaportDto
from app.models.video_dto import LanguageDto, VideoDto
from logger_conf import logger

app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO Set up amount of domains for accessing resource
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api/keyword/{keyword}')
async def get_keyword_collection(
    keyword: str = Path(..., description='Keyword to process data from youtube api')
):  
    logger.info(f"Creating summary for keyword: {keyword}")
    yt_controller = YouTubeApiController(
        YOUTUBE_API_SECRET_KEY,
        YOUTUBE_URL_FORMAT,
        'GET',
        keyword
    )
    collection = yt_controller.parse_response()
    return collection

@app.post('/api/translate')
async def get_video_subtitles(
    video: VideoDto
):
    # TODO Refactor after propper model creation
    logger.info(f"Creating transcription of video: {video.videoUrl} to subtitles")
    subitles = extract_video_subtitles(video.videoUrl)
    
    if subitles == None:
        raise HTTPException(status_code=500, detail="Failed to extract subtitles")

    return subitles
        
@app.post('/api/generate-subtitles')
async def generate_video_subtitles(
    video: VideoDto
):
    logger.info(f"Downloading videos audio for url: {video.videoUrl}")
    audio_file_name = get_audio(video_url=video.videoUrl)
    logger.info(f"Audio for provided url: {video.videoUrl} has been downloaded")
    time.sleep(2) # * Sleep to avoid conversion to mp3 error
    logger.info(f"Audio has been converted to mp3 format")
    transcription = transcribe_audio(audio_file_name, ASSEMBLY_AI_API_KEY)
    
    if transcription is not None:
        return transcription
    
    raise HTTPException(status_code=500, detail="Failed to create transcription for provided url")
        
@app.post('/api/keyword-raport', response_model=KeywordRaportDto)
async def create_keyword_raport(
    data: Entity[KeywordDto]
):
    try:
        sorted_collection = sorted(data.items, key=lambda x: x.views, reverse=True)
        report = KeywordRaportDto(topTenVideos=sorted_collection[0:10])
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")