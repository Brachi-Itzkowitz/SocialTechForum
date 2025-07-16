using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;

namespace Repository.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IContext context;

        public UserRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<User> Add(User item)
        {
            await context.Users.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task Delete(int id)
        {
            context.Users.Remove(await GetById(id));
            await context.Save();
        }

        public async Task<List<User>> GetAll()
        {
            return await context.Users.ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> GetByIdPrivate(int id)
        {
            return await context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(int id, User item)
        {
            var existUser = await GetById(id);   
            if(existUser != null)
            {
                var now = DateTime.UtcNow;
                ////////////////////להוריד את השונה
                if (!(item.RegistrationDate <= now.AddMonths(-4) || item.CountMessages >= 100) && item.Role != Role.Admin)
                    item.Role = Role.Veteran;
                else
                    existUser.Role = item.Role;

                existUser.Name = item.Name;
                existUser.Password = item.Password;
                existUser.Email = item.Email;
                existUser.ImageProfileUrl = item.ImageProfileUrl;
                existUser.CountMessages = item.CountMessages;
                await context.Save();
            }
        }

    }
}
