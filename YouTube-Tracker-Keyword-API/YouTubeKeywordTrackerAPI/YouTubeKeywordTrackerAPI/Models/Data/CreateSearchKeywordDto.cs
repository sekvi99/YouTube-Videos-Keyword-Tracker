using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models.Data;

public class CreateSearchKeywordDto
{
    [Required]
    [MaxLength(60)]
    public string Keyword { get; set; }
}
