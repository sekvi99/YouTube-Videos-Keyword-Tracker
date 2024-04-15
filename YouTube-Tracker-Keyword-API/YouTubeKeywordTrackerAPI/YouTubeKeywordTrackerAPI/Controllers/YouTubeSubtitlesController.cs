using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;
using YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;

namespace YouTubeKeywordTrackerAPI.Controllers;
[ApiController]
[Authorize]
[Route("api/Subtitles")]
public class YouTubeSubtitlesController : ControllerBase
{
    private readonly IYouTubeSubtitlesService _youTubeSubtitlesService;
    public YouTubeSubtitlesController(IYouTubeSubtitlesService youTubeSubtitlesService)
    {
        _youTubeSubtitlesService = youTubeSubtitlesService;
    }
    [HttpPost]
    public async Task<ActionResult<IEnumerable<CollectionModel<VideoSubtitleDto>>>> GetSubtitlesAsync([FromBody] VideoUrlDto videoUrl)
    {
        var collection = await _youTubeSubtitlesService.GetVideoSubtitlesAsync(videoUrl.VideoUrl);
        return Ok(collection);
    }
    [HttpPost("generateTranscription")]
    public async Task<IActionResult> GetVideoTranscriptionAsync([FromBody] VideoUrlDto videoUrl)
    {
        var transcription = await _youTubeSubtitlesService.GetVideoTranscriptionAsync(videoUrl);
        return Ok(transcription);
    }
}
