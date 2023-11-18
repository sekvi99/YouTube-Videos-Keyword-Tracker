using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;
using YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;

namespace YouTubeKeywordTrackerAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/KeywordSummary")]
public class YouTubeApiKeywordSummaryController : ControllerBase
{
    private readonly IYouTubeApiKeywordService _service;
    public YouTubeApiKeywordSummaryController(IYouTubeApiKeywordService service)
    {
        _service = service;
    }
    [HttpGet("{keyword}")]
    public async Task<ActionResult<IEnumerable<CollectionModel<KeywordSummaryDto>>>> GetKeywordsForUser(string keyword)
    {

        var collection = await _service.GetKeywordSummaryAsync(keyword);
        return Ok(collection);
    }
}
