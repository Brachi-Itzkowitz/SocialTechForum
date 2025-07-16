using Microsoft.AspNetCore.Http;

namespace Common.Dto.User
{
    public class UserRegisterDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public byte[]? ArrImageProfile { get; set; }
        public IFormFile? fileImageProfile { get; set; }
        public string? ImageProfileUrl { get; set; }

    }
}
