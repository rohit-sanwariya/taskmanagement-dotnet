using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using taskmanagement.Core.Entities;

namespace taskmanagement.Services.Auth;

public class TokenService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<User>  _userManager;

    public TokenService(IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
    }

     
}