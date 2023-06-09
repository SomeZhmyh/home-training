﻿using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HomeTrainingAPI.Models;
using HomeTrainingAPI;

using System.Net.Mail;
using HomeTrainingAPI.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string _connectionString;
        private IEmailService _emailService;
        public UserController(IConfiguration configuration, IEmailService emailService)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
            _emailService = emailService;
        }
        [HttpPost("/login")]
        public GetLoginResponseModel Login(LoginModel model)
        {
            string querry = $@"
            
            SELECT ""User"".""Id"", ""User"".""Username"", '' AS ""Token"", array_agg(""Role"".""Name"") AS ""Roles""
            FROM ""User""
            INNER JOIN ""UserRole"" ON ""User"".""Id"" = ""UserRole"".""UserId""
            INNER JOIN ""Role"" ON ""Role"".""Id"" = ""UserRole"".""RoleId""
            WHERE ""User"".""Username"" = '{model.Username}' AND ""User"".""Password"" = '{model.Password}'
            GROUP BY ""User"".""Id"", ""User"".""Username""            
            ";
            GetLoginResponseModel res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<GetLoginResponseModel>(querry).FirstOrDefault();
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
            int code = _emailService.SendConfirmCode(registerModel.Email); 
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

        [HttpPost("/confirmEmail")]
        public bool ConfirmEmail(RegisterModel confirmEmailModel)
        {
            int id =0;
            string querry = $@"
            UPDATE ""User"" SET ""EmailConfirmed"" = true
            WHERE ""ConfirmCode""={confirmEmailModel.ConfirmCode}
            AND ""Email""='{confirmEmailModel.Email}'
            AND ""Password""='{confirmEmailModel.Password}'
            RETURNING ""Id"";
            ";

            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                id = db.Query<int>(querry).FirstOrDefault();
            }
            if (id == 0)
                return false;
            return true;
        }
    }
}
