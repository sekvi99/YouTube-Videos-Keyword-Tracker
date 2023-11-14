﻿using YouTubeKeywordTrackerAPI.Services.Interfaces;

namespace YouTubeKeywordTrackerAPI.Services
{
    public class ConfigurationService : IApplicationConfiguration
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionStringPath = "localhost";
        public ConfigurationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GetConnectionString()
        {
            return _configuration.GetConnectionString(_connectionStringPath);
        }
    }
}