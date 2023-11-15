using Microsoft.EntityFrameworkCore;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Helpers;

namespace YouTubeKeywordTrackerAPI.Entities;

public class YouTubeKeywordTrackerDbContext : DbContext
{
    private readonly IApplicationConfiguration _applicationConfiguration;
    public DbSet<User> Users { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<SearchKeyword> Keywords { get; set; }
    public YouTubeKeywordTrackerDbContext(IApplicationConfiguration _configuration)
    {
        _applicationConfiguration = _configuration;
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Users
        modelBuilder.Entity<User>()
            .Property(user => user.Username)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(user => user.PasswordHash)
            .IsRequired();

        // Keywords
        modelBuilder.Entity<SearchKeyword>()
            .Property(keyword => keyword.Keyword)
            .IsRequired();

        // Addresses
        modelBuilder.Entity<Address>()
            .Property(address => address.City)
            .IsRequired();
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_applicationConfiguration.GetConnectionString());
    }
}
