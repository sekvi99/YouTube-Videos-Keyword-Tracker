using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;

public interface IYouTubeSubtitlesService
{
    public Task<CollectionModel<VideoSubtitleDto>> GetVideoSubtitlesAsync(string videoUrl);
    public Task<string> GetVideoTranscriptionAsync(VideoUrlDto video);
}
