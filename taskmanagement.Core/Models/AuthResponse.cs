using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace taskmanagement.Core.Models
{
    public class AuthResponse
    {

        public string AccessToken { get; set; }
        public string RefreshToken { get; private set; }
        public int ExpiresIn { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public DateTime ExpiresAt { get; set; }
        public string TokenType { get; set; } = "Bearer";
        public AuthResponse(
     string accessToken,
     string refreshToken,
     int expiresIn,
     int userId,
     string username)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            ExpiresIn = expiresIn;
            UserId = userId;
            Username = username;
            ExpiresAt = DateTime.UtcNow.AddMinutes(expiresIn);
        }

       
    }
}
