namespace YouTubeKeywordTrackerAPI.Entities;

public class User : Entity
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public int AddressId { get; set; }
    public virtual Address Address { get; set; }
    public virtual List<SearchKeyword> Keywords { get; set; }
    public int RoleId { get; set; } = 1;
    public virtual Role Role { get; set; }
}
