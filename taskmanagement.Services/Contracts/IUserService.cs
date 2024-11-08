using taskmanagement.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Task = System.Threading.Tasks.Task;
using taskmanagement.Core.Models;

namespace taskmanagement.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserReadResponse>> GetUsersAsync();
        Task<UserReadResponse?> GetUserAsync(int id);
        Task<UserReadResponse> UpdateUserAsync(User user);
        Task<UserReadResponse> CreateUserAsync(User user);
        void DeleteUserAsync(int id);
        bool UserExists(int id);
      
    }
}