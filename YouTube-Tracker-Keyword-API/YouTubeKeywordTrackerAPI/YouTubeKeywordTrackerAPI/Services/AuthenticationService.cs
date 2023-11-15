using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Models;
using YouTubeKeywordTrackerAPI.Services.Interfaces;

namespace YouTubeKeywordTrackerAPI.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly YouTubeKeywordTrackerDbContext _dbContext;
    private readonly ITokenGenerator _tokenGenerator;

    public AuthenticationService(IPasswordHasher<User> passwordHasher, YouTubeKeywordTrackerDbContext dbContext, ITokenGenerator tokenGenerator)
    {
        _passwordHasher = passwordHasher;
        _dbContext = dbContext;
        _tokenGenerator = tokenGenerator;

    }
    private async Task<User> GetUser(UserDto model)
    {
        var existingUser = await _dbContext
            .Users
            .FirstOrDefaultAsync(u => u.Username == model.Username);

        return existingUser;
    }
    public async Task<string> Login(UserDto model)
    {
        var existingUser = await GetUser(model);
        if (existingUser == null)
        {
            // To Do Implement Custom Exception
            // throw new NotFoundException("User with provided UserName does not exist in database");
        }

        if (_passwordHasher.VerifyHashedPassword(existingUser, existingUser.PasswordHash, model.PasswordHash) == PasswordVerificationResult.Success)
        {
            var token = _tokenGenerator.GenerateJwtToken(existingUser);
            return token;
        }
        else
        {
            throw new UnauthorizedAccessException("Wrong Username or Password");
        }
    }
    public async Task Register(UserDto model)
    {
        var existingUser = await GetUser(model);

        if (existingUser == null)
        {
            var user = new User
            {
                Username = model.Username,
                PasswordHash = _passwordHasher.HashPassword(null, model.PasswordHash),
                Address = new Address()
                {
                    City = model.City,
                    Street = model.Street,
                    PostalCode = model.PostalCode,
                }
            };

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            // To Do Implement Custom Exception
            //throw new ResourceExistException("User with given name already exist");
        }
    }
}
