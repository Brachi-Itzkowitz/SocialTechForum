using System.ComponentModel.DataAnnotations;

namespace Repository.Entities
{
    public class SystemSettings
    {
        [Key]
        public int Id { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }
    }
}