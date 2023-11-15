using AutoMapper;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using YouTubeKeywordTrackerAPI.Models;

namespace YouTubeKeywordTrackerAPI.Services;

public class SearchKeywordService : ISearchKeywordService
{
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    private readonly IMapper _mapper;

    public SearchKeywordService(YouTubeKeywordTrackerDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    private async Task<SearchKeyword> SelectKeywordById(int id)
    {
        var keyword = await _dbContext
            .Keywords
            .FirstOrDefaultAsync(k => k.Id == id);
        return keyword;
    }

    private async Task<IEnumerable<SearchKeyword>> SelectAllKeywordsForGivenUser(UserDto user)
    {
        var keywords = await _dbContext
            .Users
            .Where(u => u.Username == user.Username)
            .SelectMany(u => u.Keywords)
            .ToListAsync();

        return keywords;
    }

    public async Task<SearchKeywordDto> GetById(int id)
    {
        var keyword = await SelectKeywordById(id);

        if (keyword is null)
        {
            // TODO Add custom exception there
            // throw new NotFoundException
        }

        var keywordDto = _mapper.Map<SearchKeywordDto>(keyword);
        return keywordDto;
    }

    public async Task<IEnumerable<SearchKeywordDto>> GetAllKeywordsForGivenUser(UserDto user)
    {
        var keywords = await SelectAllKeywordsForGivenUser(user);
        var keywordsDtos = _mapper.Map<List<SearchKeywordDto>>(keywords);
        return keywordsDtos;
    }

    public async Task<int> Create(CreateSearchKeywordDto dto, UserDto user)
    {
        var keywords = await SelectAllKeywordsForGivenUser(user);
        var keywordsDtos = _mapper.Map<List<CreateSearchKeywordDto>>(keywords);
        if (keywordsDtos.Contains(dto))
        {
            // TODO Add custom exception when resource already exist
            // Keyword with given KeyWord Name exist for given user
        }

        var keyword = _mapper.Map<SearchKeyword>(dto);
        _dbContext.Keywords.Add(keyword);
        await _dbContext.SaveChangesAsync();
        return keyword.Id;
    }

    public async Task Delete(int id)
    {
        var keyword = await SelectKeywordById(id);

        if (keyword is null)
        {
            // TODO Add custom exception
        }

        _dbContext.Remove(keyword);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Update(UpdateSearchKeywordDto dto, int id)
    {
        var keyword = await SelectKeywordById(id);

        if (keyword is null)
        {
            // TODO Add custom ecception there
        }

        keyword.Keyword = dto.Keyword;
        await _dbContext.SaveChangesAsync();
    }
}

