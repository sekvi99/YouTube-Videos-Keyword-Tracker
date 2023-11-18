using YouTubeKeywordTrackerAPI.Exceptions;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;

namespace YouTubeKeywordTrackerAPI.Services;

public class YouTubeApiKeywordService : IYouTubeApiKeywordService
{
    private readonly string _defaultUrl = "http://127.0.0.1:8000";
    private readonly HttpClient _httpClient;
	public YouTubeApiKeywordService(HttpClient httpClient)
	{
        _httpClient = httpClient;
	}
    public async Task<CollectionModel<KeywordSummaryDto>> GetKeywordSummaryAsync(string keyword)
    {
        // TODO Refactor service after proper Docker service connection
        _httpClient.BaseAddress = new Uri(_defaultUrl);

        string apiUrl = $"/api/keyword/{keyword}";

        HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

        if (!response.IsSuccessStatusCode)
        {
            throw new ApiConnectionException("Unable to connect with Python API service");
        }

        var jsonResponse = await response.Content.ReadFromJsonAsync<CollectionModel<KeywordSummaryDto>>();

        var keywordSummaries = jsonResponse?.Items.Select(item => new KeywordSummaryDto
        {
            VideoTitle = item?.VideoTitle,
            VideoUrl = item?.VideoUrl,
            View = item?.View,
            CommentsCount = item?.CommentsCount,
            PublishedAt = item?.PublishedAt,
            Duration = item?.Duration,
            ChannelTitle = item?.ChannelTitle
        });

        return new CollectionModel<KeywordSummaryDto>
        {
            Count = jsonResponse?.Count ?? 0,
            Items = keywordSummaries ?? Enumerable.Empty<KeywordSummaryDto>()
        };
    }
}
