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

    public AuthenticationService(IPasswordHasher<User> passwordHasher, YouTubeKeywordTrackerDbContext dbContext, ITokenGenerator tokenGenerator, ILogger<AuthenticationService> logger)
    {
        _passwordHasher = passwordHasher;
        _dbContext = dbContext;
        _tokenGenerator = tokenGenerator;
        _logger = logger;

    }
    private async Task<User> GetUser(UserRegistrationDto model)
    {
        var existingUser = await _dbContext
            .Users
            .FirstOrDefaultAsync(u => u.Username == model.Username);

        return existingUser;
    }
    public async Task<string> Login(UserLoginDto user)
    {
        _logger.LogInformation($"Performing login operation for user: {user.Username}");
        var userFromRepo = await _dbContext
            .Users
            .FirstOrDefaultAsync(u => u.Username == user.Username);

        if (userFromRepo is null)
        {
            // TODO Change to custom exception
            throw new Exception("User with provided username does not exist");
        }

        if (_passwordHasher.VerifyHashedPassword(userFromRepo, userFromRepo.PasswordHash, user.Password) == PasswordVerificationResult.Success)
        {
            var token = _tokenGenerator.GenerateJwtToken(userFromRepo);
            return token;
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
                PasswordHash = _passwordHasher.HashPassword(null, user.Password),
                Address = new Address()
                {
                    City = user.City,
                    Street = user.Street,
                    PostalCode = user.PostalCode,
                }
            };

            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            throw new ResourceAlreadyExistException("User with provided username already exist");
        }
    }
}
