namespace YouTubeKeywordTrackerAPI.Entities;

public class Address : Entity
{
    public int Id { get; set; }
    public string City { get; set; }
    public string? Street { get; set; }
    public string? PostalCode { get; set; }
    public int UserId { get; set; }
    // Table Reference
    public User User { get; set; }
}
