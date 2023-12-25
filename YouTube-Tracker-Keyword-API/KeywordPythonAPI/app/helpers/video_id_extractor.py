import re


def extract_video_id(video_url: str) -> re.match:
    """
    Helper method for extracting youtube video id.

    Args:
        video_url (str): Youtube video url.

    Raises:
        ValueError: Occures when couldn't extract the video id.

    Returns:
        re.match: First occurence of match group for regex below.
    """
    match = re.search(r"v=([a-zA-Z0-9_-]+)", video_url)
    if match:
        return match.group(1)
    else:
        raise ValueError("Invalid YouTube video URL")