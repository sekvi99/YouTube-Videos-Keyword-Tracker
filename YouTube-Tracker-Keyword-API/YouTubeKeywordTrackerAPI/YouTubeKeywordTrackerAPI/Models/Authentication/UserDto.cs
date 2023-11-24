using YouTubeKeywordTrackerAPI.Entities;

namespace YouTubeKeywordTrackerAPI.Models.Authentication;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public Address Address { get; set; }
    public List<SearchKeyword>? Keywords { get; set; }
    public int RoleId { get; set; }
}
