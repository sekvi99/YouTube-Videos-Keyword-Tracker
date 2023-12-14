using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Exceptions;
using YouTubeKeywordTrackerAPI.Helpers;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Models.ExternalApiModels;
using YouTubeKeywordTrackerAPI.Models.Raport;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Data;
using YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;

namespace YouTubeKeywordTrackerAPI.Services;

public class RaportService : IRaportService
{
    private readonly ISearchKeywordService _searchKeywordService;
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    private readonly ILogger<RaportService> _logger;
    private readonly IMapper _mapper;
    private readonly IYouTubeApiKeywordService _apiKeywordService;
    private readonly IRaportFileService _fileService;
    private readonly IUserIdentityService _userIdentityService;
    public RaportService(ISearchKeywordService searchKeywordService, YouTubeKeywordTrackerDbContext dbContext, ILogger<RaportService> logger, IMapper mapper, IYouTubeApiKeywordService apiKeywordService, IRaportFileService fileService, IUserIdentityService userIdentityService)
    {
        _searchKeywordService = searchKeywordService;
        _dbContext = dbContext;
        _logger = logger;
        _mapper = mapper;
        _apiKeywordService = apiKeywordService;
        _fileService = fileService;
        _userIdentityService = userIdentityService;
    }
    public async Task GenerateRaportAsync()
    {
        var collections = new List<CollectionModel<KeywordSummaryDto>>();
        var keywords = await _searchKeywordService.GetKeywordsForUserAsync();
        foreach (var keyword in keywords)
        {
            var collection = await _apiKeywordService.GetKeywordSummaryAsync(keyword.Keyword);
            collections.Add(collection);
        }

        var combinedCollection = CollectionsHelper<KeywordSummaryDto>.CombineCollection(collections);

        if (combinedCollection == null || combinedCollection.Count <= 0)
        {
            _logger.LogError("Extracted api collection is empty or null");
            throw new EmptyCollectionException("Extracted api collection is empty or null");
        }

        var raportContent = await _fileService.ConvertJsonToPdfByes(combinedCollection);
        _logger.LogInformation("Extracted stream content of pdf file");

        var raport = new Raport()
        {
            UserId = _userIdentityService.GetUserId(),
            RaportFile = new RaportFiles()
            {
                FileContent = raportContent
            },
            RaportDataList = _mapper.Map<IEnumerable<RaportData>>(combinedCollection.Items)
        };

        _logger.LogInformation("Created new raport reference");
        await _dbContext.AddAsync(raport);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<RaportDto>> GetAllRaportsAsync()
    {
        var userId = _userIdentityService.GetUserId();
        var raports = await _dbContext
            .Raports
            .Include(r => r.RaportDataList)
            .Where(r => r.UserId  == userId)
            .ToListAsync();

        if (raports == null || raports.Count <= 0)
        {
            throw new ResourceNotFoundException($"Can not find raports for current user");
        }

        var raportDtos = raports
            .Select(r => new RaportDto()
            {
                Id = r.Id,
                ReadoutsCount = r.RaportDataList.Count()
            });

        return raportDtos;
    }

    public async Task<RaportFileDto> GetFileAsync(int fileId)
    {
        var raportFile = _dbContext
            .RaportFiles
            .FirstOrDefault(raport => raport.Id == fileId);

        if (raportFile == null)
        {
            throw new ResourceNotFoundException($"Raport file with Id: {fileId} does not exist in the system");
        }

        return _mapper.Map<RaportFileDto>(raportFile);
    }

    public async Task<RaportDetailsDto> GetRaportDataAsync(int raportId)
    {
        var raportData = await _dbContext
            .RaportsData
            .Where(r => r.RaportId == raportId)
            .ToListAsync();

        if (raportData == null || raportData.Count <= 0)
        {
            throw new ResourceNotFoundException($"Data of raport with ID: {raportId} does not exist in the system");
        }

        var raportFile = await _dbContext
            .RaportFiles
            .Where(rf => rf.RaportId == raportId)
            .FirstOrDefaultAsync();

        // Check if a file exists for the given raportId
        if (raportFile == null)
        {
            throw new ResourceNotFoundException($"File for raport with ID: {raportId} does not exist in the system");
        }

        // TODO Refactor below
        return new RaportDetailsDto()
        {
            Id = raportId,
            FileId = raportFile.Id,
            RaportReadouts = raportData.Select(r => new RaportReadoutDto()
            {
                Id = r.Id,
                RaportId = r.RaportId,
                VideoTitle = r.VideoTitle,
                VideoUrl = r.VideoUrl,
                Views = r.Views ?? 0,
                CommentsCount = r.CommentsCount ?? 0,
                PublishedAt = r.PublishedAt ?? DateTime.MinValue,
                Duration = r.Duration,
                ChannelTitle = r.ChannelTitle
            }).ToList()
        };
    }
}
