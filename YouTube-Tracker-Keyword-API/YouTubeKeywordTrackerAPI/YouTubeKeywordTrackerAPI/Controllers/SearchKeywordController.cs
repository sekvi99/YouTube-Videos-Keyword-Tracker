using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Exceptions;
using YouTubeKeywordTrackerAPI.Models.Authentication;
using YouTubeKeywordTrackerAPI.Models.Data;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Data;

namespace YouTubeKeywordTrackerAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class SearchKeywordController : ControllerBase
{
    private readonly ISearchKeywordService _searchKeywordService;
    public SearchKeywordController(ISearchKeywordService searchKeywordService)
    {
        _searchKeywordService = searchKeywordService;
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<SearchKeywordDto>> GetKeywordById(int id)
    {
        var keywordDto = await _searchKeywordService.GetKeywordByIdAsync(id);
        return Ok(keywordDto);
    }
    [HttpGet("user")]
    public async Task<ActionResult<IEnumerable<SearchKeyword>>> GetKeywordsForUser()
    {
        var keywords = await _searchKeywordService.GetKeywordsForUserAsync();
        return Ok(keywords);
    }
    [HttpPost]
    public async Task<ActionResult> AddKeyword([FromBody] CreateSearchKeywordDto keyword)
    {
        await _searchKeywordService.AddKeywordAsync(keyword);
        return Ok("Keyword added successfully");
    }
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateKeyword(int id, [FromBody] UpdateSearchKeywordDto keyword)
    {
        await _searchKeywordService.Update(keyword, id);
        return Ok("Keyword updated successfully");
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteKeyword(int id)
    {
        await _searchKeywordService.Delete(id);
        return Ok("Keyword deleted successfully");
    }
}
