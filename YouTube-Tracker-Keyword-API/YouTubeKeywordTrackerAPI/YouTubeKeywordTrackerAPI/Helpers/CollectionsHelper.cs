using YouTubeKeywordTrackerAPI.Models;

namespace YouTubeKeywordTrackerAPI.Helpers;

public class CollectionsHelper<T>
{
    public static CollectionModel<T> CombineCollection(IEnumerable<CollectionModel<T>> collection)
    {
        var combinedItems = collection.SelectMany(c => c.Items);

        return new CollectionModel<T>
        {
            Items = combinedItems,
            Count = combinedItems.Count()
        };
    }
}
