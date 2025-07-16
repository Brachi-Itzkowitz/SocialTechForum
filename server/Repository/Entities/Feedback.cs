using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repository.Entities
{
    public enum Emoji
    {
        Like, Dislike, Happy, Lought, Sad, Angry, Shock
    }
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public Emoji Type { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public int MessageId { get; set; }
        [ForeignKey("MessageId")]
        public Message Message { get; set; }
    }
}