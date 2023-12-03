using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models.Email;

public class EmailRequestDto
{
    [Required]
    public string Topic { get; set; }
    [Required]
    public string Receiver { get; set; }
    [Required]
    public string Body { get; set; }
}
