using System.Data;
using Dapper;
using HomeTrainingAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeTrainingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProgramController : ControllerBase
    {
        private string _connectionString;
        public ProgramController(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        [HttpGet("/get-program-by-userId/{id}")]
        public ActionResult<List<ProgramModel>> GetProgram(int id)
        {
            string query = $@"SELECT ""Program"".""Id"", ""Program"".""Name"",
            ""Program"".""UserId"" AS ""UserId""
            FROM ""Program"" 
WHERE ""UserId""={id}";

            List<ProgramModel> res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<ProgramModel>(query).ToList();
            }
            return Ok(res);
        }

        [HttpPost("/add-program")]
        public ActionResult<bool> AddProgram(ProgramModel model)
        {
            string query = $@"INSERT INTO public.""Program""(
             ""Id"", ""UserId"", ""Name"")
	         VALUES(default, {model.UserId}, '{model.Name}') 
             ";

            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                db.Query(query).FirstOrDefault();
            }
            return Ok(true);
        }

        [HttpPost("/add-program-exercise/{programId}/{exerciseId}")]
        public ActionResult AddExerciseProgram(int programId, int exerciseId)
        {
            string query = $@" INSERT INTO public.""ProgramExercise""(
            ""Id"", ""ProgramId"", ""ExerciseId"")
            VALUES (default, {programId}, {exerciseId})";
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                db.Query(query).FirstOrDefault();
            }
            return Ok();
        }

        [HttpGet("/get-program-exercises/{programId}")]
        public ActionResult<List<ExercisesModel>> GetProgramExercises (int programId)
        {
            string query = $@" SELECT ""Exercise"".""Id"", ""Exercise"".""Name"", ""Exercise"".""Description"", ""Exercise"".""Image""
            FROM ""Exercise"" 
  INNER JOIN ""ProgramExercise"" ON ""Exercise"".""Id"" = ""ProgramExercise"".""ExerciseId""
  WHERE ""ProgramExercise"".""ProgramId"" ={programId}

";
            List<ExercisesModel> res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<ExercisesModel>(query).ToList();
            }
            return Ok(res);
        }

        //[HttpDelete("/{programId}/{ex id}")]    //TODO настроить каскадное удаление
        //[HttpDelete("/{programId}")] //только кастомные пользовательские; TODO настроить каскадное удаление



    }
}
