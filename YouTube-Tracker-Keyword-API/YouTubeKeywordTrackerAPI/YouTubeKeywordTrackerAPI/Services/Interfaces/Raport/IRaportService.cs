using YouTubeKeywordTrackerAPI.Models.Raport;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;

public interface IRaportService
{
    public Task<IEnumerable<RaportDto>> GetAllRaportsAsync();
    public Task<RaportDetailsDto> GetRaportDataAsync(int raportId);
    public Task<RaportFileDto> GetFileAsync(int fileId);
    public Task GenerateRaportAsync();

}
