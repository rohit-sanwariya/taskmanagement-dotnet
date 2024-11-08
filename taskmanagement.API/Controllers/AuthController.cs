using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using taskmanagement.Core.Models;
using taskmanagement.Services.Contracts;

namespace taskmanagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register") ]
     
        public async Task<AuthResponse> RegisterUser(UserRegistrationRequest user)
        {

         return await _authService.RegisterAsync(user);
        }

        [HttpPost("login")]

        public async Task<AuthResponse> LoginUser(UserLoginRequest user)
        {

            return await _authService.LoginAsync(user);
        }

        [HttpGet]
        public string getUser()
        {

            return "ok";
        }
    }
}
