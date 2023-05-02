namespace HomeTrainingAPI.Models

{
    public class GetLoginResponse
    {
        public string Login { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
    }
}
