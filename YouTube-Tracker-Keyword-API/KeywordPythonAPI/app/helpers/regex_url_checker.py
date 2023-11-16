import re


class UrlRegexChecker:

    @staticmethod
    def is_url_valid(url: str) -> bool:
        """
        Custom static method for detecting,
        whether provided string representation of url is valid.

        Args:
            url (str): String representation of url.

        Returns:
            bool: True/False whether url is valid.
        """
        url_pattern = re.compile(
        r'^(https?|ftp):\/\/'  # Protocol (http, https, or ftp)
        r'([\w.-]+)\.([a-zA-Z]{2,})'  # Domain name (example.com)
        r'(\S*)$'  # Optional path/query string
        )
        
        return bool(re.match(url_pattern, url))