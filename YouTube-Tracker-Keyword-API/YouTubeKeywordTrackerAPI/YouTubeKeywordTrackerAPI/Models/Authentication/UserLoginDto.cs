using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models.Authentication;

public class UserLoginDto
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}
