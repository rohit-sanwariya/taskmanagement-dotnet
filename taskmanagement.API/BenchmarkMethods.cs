using BenchmarkDotNet.Attributes;
using taskmanagement.Core.Models;
using taskmanagement.Services;

namespace taskmanagement.API;

[SimpleJob(launchCount: 1, warmupCount: 1, iterationCount: 1000)]
[MemoryDiagnoser]
public class BenchmarkMethods
{
   private readonly IUserService services;
    public BenchmarkMethods(IUserService userService)
    {
        services = userService;
    }

    [Benchmark]
    public async Task<UserReadResponse> GetUserById()
    {
        return await this.services.GetUserAsync(4);
    }
    //[Benchmark]
    //public async Task<UserReadResponse> GetUserByIdWithProjection()
    //{
    //    return await this.services.GetUserAsyncFetchAllFields(4); 
    //}
}
