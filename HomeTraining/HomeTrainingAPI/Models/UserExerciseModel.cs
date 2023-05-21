namespace HomeTrainingAPI.Models;

public class UserExercisesModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ExerciseId { get; set; }
    public DateTime Date { get; set; }
    public float Weight { get; set; }
    public int Count { get; set; }
    public float MinutesElapsed { get; set; }
}