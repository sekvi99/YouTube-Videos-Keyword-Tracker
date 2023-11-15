namespace YouTubeKeywordTrackerAPI.Models;

public class SearchKeywordDto
{
    public int Id { get; set; }
    public string Keyword { get; set; }

    public override bool Equals(object? obj)
    {
        if (obj is SearchKeywordDto other)
        {
            return this.Keyword == other.Keyword;
        }
        return false;
    }

    public override int GetHashCode()
    {
        return Keyword.GetHashCode();
    }
}
