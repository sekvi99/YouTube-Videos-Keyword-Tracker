using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models.Authentication.Roles;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication.Roles;

namespace YouTubeKeywordTrackerAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class RolesController : ControllerBase
{
    private readonly IRoleService _roleService;
    public RolesController(IRoleService roleService)
    {
        _roleService = roleService;
    }
    [HttpPost]
    public async Task<ActionResult> CreateRole([FromBody] RoleCreateDto role)
    {
        await _roleService.CreateRole(role);
        return Ok();
    }
    [HttpGet("{roleId}")]
    public async Task<ActionResult<RoleDto>> GetRole(int roleId)
    {
        var role = await _roleService.GetRole(roleId);
        return Ok(role);
    }
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<RoleDto>>> GetAllRoles()
    {
        var roles = await _roleService.GetRoles();
        return Ok(roles);
    }
    [HttpPut("{roleId}")]
    public async Task<ActionResult> UpdateRole([FromBody] RoleUpdateDto role, int roleId)
    {
        await _roleService.UpdateRole(role, roleId);
        return Ok();
    }
    [HttpDelete("{roleId}")]
    public async Task<ActionResult> DeleteRole(int roleId)
    {
        await _roleService.DeleteRole(roleId);
        return Ok();
    }
}
