namespace Application.Models.Helpers
{
    public class AuthenticationServiceOptions
    {
        public const string AuthenticationService = "AuthenticationService";
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string SecretForKey { get; set; } = string.Empty;
    }
}