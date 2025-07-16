using Repository.Entities;

namespace Common.Dto
{
    public class FeedbackDto
    {
        public int Id { get; set; }
        public Emoji Type { get; set; } 
        public int MessageId { get; set; }
        public int UserId { get; set; }
    }
}
