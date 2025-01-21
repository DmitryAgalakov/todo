namespace API.Contracts;

public record JobRequest(
    string Title,
    string Description,
    bool Completed
);

