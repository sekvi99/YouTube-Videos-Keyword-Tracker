import logging

# Get the logger
logger = logging.getLogger("keywordApiLogger")
logger.setLevel(logging.DEBUG)

# Create log handlers
console = logging.StreamHandler()
file_handler = logging.FileHandler("file.log")

# Create the logging formatter
formatter = logging.Formatter(
    "%(asctime)s %(levelname)s %(name)s:%(lineno)d %(message)s"
) 

# Add the formatter to handlers
console.setFormatter(formatter)
file_handler.setFormatter(formatter)

# Add the handlers to the logger
logger.addHandler(console)
logger.addHandler(file_handler)