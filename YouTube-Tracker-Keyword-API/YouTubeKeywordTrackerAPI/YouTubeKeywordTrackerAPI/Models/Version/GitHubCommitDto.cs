using YouTubeKeywordTrackerAPI.Models.Version.ResponseVersionStructure;

namespace YouTubeKeywordTrackerAPI.Models.Version;

public class GitHubCommitDto
{
    public string Sha { get; set; }
    public string NodeId { get; set; }
    public CommitDto Commit { get; set; }
    public string Url { get; set; }
    public string HtmlUrl { get; set; }
    public string CommentsUrl { get; set; }
    public AuthorDto Author { get; set; }
    public AuthorDto Committer { get; set; }
    public ParentDto[] Parents { get; set; }
}
