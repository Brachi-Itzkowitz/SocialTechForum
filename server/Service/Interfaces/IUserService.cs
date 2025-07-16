using Common.Dto.User;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetById(int id);
        Task<User> GetByIdPrivate(int id);
        Task<List<UserDto>> GetAll();
        Task<UserDto> Add(UserRegisterDto user); 
        Task Update(int id, UserRegisterDto item);
        Task Update(int id, User item);
        Task Delete(int id);
        Task<List<UserForAdminDto>> GetAllForAdmin();
    }
}
