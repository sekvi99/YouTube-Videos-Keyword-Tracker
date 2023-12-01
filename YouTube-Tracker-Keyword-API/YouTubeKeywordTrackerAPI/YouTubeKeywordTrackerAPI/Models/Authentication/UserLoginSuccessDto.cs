namespace YouTubeKeywordTrackerAPI.Models.Authentication
{
    public class UserLoginSuccessDto
    {
        public string Username { get; set; }
        public int RoleId { get; set; }
        public string Token { get; set; }
    }
}
