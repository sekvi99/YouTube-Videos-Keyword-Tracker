namespace YouTubeKeywordTrackerAPI.Models;

public class CollectionModel<T>
{
    public int Count { get; set; }
    public IEnumerable<T> Items { get; set; }
}
