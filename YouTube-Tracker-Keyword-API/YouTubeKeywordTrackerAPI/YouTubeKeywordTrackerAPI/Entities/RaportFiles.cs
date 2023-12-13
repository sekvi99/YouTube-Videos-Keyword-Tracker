namespace YouTubeKeywordTrackerAPI.Entities;

public class RaportFiles : Entity
{
    public int Id { get; set; }
    public int RaportId { get; set; }
    public byte[] FileContent { get; set; }
    public RaportData RaportData { get; set; }
}
