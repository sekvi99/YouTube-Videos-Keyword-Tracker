using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;

public interface IYouTubeApiKeywordService
{
    public Task<CollectionModel<KeywordSummaryDto>> GetKeywordSummaryAsync(string keyword);
}
