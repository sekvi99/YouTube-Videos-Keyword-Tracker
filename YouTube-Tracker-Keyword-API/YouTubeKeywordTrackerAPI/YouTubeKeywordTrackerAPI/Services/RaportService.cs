using YouTubeKeywordTrackerAPI.Models.Raport;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;

namespace YouTubeKeywordTrackerAPI.Services;

public class RaportService : IRaportService
{
    public Task GenerateRaportAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<RaportDto>> GetAllRaportsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<RaportFileDto> GetFileAsync(int fileId)
    {
        throw new NotImplementedException();
    }

    public Task<RaportDetailsDto> GetRaportDataAsync(int raportId)
    {
        throw new NotImplementedException();
    }
}
