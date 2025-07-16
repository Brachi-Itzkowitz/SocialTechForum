using Repository.Entities;

namespace Common.Dto.AdminPages
{
    public class AdminChangeRoleDto
    {
        public string AdminCode { get; set; }
        public int UserId { get; set; }
        public Role NewRole { get; set; }
    }
}
