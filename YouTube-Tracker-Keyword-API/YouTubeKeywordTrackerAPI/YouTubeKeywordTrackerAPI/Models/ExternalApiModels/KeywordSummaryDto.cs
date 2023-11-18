namespace YouTubeKeywordTrackerAPI.Models.ExternalApiModels;

public class KeywordSummaryDto
{
    public string? VideoTitle { get; set; }
    public string? VideoUrl { get; set; }
    public int? View { get; set; }
    public int? CommentsCount { get; set; }
    public string? PublishedAt { get; set; }
    public string? Duration { get; set; }
    public string ChannelTitle { get; set; }
}
