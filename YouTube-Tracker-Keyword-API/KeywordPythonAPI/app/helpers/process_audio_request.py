import os
from typing import Final

import assemblyai as aai
import yt_dlp as youtube_dl
from moviepy.editor import *

from logger_conf import logger

OUTPUT_DIR_PATH: Final[str] = 'videos'

def get_audio(video_url: str):
    if not os.path.exists(OUTPUT_DIR_PATH):
        os.makedirs(OUTPUT_DIR_PATH)
        
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'{OUTPUT_DIR_PATH}/%(upload_date)s',
        'postprocessors': [
            {
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }
        ],
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=True)
        return info['upload_date'] + '.mp3'
        

def transcribe_audio(audio_file_name: str, api_key: str) -> str | None:
    dir_path = os.path.join(os.getcwd(), OUTPUT_DIR_PATH)
    audio_file_path = os.path.join(os.getcwd(), OUTPUT_DIR_PATH, audio_file_name)
    if len(os.listdir(dir_path)) < 0:
        logger.error(f"Unable to transcribe, file: {audio_file_name} has not been found")
        return None

    config = aai.TranscriptionConfig(
        speech_model=aai.SpeechModel.nano,
        language_detection=True
    )

    aai.settings.api_key = api_key

    logger.info(f"Transcribing file: {audio_file_name}")
    transcriber = aai.Transcriber(config=config)
    transcript = transcriber.transcribe(audio_file_path)
    clear_directory(dir_path)
    
    if transcript.status == aai.TranscriptStatus.error:
        return None
    else:
        return transcript.export_subtitles_srt()
    
def clear_directory(dir_path: str) -> None:
    for filename in os.listdir(dir_path):
        file_path = os.path.join(dir_path, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)