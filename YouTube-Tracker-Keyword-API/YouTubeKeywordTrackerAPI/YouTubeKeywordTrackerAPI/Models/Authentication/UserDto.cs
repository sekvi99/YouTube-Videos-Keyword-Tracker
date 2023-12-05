using YouTubeKeywordTrackerAPI.Models.Address;
using YouTubeKeywordTrackerAPI.Models.Data;

namespace YouTubeKeywordTrackerAPI.Models.Authentication;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string addressStreet { get; set; }
    public string addressCity { get; set; }
    public string adressPostalCode { get; set; }
    public List<SearchKeywordDto>? Keywords { get; set; }
    public int RoleId { get; set; }
}
