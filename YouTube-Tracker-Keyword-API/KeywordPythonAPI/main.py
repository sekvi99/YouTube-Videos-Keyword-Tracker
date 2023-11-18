import logging

from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.consts import *
from app.controller.api_controllers.youtube_api_controller import \
    YouTubeApiController

from app.models.keyword_dto import KeywordDto
from app.models.entity_dto import Entity
from app.models.keyword_raport_dto import KeywordRaportDto

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

@app.get('/api/keyword/{keyword}')
async def get_keyword_collection(
    keyword: str = Path(..., description='Keyword to process data from youtube api')
):  
    yt_controller = YouTubeApiController(
        YOUTUBE_API_SECRET_KEY,
        YOUTUBE_URL_FORMAT,
        'GET',
        keyword
    )
    collection = yt_controller.parse_response()
    return collection

@app.post('/api/keyword-raport', response_model=KeywordRaportDto)
async def create_keyword_raport(
    data: Entity[KeywordDto]
):
    print(data.items)
    try:
        sorted_collection = sorted(data.items, key=lambda x: x.views, reverse=True)
        print(sorted_collection)
        report = KeywordRaportDto(topTenVideos=sorted_collection[0:10])
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")