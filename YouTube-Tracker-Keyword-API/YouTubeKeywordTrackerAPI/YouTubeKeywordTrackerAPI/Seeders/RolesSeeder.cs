using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Exceptions;
using YouTubeKeywordTrackerAPI.Seeders.Interfaces;

namespace YouTubeKeywordTrackerAPI.Seeders;

public class RolesSeeder : IDataSeeder<Role>
{
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    public RolesSeeder(YouTubeKeywordTrackerDbContext context)
    {
        _dbContext = context;
    }

    public void Seed()
    {
        if (!_dbContext.Database.CanConnect())
        {
            throw new DatabaseConnectionException("Cannot connect with database");
        }

        if (!_dbContext.Roles.Any())
        {
            var roles = GetRoles();
            _dbContext.Roles.AddRange(roles);
            _dbContext.SaveChanges();
        }
    }
    private IEnumerable<Role> GetRoles()
    {
        var roles = new List<Role>()
        {
            new Role()
            {
                Name = "User",
            },
            new Role()
            {
                Name = "Admin"
            }
        };
        return roles;
    }
}
