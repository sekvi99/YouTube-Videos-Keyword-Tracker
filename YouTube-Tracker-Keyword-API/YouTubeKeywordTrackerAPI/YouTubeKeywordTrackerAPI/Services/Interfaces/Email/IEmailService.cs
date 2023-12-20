using YouTubeKeywordTrackerAPI.Models.Email;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Email;

public interface IEmailService
{
    public Task<bool> SendEmail(EmailRequestDto mail);
    public Task<bool> SendEmailWithReportAsync(EmailRequestDto mail, int reportFileId);
}