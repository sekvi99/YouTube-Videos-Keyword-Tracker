using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models;

public class CreateSearchKeywordDto
{
    [Required]
    [MaxLength(60)]
    public string Keyword { get; set; }
}
