using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations;

public class JobConfiguration : IEntityTypeConfiguration<JobEntity>
{

    public void Configure(EntityTypeBuilder<JobEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Title)
            .HasMaxLength(250)
            .IsRequired();
    }

}
