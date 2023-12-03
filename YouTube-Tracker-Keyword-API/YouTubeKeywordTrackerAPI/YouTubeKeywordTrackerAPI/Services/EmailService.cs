using MailKit.Net.Smtp;
using MimeKit;
using YouTubeKeywordTrackerAPI.Models.Email;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Email;

namespace YouTubeKeywordTrackerAPI.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly IMailConfig _mailConfig;
    public EmailService(ILogger<EmailService> logger, IMailConfig mailConfig)
    {
        _logger = logger;
        _mailConfig = mailConfig;
    }
    public async Task<bool> SendEmail(EmailRequestDto mail)
    {
        var mailCredentials = await _mailConfig.GetMailSettingsAsync();
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(mailCredentials.Username));
        email.To.Add(MailboxAddress.Parse(mail.Receiver));
        email.Subject = mail.Topic;
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = mail.Body };

        using var smtp = new SmtpClient();

        try
        {
            smtp.Connect(mailCredentials.SmtpServer, mailCredentials.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(mailCredentials.Username, mailCredentials.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError($"Error sending email: {e.Message}");
            return false;
        }
    }
}
