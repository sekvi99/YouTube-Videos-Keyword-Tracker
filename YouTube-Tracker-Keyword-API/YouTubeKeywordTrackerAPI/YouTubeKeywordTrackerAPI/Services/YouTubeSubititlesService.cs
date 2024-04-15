using System.Text;
using YouTubeKeywordTrackerAPI.Exceptions;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;
using YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;
using Newtonsoft.Json;

namespace YouTubeKeywordTrackerAPI.Services;

public class YouTubeSubititlesService : IYouTubeSubtitlesService
{
    private readonly string _defaultUrl = "http://127.0.0.1:8000";
    private readonly IHttpClientFactory _httpClientFactory;
    public YouTubeSubititlesService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    public async Task<CollectionModel<VideoSubtitleDto>> GetVideoSubtitlesAsync(string videoUrl)
    {
        var httpClient = _httpClientFactory.CreateClient();
        httpClient.BaseAddress = new Uri(_defaultUrl);

        string apiUrl = "/api/translate";

        var requestBody = new { videoUrl = videoUrl };
        var jsonBody = JsonConvert.SerializeObject(requestBody);
        HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

        HttpResponseMessage response = await httpClient.PostAsync(apiUrl, content);

        if (!response.IsSuccessStatusCode)
        {
            throw new ApiConnectionException("Unable to connect with Python API service");
        }

        var jsonResponse = await response.Content.ReadFromJsonAsync<CollectionModel<VideoSubtitleDto>>();

        var subtitles = jsonResponse?.Items.Select(subtitle => new VideoSubtitleDto()
        {
            TimeFrom = subtitle?.TimeFrom ?? 0,
            TimeTo = subtitle?.TimeTo ?? 0,
            Subtitles = subtitle?.Subtitles,
        });

        return new CollectionModel<VideoSubtitleDto>()
        {
            Count = jsonResponse?.Count ?? 0,
            Items = subtitles ?? Enumerable.Empty<VideoSubtitleDto>()
        };
    }

    public async Task<string> GetVideoTranscriptionAsync(VideoUrlDto video)
    {
        var httpClient = _httpClientFactory.CreateClient();
        httpClient.BaseAddress = new Uri(_defaultUrl);

        string apiUrl = "/api/generate-subtitles";

        var requestBody = new { videoUrl = video.VideoUrl };
        var jsonBody = JsonConvert.SerializeObject(requestBody);
        HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

        HttpResponseMessage response = await httpClient.PostAsync(apiUrl, content);

        if (!response.IsSuccessStatusCode)
        {
            throw new ApiConnectionException("Unable to connect with Python API service");
        }

        return await response.Content.ReadAsStringAsync();
    }
}
