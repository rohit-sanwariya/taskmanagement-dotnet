using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using taskmanagement.Core.Entities;
using taskmanagement.Data.Data;
using taskmanagement.Services.Contracts;
using taskmanagement.Services.Services;


namespace taskmanagement.Services.Extensions;

public static class ServiceExtensions
{
    public static void AddDomainServices(this IServiceCollection services)
    {
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IAuthService, AuthService>();
        services.AddSingleton<IContainerService, ContainerService>();
        services.AddSingleton<IBlobService, BlobService>();
    }

    public static void AddDbContextIdentity(this IServiceCollection services)
    {


        services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
    }
}
