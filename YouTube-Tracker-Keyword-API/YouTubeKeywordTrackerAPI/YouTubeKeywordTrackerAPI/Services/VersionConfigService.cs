using YouTubeKeywordTrackerAPI.Models.Version;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Version;
using System.Text.Json;
namespace YouTubeKeywordTrackerAPI.Services;

public class VersionConfigService : IVersionConfigService
{
    private readonly string _filePath = "githubsettings.json";
    public Task<VersionSettings> GetVersionSettingsAsync()
    {
        var json = File.ReadAllText(_filePath);
        return Task.FromResult(JsonSerializer.Deserialize<VersionSettings>(json));
    }
}
