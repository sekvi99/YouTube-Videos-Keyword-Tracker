namespace YouTubeKeywordTrackerAPI.Models.Raport;

public class RaportReadoutDto
{
    public int Id { get; set; }
    public int RaportId { get; set; }
    public string VideoTitle { get; set; }
    public string VideoUrl { get; set; }
    public int Views { get; set; }
    public int CommentsCount { get; set; }
    public DateTime PublishedAt { get; set; }
    public string Duration { get; set; }
    public string ChannelTitle { get; set; }
}
