using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Models.Authentication;
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
    private async Task<User> GetUser(UserRegistrationDto model)
    {
        var existingUser = await _dbContext
            .Users
            .FirstOrDefaultAsync(u => u.Username == model.Username);

        return existingUser;
    }
    public async Task<string> Login(UserLoginDto user)
    {
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
            // To Do Implement Custom Exception
            //throw new ResourceExistException("User with given name already exist");
        }
    }
}
