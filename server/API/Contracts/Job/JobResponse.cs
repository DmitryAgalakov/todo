namespace API.Contracts;

public record JobResponse(
    Guid Id,
    string Name,
    string Description,
    double Created,
    double Updated,
    bool Completed
);

