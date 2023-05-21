using Microsoft.AspNetCore.Mvc;

namespace HomeTrainingAPI.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

    }
}
