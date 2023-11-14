using YouTubeKeywordTrackerAPI.Entities;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces;

public interface ITokenGenerator
{
    public string GenerateJwtToken(User user);
}
