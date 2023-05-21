using System.Data;
using Dapper;
using HomeTrainingAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeTrainingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private string _connectionString;
        public CategoryController(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }


        [HttpGet("/category")]
        public ActionResult<List<CategoryModel>> GetCategory()
        {
            string query = $@"SELECT ""Category"".""Id"", ""Category"".""Name"", ""Category"".""Image"",""Category"".""Description""
            FROM ""Category"" ";

            List<CategoryModel> res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<CategoryModel>(query).ToList();
            }
            return Ok(res);
        }

        [HttpPost("/category")]
        public void PostCategory(CategoryModel model)
        {
            string query = $@"INSERT INTO public.""Category""(
            ""Id"", ""Name"", ""Description"", ""Image"")
	        VALUES(default, '{model.Name}', '{model.Description}', '{model.Image}')";

            bool res;
            using (IDbConnection db = new Npgsql.NpgsqlConnection(_connectionString))
            {
                res = db.Query<bool>(query).FirstOrDefault();
            }
        }

    }
}
