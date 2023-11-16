import logging

from fastapi import FastAPI, Path
from fastapi.middleware.cors import CORSMiddleware

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
    return { 'test': 1}

