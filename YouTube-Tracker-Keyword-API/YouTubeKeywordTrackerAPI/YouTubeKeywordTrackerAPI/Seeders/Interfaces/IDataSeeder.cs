using YouTubeKeywordTrackerAPI.Entities;

namespace YouTubeKeywordTrackerAPI.Seeders.Interfaces;

public interface IDataSeeder<T> where T : Entity
{
    public void Seed();
}
