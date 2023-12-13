using PdfSharp.Drawing;
using PdfSharp.Fonts;
using PdfSharp.Pdf;
using YouTubeKeywordTrackerAPI.Helpers;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace YouTubeKeywordTrackerAPI.Services;

public class RaportFileService : IRaportFileService
{
    private int BaseYPosition = 40; // Default position of cursor to write data into pdf file
    private readonly ILogger<RaportFileService> _logger;
    public RaportFileService(ILogger<RaportFileService> logger)
    {
        _logger = logger;
    }
    public async Task<byte[]> ConvertJsonToPdfByes(CollectionModel<KeywordSummaryDto> keywords)
    {
        _logger.LogInformation("Creating pdf file bytes stream");
        try
        {
            return await DrawDataAtPdf(keywords);
        }
        catch (Exception ex)
        {
            // Handle the exception
            return null;
        }

    }
    private void DrawString(string information, XGraphics graphics, XFont font)
    {
        graphics.DrawString(information, font, XBrushes.Black, new XPoint(10, BaseYPosition));
        BaseYPosition += 10;
    }
    
    private async Task<byte[]> DrawDataAtPdf(CollectionModel<KeywordSummaryDto> keywords)
    {
        var pdfDocument = new PdfDocument();
        var page = pdfDocument.AddPage();
        var graphics = XGraphics.FromPdfPage(page);
        var font = new XFont("Arial", 12);

        graphics.DrawString($"Liczba nowych filmów: {keywords.Count}", font, XBrushes.Black, new XPoint(10, 10));

        foreach (var keyword in keywords.Items)
        {
            // DrawString($"Materiał: {keyword.VideoTitle ?? ""} - {keyword.ChannelTitle ?? ""}", graphics, font);
            DrawString($"Url: {keyword.VideoUrl ?? ""}", graphics, font);
            DrawString($"Liczba wyświetleń: {keyword.Views ?? 0}", graphics, font);
            DrawString($"Liczba komentarzy: {keyword.CommentsCount ?? 0}", graphics, font);
            DrawString($"Opublikowano: {keyword.PublishedAt ?? DateTime.UtcNow}", graphics, font);
            BaseYPosition += 40;
        }

        using (var memoryStream = new MemoryStream())
        {
            pdfDocument.Save(memoryStream, false);
            return memoryStream.ToArray();
        }
    }
}
