using YouTubeKeywordTrackerAPI.Models.Version;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Version;

public interface IVersionService
{
    public Task<VersionDto> GetVersionAsync();
}
