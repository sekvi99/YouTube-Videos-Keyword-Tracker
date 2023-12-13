namespace YouTubeKeywordTrackerAPI.Entities;

public class Raport : Entity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public IEnumerable<RaportData> RaportDataList { get; set; }
    public RaportFiles RaportFile { get; set; }
}
