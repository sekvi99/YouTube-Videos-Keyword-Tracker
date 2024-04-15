namespace YouTubeKeywordTrackerAPI.Models.ExternalApiModels;

public class VideoTranscriptionDto
{
    public VideoDetails Video { get; set; }
}

public class VideoDetails
{
    public string VideoUrl { get; set; }
}