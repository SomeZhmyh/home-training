namespace HomeTrainingAPI.Services
{
    public interface IEmailService
    {
        public int SendConfirmCode(string email);
    }
}
