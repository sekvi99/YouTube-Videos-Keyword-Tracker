using Microsoft.AspNetCore.Identity;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Seeders.Interfaces;

namespace YouTubeKeywordTrackerAPI.Seeders;

public class UsersSeeder : IDataSeeder<User>
{
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;

    public UsersSeeder(YouTubeKeywordTrackerDbContext context, IPasswordHasher<User> passwordHasher)
    {
        _dbContext = context;
        _passwordHasher = passwordHasher;
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
                PasswordHash = _passwordHasher.HashPassword(null, "admin"),
                Address = new Address()
                {
                    City = "New York",
                    Street = "Admin street",
                    PostalCode = "30-001"
                },
                Role = new Role()
                {
                    Name = "Admin",
                }
            }
        };
        return users;
    }
}
