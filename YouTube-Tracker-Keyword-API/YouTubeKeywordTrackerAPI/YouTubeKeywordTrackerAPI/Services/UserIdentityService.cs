using System.Security.Claims;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication;

namespace YouTubeKeywordTrackerAPI.Services;

public class UserIdentityService : IUserIdentityService
{
    private readonly IHttpContextAccessor _contextAccessor;
    public UserIdentityService(IHttpContextAccessor httpContextAccessor)
    {
        _contextAccessor = httpContextAccessor;
    }
    public int GetUserId()
    {
        var userIdClaim = _contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim != null && int.TryParse(userIdClaim, out var userId))
        {
            return userId;
        }

        throw new InvalidOperationException("Unable to retrieve UserId from the current user claims.");
    }
}
