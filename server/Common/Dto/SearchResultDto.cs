
namespace Common.Dto
{
    public class SearchResultDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AuthorName { get; set; }
        public int? MatchingMessageId { get; set; }
        public string? MatchingMessageSnippet { get; set; }
    }
}