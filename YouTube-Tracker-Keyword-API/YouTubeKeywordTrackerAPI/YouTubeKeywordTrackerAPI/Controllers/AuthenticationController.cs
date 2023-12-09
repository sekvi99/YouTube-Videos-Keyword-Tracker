using YouTubeKeywordTrackerAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models.Authentication;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication;
using Microsoft.AspNetCore.Authorization;

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
    public async Task<ActionResult<UserLoginSuccessDto>> Login([FromQuery] UserLoginDto user)
    {
        var userLoginSuccess = await _authenticationService.Login(user);
        return Ok(userLoginSuccess);
    }
    [HttpGet("all")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
    {
        var users =  await _authenticationService.GetAllUsers();
        return Ok(users);
    }
    [HttpDelete("{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task Delete(int userId)
    {
        await _authenticationService.Delete(userId);
    }
    [HttpPut("{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task Update([FromBody] UserUpdateDto user, int userId)
    {
        await _authenticationService.UpdateUserCredentials(userId, user);
    }   
    [HttpPut("password")]
    [Authorize]
    public async Task UpdatePassword([FromBody] UserUpdatePasswordDto user)
    {
        await _authenticationService.UpdateUserPassword(user);
    }
}
