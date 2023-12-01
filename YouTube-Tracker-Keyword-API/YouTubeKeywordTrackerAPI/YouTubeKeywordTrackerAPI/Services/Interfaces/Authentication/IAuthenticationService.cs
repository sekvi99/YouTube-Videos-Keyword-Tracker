using YouTubeKeywordTrackerAPI.Models.Authentication;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication;

public interface IAuthenticationService
{
    public Task Register(UserRegistrationDto user);
    public Task<UserLoginSuccessDto> Login(UserLoginDto user);
    public Task<IEnumerable<UserDto>> GetAllUsers();
    public Task UpdateUserCredentials(int userId, UserUpdateDto user);
    public Task Delete(int userId);
}
