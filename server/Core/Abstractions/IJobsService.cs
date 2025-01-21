using Core.Models;

namespace Core.Abstractions;

public interface IJobsService
{
    Task<List<Job>> GetAllJobs();
    Task<Job> CreateJob(Job job);
    Task<Job?> UpdateJob(Guid id, string title, string description, double updated, bool completed);
    Task<Guid> DeleteJob(Guid id);
}
