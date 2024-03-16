using YouTubeKeywordTrackerAPI.Models.Version;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Version;

public interface IVersionConfigService
{
    public Task<VersionSettings> GetVersionSettingsAsync();
}
