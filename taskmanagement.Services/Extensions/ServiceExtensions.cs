using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using taskmanagement.Core.Entities;
using taskmanagement.Data.Data;
using taskmanagement.Services.Auth;
using taskmanagement.Services.Contracts;


namespace taskmanagement.Services.Extensions;

public static class ServiceExtensions
{
    public static void AddDomainServices(this IServiceCollection services)
    {
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IAuthService, AuthService>();
    }

    public static void AddDbContextIdentity(this IServiceCollection services)
    {


        services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
    }
}
