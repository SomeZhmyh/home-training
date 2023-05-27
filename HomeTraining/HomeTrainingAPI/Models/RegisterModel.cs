namespace HomeTrainingAPI.Models
{
    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int ConfirmCode { get; set; }

    }
}
