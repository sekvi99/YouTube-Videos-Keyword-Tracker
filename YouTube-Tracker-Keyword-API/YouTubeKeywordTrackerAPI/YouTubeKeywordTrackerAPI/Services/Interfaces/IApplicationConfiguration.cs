namespace YouTubeKeywordTrackerAPI.Services.Interfaces
{
    public interface IApplicationConfiguration
    {
        public string GetConnectionString();
        public string GetSecretKey();
    }
}
