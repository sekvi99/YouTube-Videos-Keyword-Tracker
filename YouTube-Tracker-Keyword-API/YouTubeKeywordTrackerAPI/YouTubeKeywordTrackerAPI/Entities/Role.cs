namespace YouTubeKeywordTrackerAPI.Entities;

public class Role : Entity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<User> Users { get; set; }
}
