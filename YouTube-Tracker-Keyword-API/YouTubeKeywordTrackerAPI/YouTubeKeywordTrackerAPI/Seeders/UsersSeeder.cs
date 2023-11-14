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
        if (_dbContext.Database.CanConnect())
        {
            if (!_dbContext.Users.Any())
            {
                var users = GetItems();
                _dbContext.Users.AddRange(users);
                _dbContext.SaveChanges();
            }
            else
            {
                // TODO throw custom exception
            }
        }
        else
        {
            // TODO Throw custom exception
        }
    }

    private IEnumerable<User> GetItems()
    {
        // To Refactor l8er
        var users = new List<User>()
        {
            new User()
            {
                Username = "admin",
                PasswordHash = "admin",
                Address = new Address()
                {
                    City = "New York",
                    Street = "Admin street",
                    PostalCode = "30-001"
                }
            }
        };
        return users;
    }
}
