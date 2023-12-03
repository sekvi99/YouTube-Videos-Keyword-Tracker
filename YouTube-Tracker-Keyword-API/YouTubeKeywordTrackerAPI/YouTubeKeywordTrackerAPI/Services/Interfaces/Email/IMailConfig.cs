using YouTubeKeywordTrackerAPI.Models.Email;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Email;

public interface IMailConfig
{
    public Task<MailSettings> GetMailSettingsAsync();
}
