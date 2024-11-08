using Microsoft.AspNetCore.Authentication.BearerToken;
 
using taskmanagement.Core.Entities;
using taskmanagement.Core.Models;

namespace taskmanagement.Services.Contracts
{
    public interface IAuthService
    {
         
            Task<AuthResponse> RegisterAsync(UserRegistrationRequest user );
            Task<AuthResponse> LoginAsync(UserLoginRequest login);
         
    }
}
