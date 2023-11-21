using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models.Authentication;

public class UserUpdateDto
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string PostalCode { get; set; }
}
