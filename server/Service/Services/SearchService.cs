using AutoMapper;
using Common.Dto;
using Repository.Entities;
using Repository.Interfaces;
using Service.Interfaces;

namespace Service.Services
{
    public class SearchService : ISearchService
    {
        private readonly IRepository<Topic> _topicRepo;
        private readonly IRepository<Message> _messageRepo;
        private readonly IRepository<User> _userRepo;
        private readonly IMapper _mapper;

        public SearchService(IRepository<Topic> topicRepo, IRepository<Message> messageRepo, IRepository<User> userRepo, IMapper mapper)
        {
            _topicRepo = topicRepo;
            _messageRepo = messageRepo;
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<List<SearchResultDto>> SearchSmart(string query)
        {
            var cleanedQueryWords = ExtractCleanWords(query);

            var allTopics = _topicRepo.GetAll();
            var allMessages = _messageRepo.GetAll();

            var results = new List<SearchResultDto>();
            foreach (var topic in allTopics.Result)
            {
                var titleWords = ExtractCleanWords(topic.Title);

                bool hasVeryImportantKeywordInTitle = cleanedQueryWords.Intersect(titleWords).Any(w => veryImportantKeywords.Contains(w));

                // the mess that has this TopicId
                var topicMessages = allMessages.Result.Where(m => m.TopicId == topic.Id).ToList();

                // Compare the similarity between the query and the topic title.
                var matchScore = GetSimilarity(cleanedQueryWords, titleWords);

                Message? matchingMessage = null;
                bool hasVeryImportantInMessage = false;

                foreach (var m in topicMessages)
                {
                    var messageWords = ExtractCleanWords(m.Content);
                    //if the mess has a very-important keywords
                    if (cleanedQueryWords.Intersect(messageWords).Any(w => veryImportantKeywords.Contains(w)))
                    {
                        matchingMessage = m;
                        hasVeryImportantInMessage = true;
                        break;
                    }

                    //regular matching
                    if (matchingMessage == null && GetSimilarity(cleanedQueryWords, messageWords) > 0.3)
                    {
                        matchingMessage = m;
                    }
                }

                if (matchScore > 0.3 || matchingMessage != null || hasVeryImportantKeywordInTitle || hasVeryImportantInMessage)
                {
                    var dto = _mapper.Map<SearchResultDto>(topic);

                    if (matchingMessage != null)
                    {
                        dto.MatchingMessageId = matchingMessage.Id;
                        dto.MatchingMessageSnippet = matchingMessage.Content;
                    }
                    results.Add(dto);
                }
            }
            //return like the time creating
            return await Task.FromResult(results.OrderByDescending(t => t.CreatedAt).ToList());
        }

        private static readonly HashSet<string> stopWords = new()
        {
            // כינויי גוף
            "אני", "אתה", "את", "הוא", "היא", "אנחנו", "אתם", "אתן", "הם", "הן", "שלי", "שלך", "שלו", "שלה", "שלנו", "שלהם", "שלהן",

            // פעלים כלליים
            "רוצה", "רוצים", "רוצה", "רוצות", "צריך", "צריכה", "צריך", "חושב", "חושבת", "חושבים", "צריך", "יש", "אין", "היה", "היו", "תהיה", "תהיו",

            // מילות שאלה/פנייה
            "מה", "מי", "איפה", "מתי", "איך", "למה", "כמה", "אם", "אז", "כן", "לא", "האם",

            // מילות יחס / קישור
            "עם", "על", "אל", "את", "של", "אתה", "ב", "ל", "ו", "ה", "מ", "כ", "ש", "ועם", "ואת", "ואל", "אלי", "בי", "לי", "לך", "לו", "לה", "לנו", "להם", "להן",

            // מילות נימוס או מילים כלליות
            "שלום", "בבקשה", "תודה", "סליחה", "היי", "הי", "שלום", "אפשר", "מישהו", "מישהי", "משהו", "כלום", "אחד", "אחת", "דבר", "דברים", "כל", "עוד", "כמו", "לפי", "אולי", "עכשיו", "כאן", "שם", "תוך", "בזמן", "גם", "רק",

            // מילות עזר נוספות
            "שהוא", "שהיא", "שאתה", "שאת", "שאנחנו", "שהם", "שיש", "שאין", "שזה", "כדי", "יותר", "פחות", "מאוד", "גם", "רק", "כבר", "עוד", "מעט", "הרבה", "מעטים", "אחר", "אחרים", "אחרת"
        };

        private static readonly HashSet<string> veryImportantKeywords = new()
        {
            // שפות תכנות + טכנולוגיות
            "c#", "c++", "java", "python", "javascript", "typescript", "sql", "mongodb", "html", "css", "react", "angular", "node", "php", "kotlin", "swift", "go", "bash", "shell", "json", "xml",
            ".net", "entity", "framework", "linq", "visual", "studio", "git", "github", "api", "rest", "postman", "swagger", "docker", "azure", "firebase",
            // תכנות כללי
            "קוד", "תכנות", "פיתוח", "תוכנה", "באג", "דיבאג", "קומפילציה", "אלגוריתם", "מחלקה", "פונקציה", "משתנה", "לולאה", "תנאי", "אובייקט", "מסד נתונים",
        };

        private static readonly HashSet<string> importantKeywords = new()
        {
            // מושגים חשובים כלליים
            "שיר", "חומר", "בעיה", "פתרון", "שאלה", "תשובה", "מדריך", "הסבר", "עזרה", "עוזר", "תוצאה", "שגיאה", "טעות", "תקלה", "בקשה", "דיון", "נושא",
            // למידה
            "ללמוד", "לימוד", "שיעור", "מורה", "תרגיל", "עבודה", "פרויקט", "מבחן", "בחינה", "תשובות", "מטלה", "סיכום",
            // עזרה כללית
            "שיתוף", "שליחה", "לשלוח", "מסמך", "קובץ", "קישור", "לינק", "המלצה", "מומלץ", "חובה", "תודה", "עזרתם"
        };

        private HashSet<string> ExtractCleanWords(string input) =>
            input.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries)
            .Select(w => NormalizeHebrewWord(w.Trim(',', '.', '?', '!', '"', ':', ';', '-', '@', '$', '%', '^', '&', '*', '(', ')', '~', 'ב', 'ה', 'ל', 'מ')))
            .Where(w => !stopWords.Contains(w))
            .ToHashSet();

        private double GetSimilarity(HashSet<string> a, HashSet<string> b)
        {
            if (a.Count == 0 || b.Count == 0) return 0;
            double score = 0;
            foreach (string word in a.Intersect(b))
            {
                if (veryImportantKeywords.Contains(word))
                    score += 3.0;
                else if (importantKeywords.Contains(word))
                    score += 2.0;
                else
                    score += 1.0;
            }
            return score / a.Union(b).Count();
        }

        private string NormalizeHebrewWord(string word)
        {
            if (word.StartsWith("ל") && word.Length > 3) word = word.Substring(1);
            if (word.EndsWith("ים") || word.EndsWith("ות")) word = word.Substring(0, word.Length - 2); 
            if (word.EndsWith("ה") || word.EndsWith("ת") || word.EndsWith("ן") || word.EndsWith("ך")) word = word.Substring(0, word.Length - 1); 
            return word;
        }
    }
}