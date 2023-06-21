namespace HomeTrainingAPI.Models
{
    public class ExercisesModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int[]? CategoryIds { get; set; }
        public string[]? CategoryNames { get; set; }
    }
    
}
