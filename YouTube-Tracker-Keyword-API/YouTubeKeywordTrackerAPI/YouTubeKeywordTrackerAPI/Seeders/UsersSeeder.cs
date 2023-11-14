using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Seeders.Interfaces;

namespace YouTubeKeywordTrackerAPI.Seeders;

public class UsersSeeder : IDataSeeder<User>
{
    private readonly YouTubeKeywordTrackerDbContext _dbContext;

    public UsersSeeder(YouTubeKeywordTrackerDbContext context)
    {
        _dbContext = context;
    }
    // TODO Implement Seed and GetItems after creating service for reading data from json
    public void Seed()
    {
        throw new NotImplementedException();
    }

    private IEnumerable<User> GetItems()
    {
        throw new NotImplementedException();
    }
}
