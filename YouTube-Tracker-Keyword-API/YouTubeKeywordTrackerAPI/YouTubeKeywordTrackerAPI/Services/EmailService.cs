using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Exceptions;
using YouTubeKeywordTrackerAPI.Models.Email;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Email;

namespace YouTubeKeywordTrackerAPI.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly IMailConfig _mailConfig;
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    public EmailService(ILogger<EmailService> logger, IMailConfig mailConfig, YouTubeKeywordTrackerDbContext dbContext)
    {
        _logger = logger;
        _mailConfig = mailConfig;
        _dbContext = dbContext;
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

    public async Task<bool> SendEmailWithReportAsync(EmailRequestDto mail, int reportFileId)
    {
        var reportFile = await _dbContext
            .RaportFiles
            .FirstOrDefaultAsync(r =>  r.Id == reportFileId);

        if (reportFile == null)
        {
            _logger.LogError($"Can't find report file with ID: {reportFileId}");
            throw new ResourceNotFoundException($"Can't find report file with ID: {reportFileId}");
        }

        try
        {
            var pdfAttachment = new MimePart("application", "pdf")
            {
                Content = new MimeContent(new MemoryStream(reportFile.FileContent)),
                ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                ContentTransferEncoding = ContentEncoding.Base64,
                FileName = "report.pdf"
            };

            var mailCredentials = await _mailConfig.GetMailSettingsAsync();
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(mailCredentials.Username));
            email.To.Add(MailboxAddress.Parse(mail.Receiver));
            email.Subject = mail.Topic;

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = mail.Body;

            bodyBuilder.Attachments.Add(pdfAttachment);
            email.Body = bodyBuilder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(mailCredentials.SmtpServer, mailCredentials.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(mailCredentials.Username, mailCredentials.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);

            return true;
        }
        catch (Exception e)
        {
            _logger.LogError($"Error sending email with report: {e.Message}");
            return false;
        }
    }
}
