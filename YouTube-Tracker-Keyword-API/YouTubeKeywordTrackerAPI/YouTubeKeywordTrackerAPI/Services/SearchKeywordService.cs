using AutoMapper;
using YouTubeKeywordTrackerAPI.Entities;
using Microsoft.EntityFrameworkCore;
using YouTubeKeywordTrackerAPI.Models.Data;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Data;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication;
using YouTubeKeywordTrackerAPI.Exceptions;

namespace YouTubeKeywordTrackerAPI.Services;

public class SearchKeywordService : ISearchKeywordService
{
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    private readonly IUserIdentityService _userIdentityService;
    private readonly IMapper _mapper;

    public SearchKeywordService(YouTubeKeywordTrackerDbContext context, IUserIdentityService userIdentityService, IMapper mapper)
    {
        _dbContext = context;
        _userIdentityService = userIdentityService;
        _mapper = mapper;
    }
    private async Task<SearchKeyword> GetKeywordById(int id)
    {
        var keyword = await _dbContext
            .Keywords
            .FirstOrDefaultAsync(keyword => keyword.Id == id);
        return keyword;
    }
    public async Task<SearchKeyword> GetKeywordAsync(int keywordId)
    {
        return await _dbContext.Keywords.FindAsync(keywordId);
    }
    public async Task<SearchKeywordDto> GetKeywordByIdAsync(int id)
    {
        var keyword = await GetKeywordById(id);
        if (keyword is null)
        {
            throw new ResourceNotFoundException($"Keyword with given id: {id} does not exist in database");
        }
        var keywordDto = _mapper.Map<SearchKeywordDto>(keyword);
        return keywordDto;
    }
    public async Task<IEnumerable<SearchKeyword>> GetKeywordsForUserAsync()
    {
        var userId = _userIdentityService.GetUserId();
        return await _dbContext
            .Keywords
            .Where(n => n.UserId == userId)
            .ToListAsync();
    }
    public async Task AddKeywordAsync(CreateSearchKeywordDto keyword)
    {
        var userId = _userIdentityService.GetUserId();
        if (await _dbContext.Keywords.AnyAsync(k => k.UserId == userId && k.Keyword == keyword.Keyword))
        {
            throw new ResourceAlreadyExistException("User alread has this keyword");
        }
        var newKeyword = _mapper.Map<CreateSearchKeywordDto, SearchKeyword>(keyword);
        newKeyword.UserId = userId;
        newKeyword.DateCreated = DateTime.UtcNow;
        _dbContext.Keywords.Add(newKeyword);
        await _dbContext.SaveChangesAsync();
    }
    public async Task Update(UpdateSearchKeywordDto dto, int id)
    {
        var keyword = await GetKeywordById(id);
        if (keyword is null)
        {
            throw new ResourceNotFoundException($"Keyword with given id: {id} does not exist in database");
        }
        keyword.Keyword = dto.Keyword;
        keyword.DateModified = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
    }
    public async Task Delete(int id)
    {
        var keyword = await GetKeywordById(id);
        if (keyword is null)
        {
            throw new ResourceNotFoundException($"Keyword with given id: {id} does not exist in database");
        }
        _dbContext.Remove(keyword);
        await _dbContext.SaveChangesAsync();
    }
}

