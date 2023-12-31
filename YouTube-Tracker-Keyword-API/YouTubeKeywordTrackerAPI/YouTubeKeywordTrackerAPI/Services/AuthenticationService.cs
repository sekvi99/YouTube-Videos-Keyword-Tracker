﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Exceptions;
using YouTubeKeywordTrackerAPI.Models.Authentication;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Helpers;

namespace YouTubeKeywordTrackerAPI.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    private readonly ITokenGenerator _tokenGenerator;
    private readonly ILogger<AuthenticationService> _logger;
    private readonly IMapper _mapper;
    private readonly IUserIdentityService _userIdentityService;

    public AuthenticationService(IPasswordHasher<User> passwordHasher, YouTubeKeywordTrackerDbContext dbContext, ITokenGenerator tokenGenerator, ILogger<AuthenticationService> logger, IMapper mapper, IUserIdentityService userIdentityService)
    {
        _passwordHasher = passwordHasher;
        _dbContext = dbContext;
        _tokenGenerator = tokenGenerator;
        _logger = logger;
        _mapper = mapper;
        _userIdentityService = userIdentityService;
    }
    private async Task<User> GetUser(UserRegistrationDto model)
    {
        var existingUser = await _dbContext
            .Users
            .FirstOrDefaultAsync(u => u.Username == model.Username);

        return existingUser;
    }
    public async Task<UserLoginSuccessDto> Login(UserLoginDto user)
    {
        _logger.LogInformation($"Performing login operation for user: {user.Username}");
        var userFromRepo = await _dbContext
            .Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Username == user.Username);

        if (userFromRepo is null)
        {
            throw new ResourceNotFoundException("User with provided username does not exist");
        }

        if (_passwordHasher.VerifyHashedPassword(userFromRepo, userFromRepo.PasswordHash, user.Password) == PasswordVerificationResult.Success)
        {
            var token = _tokenGenerator.GenerateJwtToken(userFromRepo);
            return new UserLoginSuccessDto()
            {
                Username = userFromRepo.Username,
                RoleId = userFromRepo.RoleId,
                Token = token
            };
        }
        else
        {
            throw new UnauthorizedAccessException("Wrong Username or Password");
        }
    }
    public async Task Register(UserRegistrationDto user)
    {
        _logger.LogInformation($"Performing register operation for user: {user.Username}");
        var existingUser = await GetUser(user);

        if (existingUser == null)
        {
            var newUser = new User
            {
                Username = user.Username,
                DateCreated = DateTime.UtcNow,
                PasswordHash = _passwordHasher.HashPassword(null, user.Password),
                Address = new Address()
                {
                    City = user.City,
                    Street = user.Street,
                    PostalCode = user.PostalCode,
                },
                RoleId = user.RoleId,
            };

            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            throw new ResourceAlreadyExistException("User with provided username already exist");
        }
    }
    public async Task<IEnumerable<UserDto>> GetAllUsers()
    {
        _logger.LogInformation($"Extracting all current users from database");
        var existingUsers = await _dbContext
            .Users
            .Include(user => user.Address)
            .Include(user => user.Keywords)
            .ToListAsync();

        var userDtos = _mapper.Map<List<UserDto>>(existingUsers);
        return userDtos;
    }
    public async Task UpdateUserCredentials(int userId, UserUpdateDto user)
    {
        _logger.LogInformation($"Performing update operation for user with ID: {userId}");
        var userToUpdate = await _dbContext.Users.Include(u => u.Address).FirstOrDefaultAsync(u => u.Id == userId);

        if (userToUpdate == null)
        {
            throw new ResourceNotFoundException($"User with ID: {userId} does not exist in the system");
        }

        if (!string.IsNullOrEmpty(user.Username))
        {
            userToUpdate.Username = user.Username;
            userToUpdate.DateModified = DateTime.UtcNow;
        }

        if (!string.IsNullOrEmpty(user.City) || !string.IsNullOrEmpty(user.PostalCode) || !string.IsNullOrEmpty(user.Street))
        {
            if (userToUpdate.Address == null)
            {
                userToUpdate.Address = new Address();
                userToUpdate.Address.DateCreated = DateTime.UtcNow;
            }

            userToUpdate.Address.City = user.City ?? userToUpdate.Address.City;
            userToUpdate.Address.Street = user.Street ?? userToUpdate.Address.Street;
            userToUpdate.Address.PostalCode = user.PostalCode ?? userToUpdate.Address.PostalCode;
            userToUpdate.Address.DateCreated = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync();
    }
    public async Task Delete(int userId)
    {
        _logger.LogInformation($"Deleting user with ID: {userId}");
        var userToDelete = await _dbContext.Users.FindAsync( userId );

        if (userToDelete == null)
        {
            throw new ResourceNotFoundException($"User with ID: {userId} does not exist in the system");
        }

        _dbContext.Users.Remove(userToDelete);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateUserPassword(UserUpdatePasswordDto user)
    {
        var currentUserId = _userIdentityService.GetUserId();
        _logger.LogInformation($"Updating password for user with ID: {currentUserId}");

        var currentuser = await _dbContext
            .Users
            .FindAsync(currentUserId);

        if (currentuser == null)
        {
            throw new ResourceNotFoundException($"User with ID: {currentUserId} does not exist at system");
        }

        currentuser.PasswordHash = _passwordHasher.HashPassword(null, user.NewPassword);
        currentuser.DateModified = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
    }
}
