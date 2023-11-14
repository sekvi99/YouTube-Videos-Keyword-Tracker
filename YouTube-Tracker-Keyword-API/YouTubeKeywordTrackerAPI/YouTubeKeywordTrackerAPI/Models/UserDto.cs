using YouTubeKeywordTrackerAPI.Entities;

namespace YouTubeKeywordTrackerAPI.Models;

public class UserDto
{
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public string City { get; set; }
    public string? Street { get; set; }
    public string? PostalCode { get; set; }
    public List<SearchKeyword> Keywords { get; set; }
}
