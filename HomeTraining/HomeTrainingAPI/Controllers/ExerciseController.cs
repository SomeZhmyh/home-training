using System.Data;
using Dapper;
using HomeTrainingAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeTrainingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ExerciseController : ControllerBase
    {
        private string _connectionString;
        public ExerciseController(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        [HttpPost("/exercise/{userId}")]
        public ActionResult<bool> AddExercise(int userId, ExercisesModel model)
        {
            string query = $@"INSERT INTO public.""Exercise""(

    ""Id"", ""Name"", ""Description"", ""Image"", ""UserId"")
	VALUES(default, '{model.Name}', '{model.Description}', '{model.Image}', {userId})
    RETURNING ""Id""";
            int exerciseId;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                exerciseId = db.Query<int>(query).FirstOrDefault();
            }
          

            foreach(int categoryId in model.CategoryIds)
            {
                query = $@"INSERT INTO public.""ExerciseCategory""(

    ""Id"", ""ExerciseId"", ""CategoryId"")
	VALUES(default, {exerciseId}, {categoryId})
    RETURNING ""Id""";
                using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
                {
                    db.Query<int>(query).FirstOrDefault();
                }
            }

            
            return Ok(true);
        } 
        
        [HttpGet("/exercise/{userId}")]
        public ActionResult<List<ExercisesModel>> GetExercises(int userId)
        {
            string query = $@"SELECT ""Exercise"".""Id"", ""Exercise"".""Name"", ""Exercise"".""Image"",""Exercise"".""Description"",
array_agg(""Category"".""Id"") AS ""CategoryIds"", array_agg(""Category"".""Name"") AS ""CategoryNames""
            FROM ""Exercise""
            LEFT JOIN ""ExerciseCategory"" ON ""Exercise"".""Id"" = ""ExerciseCategory"".""ExerciseId""
            LEFT JOIN ""Category"" ON ""Category"".""Id"" = ""ExerciseCategory"".""CategoryId""
            WHERE ""Exercise"".""UserId"" = {userId} OR ""Exercise"".""UserId"" = 0
            GROUP BY ""Exercise"".""Id"", ""Exercise"".""Name"", ""Exercise"".""Image"",""Exercise"".""Description""   
            "      ;

            List<ExercisesModel> res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<ExercisesModel>(query).ToList();
            }
            return Ok(res);
        }
    }
}
