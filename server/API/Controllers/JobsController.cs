using API.Contracts;
using API.Extensions;
using Core.Abstractions;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class JobsController : ControllerBase
{

    public JobsController(IJobsService jobsService)
    {
        _jobsService = jobsService;
    }



    private readonly IJobsService _jobsService;



    [HttpGet]
    public async Task<ActionResult<List<JobResponse>>> GetJobs()
    {
        var jobs = await _jobsService.GetAllJobs();
        var response = jobs.Select(j => new JobResponse(j.Id, j.Title, j.Description, j.Created, j.Updated, j.Completed));
        return Ok(response);
    }



    [HttpPost]
    public async Task<ActionResult<Guid>> CreateJob([FromBody] JobRequest request)
    {
        var created = Ex.DateTimeToJsDate(DateTime.UtcNow);
        var (job, error) = Job.Create(Guid.NewGuid(), request.Title, request.Description, created, created, request.Completed);

        if (!string.IsNullOrWhiteSpace(error))
        {
            return BadRequest(error);
        }

        var createdJob = await _jobsService.CreateJob(job!);
        return Ok(createdJob);
    }



    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdateJob(Guid id, [FromBody] JobRequest request)
    {
        var updated = Ex.DateTimeToJsDate(DateTime.UtcNow);
        var updatedJob = await _jobsService.UpdateJob(id, request.Title, request.Description, updated, request.Completed);
        
        if (updatedJob == null)
        {
            return NotFound("Задача не найдена");
        }

        return Ok(updatedJob);
    }



    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeleteJobs(Guid id)
    {
        var jobId = await _jobsService.DeleteJob(id);
        return Ok(jobId);
    }



}
