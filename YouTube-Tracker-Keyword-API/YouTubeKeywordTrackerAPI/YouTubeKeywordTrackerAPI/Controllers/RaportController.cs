using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models.Raport;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;

namespace YouTubeKeywordTrackerAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class RaportController : ControllerBase
{
    private readonly IRaportService _raportService;
    public RaportController(IRaportService raportService)
    {
        _raportService = raportService;
    }
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<RaportDto>>> GetUserRaportsAsync()
    {
        var raports = await _raportService.GetAllRaportsAsync();
        return Ok(raports);
    }
    [HttpGet("{raportId}")]
    [Authorize]
    public async Task<ActionResult<RaportDetailsDto>> GetRaportDataAsync(int raportId)
    {
        var raportData = await _raportService.GetRaportDataAsync(raportId);
        return Ok(raportData);
    }
    [HttpGet("file/{fileId}")]
    [Authorize]
    public async Task<ActionResult<RaportFileDto>> GetRaportFileAsync(int fileId)
    {
        var raportFile = await _raportService.GetFileAsync(fileId);
        return Ok(raportFile);
    }
    [HttpPost]
    [Authorize]
    public async Task<ActionResult> GenerateRaportAsync()
    {
        await _raportService.GenerateRaportAsync();
        return Ok();
    }
}
