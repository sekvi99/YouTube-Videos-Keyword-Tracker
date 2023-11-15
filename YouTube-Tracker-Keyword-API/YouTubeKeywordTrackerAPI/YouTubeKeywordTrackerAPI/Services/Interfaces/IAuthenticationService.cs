using YouTubeKeywordTrackerAPI.Models.Authentication;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces;

public interface IAuthenticationService
{
    public Task Register(UserRegistrationDto user);
    public Task<string> Login(UserLoginDto user);
}
