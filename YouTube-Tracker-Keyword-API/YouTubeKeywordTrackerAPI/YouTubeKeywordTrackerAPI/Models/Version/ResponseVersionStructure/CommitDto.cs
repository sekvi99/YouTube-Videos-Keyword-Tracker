namespace YouTubeKeywordTrackerAPI.Models.Version.ResponseVersionStructure;

public class CommitDto
{
    public AuthorDetailsDto Author { get; set; }
    public AuthorDetailsDto Committer { get; set; }
    public string Message { get; set; }
    public TreeDto Tree { get; set; }
    public string Url { get; set; }
    public int CommentCount { get; set; }
    public VerificationDto Verification { get; set; }
}
