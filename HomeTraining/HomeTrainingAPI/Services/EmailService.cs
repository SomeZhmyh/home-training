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
        //#TODO подкинуть IConfiguration в ctor; добавить в IConf почту и пароль приложения 
        public int SendConfirmCode(string email)
        {
            int code = Random.Shared.Next(1111, 9999);
            /*#TODO оформить отправку письма
            // отправитель - устанавливаем адрес и отображаемое в письме имя
            MailAddress from = new MailAddress("somemail@gmail.com", "Tom");
            // кому отправляем
            MailAddress to = new MailAddress("somemail@yandex.ru");
            // создаем объект сообщения
            MailMessage m = new MailMessage(from, to);
            // тема письма
            m.Subject = "Тест";
            // текст письма
            m.Body = "<h2>Письмо-тест работы smtp-клиента</h2>";
            // письмо представляет код html
            m.IsBodyHtml = true;
            // адрес smtp-сервера и порт, с которого будем отправлять письмо
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            // логин и пароль используя IConfiguration
            smtp.Credentials = new NetworkCredential("somemail@gmail.com", "mypassword");
            smtp.EnableSsl = true;
            smtp.Send(m);
            */
            return code;
        }
    }
}
