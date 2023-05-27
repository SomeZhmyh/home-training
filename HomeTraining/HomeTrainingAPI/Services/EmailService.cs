using System.Net;
using System.Net.Mail;

namespace HomeTrainingAPI.Services
{
    public class EmailService: IEmailService
    {
        private string _email;
        private string _password;
        public EmailService(IConfiguration configuration)
        {
            _email = configuration["EmailSender:Address"];
            _password = configuration["EmailSender:Password"];
        }

        public int SendConfirmCode(string email)
        {
            int code = Random.Shared.Next(10000, 99999);
            //#TODO оформить отправку письма
            // отправитель - устанавливаем адрес и отображаемое в письме имя
            MailAddress from = new MailAddress(_email, "Yor fren");
            // кому отправляем
            MailAddress to = new MailAddress(email);
            // создаем объект сообщения
            MailMessage m = new MailMessage(from, to);
            // тема письма
            m.Subject = "Код подтверждения";
            // текст письма
            m.Body = @$"<h2>Ваш код подтверждения для регистрации в системе Домашний Тренер:</h2>
                <h1>{code}</h1>";
            // письмо представляет код html
            m.IsBodyHtml = true;
            // адрес smtp-сервера и порт, с которого будем отправлять письмо
            SmtpClient smtp = new SmtpClient("smtp.mail.ru", 465);
            // логин и пароль используя IConfiguration
            smtp.Credentials = new NetworkCredential(_email, _password);
            smtp.EnableSsl = true;
            smtp.SendMailAsync(m);
            
            return code;
        }
    }
}
