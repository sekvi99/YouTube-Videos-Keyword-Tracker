import os
from typing import Final

from app.resources.file_handlers.env_handler.env_file_handler import \
    EnvFileHandler

# * Absoulte application paths
APP_DIR: Final[str] = os.path.dirname(os.path.abspath(__file__)) # Path to application directory
ENV_FILE: Final[str] = os.path.join(APP_DIR, r'resources/files/env/.env') # Path to .env file

# Env object handler
ENV_HANDLER: Final[EnvFileHandler] = EnvFileHandler(ENV_FILE)  

# * .env file consts
API_KEY_NAME: Final[str] = ENV_HANDLER.read_var_by_name('API_KEY_NAME')
API_KEY: Final[str] = ENV_HANDLER.read_var_by_name('API_KEY')
YOUTUBE_API_SECRET_KEY: Final[str] = ENV_HANDLER.read_var_by_name('YOUTUBE_API_SECRET_KEY')
ASSEMBLY_AI_API_KEY: Final[str] = ENV_HANDLER.read_var_by_name('ASSEMBLY_API_SECRET_KEY')

# * Application string consts
YOUTUBE_URL_FORMAT: Final[str] = 'https://www.youtube.com/watch?v='
