using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models.Authentication;

namespace YouTubeKeywordTrackerAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    public AuthenticationController(IAuthenticationService service)
    {
        _authenticationService = service;
    }
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] UserRegistrationDto user)
    {
        await _authenticationService.Register(user);
        return Ok();
    }
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] UserLoginDto user)
    {
        var token = await _authenticationService.Login(user);
        return Ok(new { Token = token });
    }
}
