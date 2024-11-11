using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using taskmanagement.Core.Entities;
using taskmanagement.Core.Models;
using taskmanagement.Data.Data;
using taskmanagement.Services.Contracts;



public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public AuthService(
        ApplicationDbContext context,
        IPasswordHasher<User> passwordHasher,
        IConfiguration configuration,
        IMapper mapper
        )
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _configuration = configuration;
        _mapper = mapper;
    }

    public async Task<AuthResponse> RegisterAsync(UserRegistrationRequest model)
    {
        UserTokenInfo user = _mapper.Map<UserTokenInfo>( model );
        User authuser = _mapper.Map<User>(user);
        user.PasswordHash = _passwordHasher.HashPassword(authuser, model.Password);
        _context.Users.Add(authuser);
        await _context.SaveChangesAsync();
        return GenerateAuthResponse(user);
    }

 

    private AuthResponse GenerateAuthResponse(UserTokenInfo user)
    {
        var accessToken = GenerateAccessToken(user);
        var refreshToken = GenerateRefreshToken(user);
        return new AuthResponse(
            accessToken,
            refreshToken,
            (int)_configuration.GetValue<int>("Jwt:ExpiresIn"),
            user.Id,
            user.Email
        );
    }

    private string GenerateAccessToken(UserTokenInfo user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetValue<string>("Jwt:Key")));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _configuration.GetValue<string>("Jwt:Issuer"),
            audience: _configuration.GetValue<string>("Jwt:Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                _configuration.GetValue<int>("Jwt:ExpiresIn")),
            signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GenerateRefreshToken(UserTokenInfo user)
    {
        var bytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(bytes);
        return Convert.ToBase64String(bytes);
    }

    public async Task<AuthResponse> LoginAsync(UserLoginRequest login)
    {
        UserTokenInfo user = await _context.Users.ProjectTo<UserTokenInfo>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(u => u.Email == login.Username);
        User authuser = _mapper.Map<User>(user);
        if (user != null &&
            _passwordHasher.VerifyHashedPassword(authuser, user.PasswordHash, login.Password) ==
            PasswordVerificationResult.Success)
        {
            return GenerateAuthResponse(user);
        }
        throw new UnauthorizedAccessException("Invalid email or password");
    }
}