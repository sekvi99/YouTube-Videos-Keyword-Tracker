using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models.Authentication;

public class UserRegistrationDto
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string City { get; set; }
    public string Street { get; set; }
    public string PostalCode { get; set; }
}
