using Microsoft.AspNetCore.Identity;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Seeders;
using YouTubeKeywordTrackerAPI.Seeders.Interfaces;
using YouTubeKeywordTrackerAPI.Services;
using YouTubeKeywordTrackerAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using YouTubeKeywordTrackerAPI.Mapper;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<YouTubeKeywordTrackerDbContext>();
builder.Services.AddScoped<ITokenGenerator, TokenGeneratorService>();
builder.Services.AddTransient<IApplicationConfiguration, ConfigurationService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<ISearchKeywordService, SearchKeywordService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IDataSeeder<User>, UsersSeeder>();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(YouTubeKeywordTrackerMappingProfile)); // New version of autoMapper conf
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("OaLIFe6SJsfThn5wV8jZ6zl2PwdwHVeD")), // TODO Change to key extracted from service
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    var seeder = serviceProvider.GetRequiredService<IDataSeeder<User>>();
    seeder.Seed();
}

app.Run();
