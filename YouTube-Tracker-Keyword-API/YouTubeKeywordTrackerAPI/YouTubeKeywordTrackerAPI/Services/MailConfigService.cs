using MailKit;
using System.Text.Json;
using System.Text.Json.Serialization;
using YouTubeKeywordTrackerAPI.Models.Email;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Email;

namespace YouTubeKeywordTrackerAPI.Services;

public class MailConfigService : IMailConfig
{
    private readonly string _filePath = "mailsettings.json";
    public Task<MailSettings> GetMailSettingsAsync()
    {
        var json = File.ReadAllText(_filePath);
        return Task.FromResult(JsonSerializer.Deserialize<MailSettings>(json));
    }
}
