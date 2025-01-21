namespace Core.Models;


public class Job(Guid id, string title, string description, double created, double updated, bool completed)
{
    public Guid Id { get; } = id;
    public string Title { get; } = title;
    public string Description { get; set; } = description;
    public double Created { get; set; } = created;
    public double Updated { get; set; } = updated;
    public bool Completed { get; set; } = completed;



    public static (Job? job, string? error) Create(Guid id, string title, string description, double created, double updated, bool completed)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return (null, "Поле title объекта Job пустое.");
        }


        return (new Job(id, title, description, created, updated, completed), null);
    }



}
