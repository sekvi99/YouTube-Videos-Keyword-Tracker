﻿using System.ComponentModel.DataAnnotations;

namespace YouTubeKeywordTrackerAPI.Models;

public class UpdateSearchKeywordDto
{
    [Required]
    [MaxLength(60)]
    public string Keyword { get; set; }
}
