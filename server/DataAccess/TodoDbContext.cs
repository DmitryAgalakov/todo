using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
        
    }

    public DbSet<JobEntity> Jobs { get; set; }
}

// dotnet ef migrations add MyMigrationName -s .\API\ -p .\DataAccess\
// dotnet ef database update -s .\API\ -p .\DataAccess\

// Инфа по флагам:
// --project    -p  Relative path to the project folder of the target project. Default value is the current folder.
// --startup-project    -s  Relative path to the project folder of the startup project. Default value is the current folder.

