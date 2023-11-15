using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models.Authentication;
using YouTubeKeywordTrackerAPI.Models.Data;
using YouTubeKeywordTrackerAPI.Services.Interfaces;

namespace YouTubeKeywordTrackerAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/keyword")]
public class SearchKeywordController : ControllerBase
{
    private readonly ISearchKeywordService _searchKeywordService;
    public SearchKeywordController(ISearchKeywordService searchKeywordService)
    {
        _searchKeywordService = searchKeywordService;
    }

    [HttpPost]
    public async Task<ActionResult> CreateKeyword([FromBody] CreateSearchKeywordDto dto, [FromQuery] UserDto user)
    {
        var id = await _searchKeywordService.Create(dto, user);
        return Created($"/api/keyword/{id}", null);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateBookStore([FromBody] UpdateSearchKeywordDto dto, [FromRoute] int id)
    {
        await _searchKeywordService.Update(dto, id);
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SearchKeywordDto>>> GetAllKeywordForGivenUser([FromQuery] UserDto user)
    {
        var results = await _searchKeywordService.GetAllKeywordsForGivenUser(user);
        return Ok(results);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SearchKeywordDto>> Get([FromRoute] int id)
    {
        var result = await _searchKeywordService.GetById(id);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _searchKeywordService.Delete(id);
        return Ok();
    }
}
