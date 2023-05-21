namespace HomeTrainingAPI.Models

{
    public class GetLoginResponseModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string[] Roles { get; set; }
    }
}
