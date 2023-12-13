namespace YouTubeKeywordTrackerAPI.Entities;

public class RaportFiles : Entity
{
    public int Id { get; set; }
    public int RaportId { get; set; }
    public byte[] FileContent { get; set; }
    public Raport Raport { get; set; }
}
