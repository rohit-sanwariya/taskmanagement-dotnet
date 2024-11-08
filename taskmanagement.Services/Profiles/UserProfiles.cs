

using AutoMapper;
using taskmanagement.Core.Entities;
using taskmanagement.Core.Models;

namespace taskmanagement.Services.Profiles;

public class UserProfiles : Profile
{
    public UserProfiles()
    {
        CreateMap<UserRegistrationRequest,User>();
        CreateMap<User,UserReadResponse>();
    }
}
