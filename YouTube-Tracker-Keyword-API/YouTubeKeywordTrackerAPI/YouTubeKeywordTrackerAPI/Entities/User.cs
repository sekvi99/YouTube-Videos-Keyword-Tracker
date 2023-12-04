namespace YouTubeKeywordTrackerAPI.Entities;

public class User : Entity
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public Address Address { get; set; }
    public List<SearchKeyword> Keywords { get; set; }
    public int RoleId { get; set; } = 1;
    public Role Role { get; set; }
}
