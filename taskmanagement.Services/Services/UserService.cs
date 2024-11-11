using taskmanagement.Core.Entities;
using taskmanagement.Data.Data;
using taskmanagement.Services.Auth;
using Microsoft.EntityFrameworkCore;
 
using AutoMapper;
using taskmanagement.Core.Models;
using AutoMapper.QueryableExtensions;


namespace taskmanagement.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;

        public UserService(ApplicationDbContext context, TokenService tokenService,IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserReadResponse>> GetUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return GetUsersReadResponse(users);
        }

        public async Task<UserReadResponse?>GetUserAsyncFetchAllFields(int id)
        {           
            UserReadResponse? user = GetUserReadResponse(await _context.Users.FindAsync(id));
            return user;
        }   
        public async Task<UserReadResponse?>GetUserAsync(int id)
        {           
            UserReadResponse? user =  await _context.Users.ProjectTo<UserReadResponse>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(user =>user.Id == id);
            return user;
        }   
        
   

        public async Task<UserReadResponse> UpdateUserAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
           await _context.SaveChangesAsync();
            return GetUserReadResponse(user);
        }

        public async Task<UserReadResponse> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
             await _context.SaveChangesAsync();
            return GetUserReadResponse( user);
        }

        public async void DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        public UserReadResponse GetUserReadResponse(User user)
        {
            return _mapper.Map<UserReadResponse>(user);
        }

        public IEnumerable<UserReadResponse> GetUsersReadResponse(IEnumerable<User> users)
        {
            return _mapper.Map<IEnumerable<UserReadResponse>>(users);
        }


    }
}