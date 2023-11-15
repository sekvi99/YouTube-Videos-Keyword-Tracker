using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models.Data;

public class SearchKeywordDto
{
    public int Id { get; set; }

    [Required]
    [MaxLength(60)]
    public string Keyword { get; set; }
}
