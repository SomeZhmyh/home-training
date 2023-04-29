using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using HomeTrainingAPI;
using System.Net.Mail;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string _connectionString;
        public UserController(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }
        [HttpPost("/login")]
        public GetLoginResponse Login(LoginModel model)
        {
            string querry = $@"
            
            SELECT ""User"".""Username"" AS ""Login"", '' AS ""Token"", array_agg(""Role"".""Name"") AS ""Roles""
            FROM ""User""
            INNER JOIN ""UserRole"" ON ""User"".""Id"" = ""UserRole"".""UserId""
            INNER JOIN ""Role"" ON ""Role"".""Id"" = ""UserRole"".""RoleId""
            WHERE ""User"".""Username"" = '{model.Username}' AND ""User"".""Password"" = '{model.Password}'
            GROUP BY ""User"".""Username""            
            ";
            GetLoginResponse res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<GetLoginResponse>(querry).FirstOrDefault();
            }

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, model.Username) };
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            res.Token = new JwtSecurityTokenHandler().WriteToken(jwt);
            return res;
        }

        [Authorize]
        [HttpGet("/data")]
        public string GetData()
        {
            return "Hello World!";
        }

        [HttpPost("/register")]
        public void Register(RegisterModel registerModel)
        {
            int code = 0; //#TODO сюда вернуть EmailService.SendConfirmCode()
            string querry = $@"
            
            INSERT INTO ""User"" (""Username"", ""Password"", ""Email"", ""EmailConfirmed"", ""ConfirmCode"")
            VALUES ('{registerModel.Username}', '{registerModel.Password}', '{registerModel.Email}', false, {code})  
            RETURNING ""Id"";
            ";
            int id;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                id = db.Query<int>(querry).FirstOrDefault();
            }

            querry = $@"
            INSERT INTO ""UserRole"" (""UserId"", ""RoleId"")
            VALUES ({id}, 3);
            ";

            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                db.Query(querry);
            }
        }
        public class RegisterModel
        {
            public string Username {get; set;}
            public string Password {get; set;}
            public string Email {get; set;}

        }
        public class LoginModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        public class EmailService
        {
            //#TODO подкинуть IConfiguration в ctor; добавить в IConf почту и пароль приложения 
            public int SendConfirmCode(string email)
            {
                int code = Random.Shared.Next(1111, 99999);
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
}
