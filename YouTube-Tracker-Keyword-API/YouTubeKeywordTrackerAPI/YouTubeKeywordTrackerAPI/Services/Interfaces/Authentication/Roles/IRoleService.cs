using YouTubeKeywordTrackerAPI.Models.Authentication.Roles;

namespace YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication.Roles;

public interface IRoleService
{
    public Task<RoleDto> GetRole(int roleId);
    public Task CreateRole(RoleCreateDto role);
    public Task UpdateRole(RoleUpdateDto role, int roleId);
    public Task DeleteRole(int roleId);
    public Task<IEnumerable<RoleDto>> GetRoles();
}
