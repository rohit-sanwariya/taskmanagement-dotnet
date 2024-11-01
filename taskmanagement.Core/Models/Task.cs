
using taskmanagement.Core.Enums;
using TaskStatus = taskmanagement.Core.Enums.TaskStatus;

namespace taskmanagement.Core.Models;

public class Task
{
    public int TaskID { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateTime DueDate { get; set; }
    public required TaskStatus Status { get; set; }  
    public required TaskPriority Priority { get; set; }  
    public int AssignedUserID { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User? AssignedUser { get; set; }
}
