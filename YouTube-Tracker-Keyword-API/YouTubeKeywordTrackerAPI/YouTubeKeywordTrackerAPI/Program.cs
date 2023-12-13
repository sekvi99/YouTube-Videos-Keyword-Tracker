using Microsoft.AspNetCore.Identity;
using YouTubeKeywordTrackerAPI.Entities;
using YouTubeKeywordTrackerAPI.Seeders;
using YouTubeKeywordTrackerAPI.Seeders.Interfaces;
using YouTubeKeywordTrackerAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using YouTubeKeywordTrackerAPI.Mapper;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Data;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Helpers;
using Microsoft.OpenApi.Models;
using YouTubeKeywordTrackerAPI.Middleware;
using YouTubeKeywordTrackerAPI.Services.Interfaces.ExternalDataService;
using NLog.Web;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Authentication.Roles;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Email;
using MailKit;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Raport;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<YouTubeKeywordTrackerDbContext>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<HttpClient>();
// builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IMailConfig, MailConfigService>();
builder.Services.AddScoped<IRaportService, RaportService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ITokenGenerator, TokenGeneratorService>();
builder.Services.AddScoped<IUserIdentityService, UserIdentityService>();
builder.Services.AddTransient<IApplicationConfiguration, ConfigurationService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IRoleService, RolesService>();
builder.Services.AddScoped<ISearchKeywordService, SearchKeywordService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IDataSeeder<User>, UsersSeeder>();
builder.Services.AddScoped<IDataSeeder<Role>, RolesSeeder>();
builder.Services.AddScoped<IYouTubeApiKeywordService,  YouTubeApiKeywordService>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();
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
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TutoringSystemAPI", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
            });
});

builder.Logging.ClearProviders();
builder.WebHost.UseNLog();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:4200") // Adjust this to match your frontend origin
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowSpecificOrigin");

// Register custom middlewares
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    var seeder = serviceProvider.GetRequiredService<IDataSeeder<Role>>();
    seeder.Seed();
}

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    var seeder = serviceProvider.GetRequiredService<IDataSeeder<User>>();
    seeder.Seed();
}

app.Run();
