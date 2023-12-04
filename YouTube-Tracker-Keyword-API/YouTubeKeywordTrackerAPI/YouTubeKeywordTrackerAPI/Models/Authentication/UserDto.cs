using YouTubeKeywordTrackerAPI.Models.Address;
using YouTubeKeywordTrackerAPI.Models.Data;

namespace YouTubeKeywordTrackerAPI.Models.Authentication;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public AdressDto Address { get; set; }
    public List<SearchKeywordDto>? Keywords { get; set; }
    public int RoleId { get; set; }
}
