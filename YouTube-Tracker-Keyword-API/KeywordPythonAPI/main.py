import logging

from fastapi import FastAPI, Path
from fastapi.middleware.cors import CORSMiddleware

from app.consts import *
from app.controller.api_controllers.youtube_api_controller import YouTubeApiController

# Setting up logger
logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO Set up amount of domains for accessing resource
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api/keyword-raport/{keyword}')
async def get_keyword_raport(
    keyword: str = Path(..., description='Keyword to process data from youtube api')
):  
    yt_controller = YouTubeApiController(
        YOUTUBE_API_SECRET_KEY,
        YOUTUBE_URL_FORMAT,
        'GET',
        None,
        keyword
    )
    yt_controller.parse_response()
    return { 'test': 1}


