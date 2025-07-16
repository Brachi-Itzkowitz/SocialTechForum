using System.ComponentModel.DataAnnotations;

namespace Repository.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string NameCategory { get; set; }
        public virtual List<Topic> Topics { get; set; }
    }
}
