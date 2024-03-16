using YouTubeKeywordTrackerAPI.Models.Version;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Version;
using YouTubeKeywordTrackerAPI.Exceptions;

namespace YouTubeKeywordTrackerAPI.Services;

public class VersionService : IVersionService
{
    private readonly string _githubApiUrl = "https://api.github.com/repos/";
    private readonly string _owner = "sekvi99";
    private readonly string _repo = "YouTube-Videos-Keyword-Tracker";
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IVersionConfigService _versionConfigService;
    public VersionService(IHttpClientFactory httpClientFactory, IVersionConfigService versionConfigService)
    {
        _httpClientFactory = httpClientFactory;
        _versionConfigService = versionConfigService;
    }
    public async Task<VersionDto> GetVersionAsync()
    {
        var versionSettings = await _versionConfigService.GetVersionSettingsAsync();
        var httpClient = _httpClientFactory.CreateClient("github");
        httpClient.BaseAddress = new Uri(_githubApiUrl);

        // Set required headers
        httpClient.DefaultRequestHeaders.Add("Accept", $"{ versionSettings.Accept }");
        httpClient.DefaultRequestHeaders.Add("Accept-Encoding", $"{ versionSettings.Encoding }");
        httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer { versionSettings.Token }");
        httpClient.DefaultRequestHeaders.Add("X-GitHub-Api-Version", $"{ versionSettings.ApiVersion }");
        httpClient.DefaultRequestHeaders.Add("User-Agent", $"{ versionSettings.UserAgent }");

        string apiUrl = $"{_owner}/{_repo}/commits?per_page=1&order=desc";

        var response = await httpClient.GetAsync(apiUrl);

        if (!response.IsSuccessStatusCode)
        {
            throw new ApiConnectionException("Unable to reach Github API");
        }
         
        var jsonResponse = await response.Content.ReadFromJsonAsync<GitHubCommitDto[]>();

        if (jsonResponse == null || jsonResponse.Length <= 0)
        {
            throw new ApiConnectionException("Unable to reach Github API");
        }

        var lastCommit = jsonResponse[0];

        return new VersionDto()
        {
            Author = lastCommit.Commit.Author.Name,
            Email = lastCommit.Commit.Author.Email,
            Message = lastCommit.Commit.Message,
            Date = lastCommit.Commit.Author.Date,
            Sha = lastCommit.Sha
        };
    }
}
