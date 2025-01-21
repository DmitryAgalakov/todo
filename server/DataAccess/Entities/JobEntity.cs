
namespace DataAccess.Entities;

public class JobEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Created { get; set; }
    public double Updated { get; set; }
    public bool Completed { get; set; }

}