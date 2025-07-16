using Microsoft.AspNetCore.Http;
using Repository.Entities;

namespace Common.Dto.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Role Role { get; set; }
        public byte[]? ArrImageProfile { get; set; }
        public IFormFile? fileImageProfile { get; set; }
        public string? ImageProfileUrl { get; set; }
    }
}
