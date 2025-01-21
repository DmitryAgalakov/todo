using Core.Models;

namespace Core.Abstractions;

public interface IJobsRepository
{
    Task<List<Job>> Get();
    Task<Job> Create(Job job);
    Task<Job?> Update(Guid id, string title, string description, double updated, bool completed);
    Task<Guid> Delete(Guid id);
}
