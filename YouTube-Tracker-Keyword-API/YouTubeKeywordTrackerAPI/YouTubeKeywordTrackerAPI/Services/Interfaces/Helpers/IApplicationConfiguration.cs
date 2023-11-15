namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Helpers
{
    public interface IApplicationConfiguration
    {
        public string GetConnectionString();
        public string GetSecretKey();
    }
}
