using System.Data;
using Dapper;
using HomeTrainingAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeTrainingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserExerciseController : ControllerBase
    {
        private string _connectionString;
        public UserExerciseController(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        [HttpGet("/get-set/{id}/{date}")]
        public ActionResult<List<UserExercisesModel>> GetSet(int id, DateTime date)
        {
            string stringDate = $"{date.Year}-{date.Month}-{date.Day}";
            string query = $@"SELECT ""UserExercise"".""Id"", ""UserExercise"".""UserId"", ""UserExercise"".""ExerciseId"",
            ""UserExercise"".""Date"", ""UserExercise"".""Weight"", ""UserExercise"".""Count"",
			""UserExercise"".""MinutesElapsed""
            FROM ""UserExercise""
            INNER JOIN ""User"" ON ""User"".""Id"" = ""UserExercise"".""UserId""
            INNER JOIN ""Exercise"" ON ""Exercise"".""Id"" = ""UserExercise"".""ExerciseId""
            WHERE ""Exercise"".""Id"" ={id} AND ""UserExercise"".""Date"" = '{stringDate}' ";

            List<UserExercisesModel> res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<UserExercisesModel>(query).ToList();
            }
            return Ok(res);
        }

        [HttpPost("/add-set")]

        public void AddSet(UserExercisesModel model)
        {
            string query = $@"INSERT INTO public.""UserExercise""(
             ""UserId"", ""ExerciseId"", ""Date"", ""Weight"", ""Count"", ""MinutesElapsed"")
             VALUES({model.UserId}, {model.ExerciseId}, '{model.Date}', {model.Weight}, {model.Count}, {model.MinutesElapsed} )";

            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                db.Query(query).FirstOrDefault();
            }
        }

        [HttpDelete("/delete-set/{id}")]
        public void DeleteSet(int id)
        {
            string query = $@"DELETE FROM public.""UserExercise""
             WHERE ""Id"" = {id}";

            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                db.Query(query).FirstOrDefault();
            }
        }

        [HttpPut("/update-set/{id}")]
        public void UpdateSet(int id, UserExercisesModel model)
        {
            string query = $@"UPDATE public.""UserExercise""
            SET ""Weight"" = {model.Weight}, ""Count"" = {model.Count}, ""MinutesElapsed"" = {model.MinutesElapsed}
            WHERE ""Id"" = {id}"; 

            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                db.Query(query).FirstOrDefault();
            }
        }
    }
}
