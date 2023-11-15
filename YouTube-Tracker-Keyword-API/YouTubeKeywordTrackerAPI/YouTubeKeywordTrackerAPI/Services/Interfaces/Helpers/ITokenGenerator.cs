using YouTubeKeywordTrackerAPI.Entities;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Helpers;

public interface ITokenGenerator
{
    public string GenerateJwtToken(User user);
}
