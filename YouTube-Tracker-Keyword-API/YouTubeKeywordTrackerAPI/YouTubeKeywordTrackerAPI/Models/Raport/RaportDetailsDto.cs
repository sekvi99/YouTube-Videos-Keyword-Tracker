namespace YouTubeKeywordTrackerAPI.Models.Raport;

public class RaportDetailsDto
{
    public int Id { get; set; }
    public int FileId { get; set; }
    public IEnumerable<RaportReadoutDto> RaportReadouts { get; set; }
}
