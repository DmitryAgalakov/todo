using Core.Abstractions;
using Core.Models;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories;


public class JobsRepository : IJobsRepository
{

    public JobsRepository(TodoDbContext context)
    {
        _context = context;
    }


    private readonly TodoDbContext _context;



    public async Task<List<Job>> Get()
    {
        var jobsEntities = await _context.Jobs.AsNoTracking().ToListAsync();

        return jobsEntities.Select(j => Job.Create(j.Id, j.Title, j.Description, j.Created, j.Updated, j.Completed).job!).ToList();
    }



    public async Task<Job> Create(Job job)
    {
        await _context.AddAsync(new JobEntity
        {
            Id = job.Id,
            Title = job.Title,
            Description = job.Description,
            Created = job.Created,
            Updated = job.Updated,
            Completed = job.Completed,
        });

        await _context.SaveChangesAsync();

        return job;
    }



    public async Task<Job?> Update(Guid id, string title, string description, double updated, bool completed)
    {
        await _context.Jobs
            .Where(j => j.Id == id)
            .ExecuteUpdateAsync(j => j
                .SetProperty(j => j.Title, j => title)
                .SetProperty(j => j.Description, j => description)
                .SetProperty(j => j.Updated, j => updated)
                .SetProperty(j => j.Completed, j => completed));

        var jobsEntities = await _context.Jobs.AsNoTracking().ToListAsync();
        var updatedEntity = jobsEntities.FirstOrDefault((j) => j.Id == id);
        if (updatedEntity == null)
        {
            return null;
        } 

        return Job.Create(updatedEntity.Id, updatedEntity.Title, updatedEntity.Description, updatedEntity.Created, updatedEntity.Updated, updatedEntity.Completed).job;
    }



    public async Task<Guid> Delete(Guid id)
    {
        await _context.Jobs
            .Where(j => j.Id == id)
            .ExecuteDeleteAsync();

        return id;
    }



}
