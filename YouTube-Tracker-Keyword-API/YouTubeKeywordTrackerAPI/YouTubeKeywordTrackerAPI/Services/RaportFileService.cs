using PdfSharp.Drawing;
using PdfSharp.Pdf;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;

namespace YouTubeKeywordTrackerAPI.Services;

public class RaportFileService : IRaportFileService
{
    private int BaseYPosition = 40; // Default position of cursor to write data into pdf file
    private readonly ILogger _logger;
    public RaportFileService(ILogger logger)
    {
        _logger = logger;
    }
    public async Task<byte[]> ConvertJsonToPdfByes(CollectionModel<KeywordSummaryDto> keywords)
    {
        _logger.LogInformation("Creating pdf file bytes stream");

        var pdfDocument = new PdfDocument();
        var page = pdfDocument.AddPage();
        var graphics = XGraphics.FromPdfPage(page);
        var font = new XFont("Roboto", 12);

        graphics.DrawString($"Liczba nowych filmów: {keywords.Count}", font, XBrushes.Black, new XPoint(10, 10));

        foreach (var keyword in keywords.Items)
        {
            DrawString($"Materiał: {keyword.VideoTitle} - {keyword.ChannelTitle}", graphics, font);
            DrawString($"Url: {keyword.VideoUrl}", graphics, font);
            DrawString($"Liczba wyświetleń: {keyword.Views}", graphics, font);
            DrawString($"Liczba komentarzy: {keyword.CommentsCount}", graphics, font);
            DrawString($"Opublikowano: {keyword.PublishedAt}", graphics, font);
            BaseYPosition += 40;
        }

        using(var memoryStream = new MemoryStream())
        {
            pdfDocument.Save(memoryStream, false);
            return memoryStream.ToArray();
        }
    }
    private void DrawString(string information, XGraphics graphics, XFont font)
    {
        graphics.DrawString(information, font, XBrushes.Black, new XPoint(10, BaseYPosition));
        BaseYPosition += 10;
    }
}
