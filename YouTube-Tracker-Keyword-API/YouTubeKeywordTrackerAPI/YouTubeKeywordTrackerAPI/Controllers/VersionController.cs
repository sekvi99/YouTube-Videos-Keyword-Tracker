using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models.Version;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Version;

namespace YouTubeKeywordTrackerAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class VersionController : ControllerBase
{
    private readonly IVersionService _versionService;
    public VersionController(IVersionService versionService)
    {
        _versionService = versionService;
    }

    [HttpGet]
    public async Task<ActionResult<VersionDto>> GetAppVersion()
    {
        var version = await _versionService.GetVersionAsync();
        return Ok(version);
    }
}
