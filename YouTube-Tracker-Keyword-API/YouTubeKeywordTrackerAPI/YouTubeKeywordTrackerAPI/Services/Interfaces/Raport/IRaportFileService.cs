using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.Data;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;

public interface IRaportFileService
{
    public Task<byte[]> ConvertJsonToPdfByes(CollectionModel<KeywordSummaryDto> keywords);
}
