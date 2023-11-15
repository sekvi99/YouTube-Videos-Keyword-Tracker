using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Models.Authentication;
using YouTubeKeywordTrackerAPI.Models.Data;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Data;

public interface ISearchKeywordService
{
    public Task<SearchKeyword> GetKeywordAsync(int id);
    public Task<SearchKeywordDto> GetKeywordByIdAsync(int id);
    public Task<IEnumerable<SearchKeyword>> GetKeywordsForUserAsync(int userId);
    public Task AddKeywordAsync(CreateSearchKeywordDto keyword);
    public Task Update(UpdateSearchKeywordDto dto, int id);
    public Task Delete(int id);
}
