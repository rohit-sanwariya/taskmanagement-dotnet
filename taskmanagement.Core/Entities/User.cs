

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace taskmanagement.Core.Entities;

public class User : IdentityUser<int>  
{
    [Required]
    public required string Name { get; set; }
    public string? ProfileImage { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
