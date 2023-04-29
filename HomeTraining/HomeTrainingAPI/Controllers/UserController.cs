﻿using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using HomeTrainingAPI;


namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        string _connectionString;
        public UserController(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }
        [HttpGet("/login/{username}")]
        public GetLoginResponse Login(string username)
        {
            string querry = $@"
            
            SELECT ""Users"".""Username"", """", array_agg(""Role"".""Name"")
            FROM ""Users""
            INNER JOIN ""UserRole"" ON ""User"".""Id"" = ""UserRole"".""UserId""
            INNER JOIN ""Role"" ON ""Role"".""Id"" = ""UserRole"".""RoleId""
            GROUP BY ""Users"".""Username""            
            ";
            GetLoginResponse res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<GetLoginResponse>(querry).FirstOrDefault();
            }

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, username) };
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
string querry = $@"
            
            INSERT INTO ""User"" (""Username"", ""Password"", ""Email"", ""EmailConfirmed"", ""ConfirmCode"")
            VALUES ({registerModel.Username}, {registerModel.Password}, {registerModel.Email}, false, 0)  
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
    }
}