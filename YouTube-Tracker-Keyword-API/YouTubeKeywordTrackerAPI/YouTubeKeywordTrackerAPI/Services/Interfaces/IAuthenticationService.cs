using YouTubeKeywordTrackerAPI.Models;
namespace YouTubeKeywordTrackerAPI.Services.Interfaces;

public interface IAuthenticationService
{
    public Task Register(UserDto model);
    public Task<string> Login(UserDto model);
}
