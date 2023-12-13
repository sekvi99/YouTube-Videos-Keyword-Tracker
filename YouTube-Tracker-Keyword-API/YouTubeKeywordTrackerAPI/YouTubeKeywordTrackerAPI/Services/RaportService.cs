using AutoMapper;
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
    private readonly ILogger _logger;
    private readonly IMapper _mapper;
    private readonly IYouTubeApiKeywordService _apiKeywordService;
    private readonly IRaportFileService _fileService;
    private readonly IUserIdentityService _userIdentityService;
    public RaportService(ISearchKeywordService searchKeywordService, YouTubeKeywordTrackerDbContext dbContext, ILogger logger, IMapper mapper, IYouTubeApiKeywordService apiKeywordService, IRaportFileService fileService, IUserIdentityService userIdentityService)
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

        var raportContent = _fileService.ConvertJsonToPdfByes(combinedCollection);
        _logger.LogInformation("Extracted stream content of pdf file");

        // await _dbContext.Raports.AddAsync(new Raport()
        // {
        //    UserId = _userIdentityService.GetUserId(),
        // });

    }

    public async Task<IEnumerable<RaportDto>> GetAllRaportsAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<RaportFileDto> GetFileAsync(int fileId)
    {
        throw new NotImplementedException();
    }

    public async Task<RaportDetailsDto> GetRaportDataAsync(int raportId)
    {
        throw new NotImplementedException();
    }
}
