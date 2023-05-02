namespace HomeTrainingAPI.Models
{
    public class ConfirmEmailModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmCode { get; set; }
    }
}
