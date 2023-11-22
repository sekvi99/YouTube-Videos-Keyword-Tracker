using Microsoft.EntityFrameworkCore;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Models.Authentication.Roles;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication.Roles;
using YouTubeKeywordTrackerAPI.Exceptions;
using AutoMapper;

namespace YouTubeKeywordTrackerAPI.Services;

public class RolesService : IRoleService
{
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    private readonly ILogger<IRoleService> _logger;
    private readonly IMapper _mapper;
    public RolesService(YouTubeKeywordTrackerDbContext context, ILogger<IRoleService> logger, IMapper mapper)
    {
        _dbContext = context;
        _logger = logger;
        _mapper = mapper;
    }
    private async Task<Role> GetRoleById(int roleId)
    {
        _logger.LogInformation($"Extracting role with ID: {roleId}");
        var existingRole = await _dbContext
            .Roles
            .FirstOrDefaultAsync(r => r.Id == roleId);
        return existingRole;
    }
    public async Task CreateRole(RoleCreateDto role)
    {
        _logger.LogInformation($"Trying to create role with name: {role.Name}");
        var existingRoleName = await _dbContext
            .Roles
            .FirstOrDefaultAsync(r => r.Name == role.Name);

        if (existingRoleName != null)
        {
            _logger.LogError($"Role with name: {role.Name} already exist");
            throw new ResourceAlreadyExistException($"Role with provided name: {role.Name} already exist");
        }

        var mappedRole = _mapper.Map<RoleCreateDto, Role>(role);

        await _dbContext.Roles.AddAsync(mappedRole);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteRole(int roleId)
    {
        _logger.LogInformation($"Deleting role with ID: {roleId}");
        var existingRole = await GetRoleById(roleId);

        if (existingRole == null)
        {
            _logger.LogError($"Role with provided ID: {roleId} does not exist in the system");
            throw new ResourceNotFoundException($"Role with ID: {roleId} not found");
        }

        _dbContext.Roles.Remove(existingRole);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<RoleDto> GetRole(int roleId)
    {
        _logger.LogInformation($"Extracting role with ID: {roleId}");
        var existingRole = await GetRoleById(roleId);

        if (existingRole == null) 
        {
            _logger.LogError($"Role with provided ID: {roleId} does not exist in the system");
            throw new ResourceNotFoundException($"Role with ID: {roleId} not found");
        }

        return _mapper.Map<Role, RoleDto>(existingRole);
    }

    public async Task<IEnumerable<RoleDto>> GetRoles()
    {
        _logger.LogInformation($"Extracting every role from database");
        var existingRoles = await _dbContext
            .Roles
            .ToListAsync();

        return _mapper.Map<IEnumerable<RoleDto>>(existingRoles);
    }

    public async Task UpdateRole(RoleUpdateDto role, int roleId)
    {
        _logger.LogInformation($"Updating role with ID: {roleId}");
        var existingRole = await GetRoleById(roleId);

        if (existingRole == null)
        {
            _logger.LogError($"Role with ID: {roleId} does not exist in the sytem");
            throw new ResourceNotFoundException($"Role with ID: {roleId} does not exist in the system");
        }

        if (!string.IsNullOrEmpty(role.Name))
        {
            existingRole.Name = role.Name;
            await _dbContext.SaveChangesAsync();
        }
    }
}
