namespace YouTubeKeywordTrackerAPI.Entities;

public class SearchKeyword : Entity
{
    public int Id { get; set; }
    public string Keyword { get; set; }

    // Table Reference
    public int UserId {  get; set; }
    public User User { get; set; }
}
