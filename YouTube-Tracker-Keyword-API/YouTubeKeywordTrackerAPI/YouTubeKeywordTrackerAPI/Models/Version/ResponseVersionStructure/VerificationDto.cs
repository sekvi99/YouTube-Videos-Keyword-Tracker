namespace YouTubeKeywordTrackerAPI.Models.Version.ResponseVersionStructure;

public class VerificationDto
{
    public bool Verified { get; set; }
    public string Reason { get; set; }
    public string Signature { get; set; }
    public string Payload { get; set; }
}
