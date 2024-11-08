using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace taskmanagement.Core.Models;

public class UserRegistrationRequest
{
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; } // Note: Password should not be stored in plain text
    public required string Name { get; set; }
    public string? ProfileImage { get; set; }
    public required string PhoneNumber { get; set; }
}
