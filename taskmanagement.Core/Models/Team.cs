namespace taskmanagement.Core.Models;

public class Team
{
    public int TeamID { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public List<User> Members { get; set; } = new List<User>();
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}