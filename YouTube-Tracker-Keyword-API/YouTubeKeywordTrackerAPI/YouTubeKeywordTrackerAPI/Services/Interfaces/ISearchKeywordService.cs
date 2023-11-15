using YouTubeKeywordTrackerAPI.Models;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces;

public interface ISearchKeywordService
{
    Task<SearchKeywordDto> GetById(int id);
    Task Delete(int id);
    Task Update(UpdateSearchKeywordDto searchKeywordDto, int id);
    Task<IEnumerable<SearchKeywordDto>> GetAllKeywordsForGivenUser(UserDto user);
    Task<int> Create(CreateSearchKeywordDto searchKeywordDto, UserDto user);
}
