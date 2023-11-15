using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace YouTubeKeywordTrackerAPI.Controllers;

public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    public AuthenticationController(IAuthenticationService service)
    {
        _authenticationService = service;
    }
    
    [HttpPost("api/register")]
    public async Task<ActionResult<User>> Register([FromBody] UserDto user)
    {
        await _authenticationService.Register(user);
        return Ok();
    }

    [HttpPost("api/login")]
    public async Task<ActionResult<string>> Login([FromBody] UserDto user)
    {
        var token = await _authenticationService.Login(user);
        return Ok(new { Token = token });
    }
}
