using Core.Abstractions;
using Core.Models;

namespace App.Services;

public class JobsService : IJobsService
{

    public JobsService(IJobsRepository jobsRepo)
    {
        _jobsRepo = jobsRepo;
    }



    private readonly IJobsRepository _jobsRepo;



    public async Task<List<Job>> GetAllJobs()
    {
        return await _jobsRepo.Get();
    }



    public async Task<Job> CreateJob(Job job)
    {
        return await _jobsRepo.Create(job);
    }



    public async Task<Job?> UpdateJob(Guid id, string title, string description, double updated, bool completed)
    {
        return await _jobsRepo.Update(id, title, description, updated, completed);
    }



    public async Task<Guid> DeleteJob(Guid id)
    {
        return await _jobsRepo.Delete(id);
    }



}
