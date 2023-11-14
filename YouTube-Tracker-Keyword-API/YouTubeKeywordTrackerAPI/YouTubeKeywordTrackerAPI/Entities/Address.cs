namespace YouTubeKeywordTrackerAPI.Entities;

public class Address : Entity
{
    public int Id { get; set; }
    public string City { get; set; }
    public string? Street { get; set; }
    public string? PostalCode { get; set; }

    // Table Reference
    public virtual User User { get; set; }
}
