using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Mock
{
    public static class DataSeeder
    {
            public static async Task SeedAsync(Database db)
            {
                if (await db.Users.AnyAsync()) return; // אם כבר קיים – לא מריץ שוב

                var rnd = new Random();

                Console.WriteLine("🧑‍💻 creating users");
                var users = new List<User>();
                for (int i = 1; i <= 20; i++)
                {
                    users.Add(new User
                    {
                        Name = $"User{i}",
                        Email = $"user{i}@gmail.com",
                        Password = $"user{i}_1234", 
                        Role = Role.New,
                        RegistrationDate = DateTime.UtcNow,
                        CountMessages = 0
                    });
                }
                db.Users.AddRange(users);
                await db.SaveChangesAsync();

                Console.WriteLine("🗂 creating categories");
                var categories = new List<Category>
                {
                    new Category { NameCategory = "תכנות" },
                    new Category { NameCategory = "עיצוב" },
                    new Category { NameCategory = "כלים ופלטפורמות" },
                    new Category { NameCategory = "שפות תכנות" },
                    new Category { NameCategory = "כללי" }
                };
                db.Categories.AddRange(categories);
                await db.SaveChangesAsync();

                Console.WriteLine("🧵 creating topics and messages");
                var allTopics = new List<Topic>();
                var allMessages = new List<Message>();
                var allFeedbacks = new List<Feedback>();

                var topicTitles = new Dictionary<string, List<string>>
                {
                    ["תכנות"] = new() {
                    "איך משתמשים ב־ LINQ ב־ C# ?",
                    "שגיאה ב־ Entity Framework בעת שמירה",
                    "הבדל בין class ל־ record"
                },
                    ["עיצוב"] = new() {
                    "איך מעצבים כפתור יפה ב־ CSS",
                    "שימוש ב־ Figma לצוותים",
                    "טיפים לעיצוב UI נגיש"
                },
                    ["כלים ופלטפורמות"] = new() {
                    "מה זה Docker ולמה זה טוב?",
                    "שימוש ב־ Postman לבדוק API",
                    "CI/CD עם GitHub Actions"
                },
                    ["שפות תכנות"] = new() {
                    "Python או JavaScript – מה ללמוד?",
                    "התחלה עם TypeScript",
                    "למה כולם אוהבים Rust ?"
                },
                    ["כללי"] = new() {
                    "המלצות לקורסים אונליין",
                    "איך למצוא פרויקט צד לעבודה",
                    "הבדלים בין מפתח Front ל־ Back"
                }
                };

                foreach (var cat in categories)
                {
                    foreach (var title in topicTitles[cat.NameCategory])
                    {
                        var creator = users[rnd.Next(users.Count)];

                        var topic = new Topic
                        {
                            Title = title,
                            CategoryId = cat.Id,
                            UserId = creator.Id,
                        };
                        db.Topics.Add(topic);
                        await db.SaveChangesAsync();
                        allTopics.Add(topic);

                        for (int i = 0; i < 3; i++)
                        {
                            var sender = users[rnd.Next(users.Count)];

                            var message = new Message
                            {
                                TopicId = topic.Id,
                                UserId = sender.Id,
                                Content = $"תגובה מספר {i + 1} לנושא: {title}",
                            };
                            db.Messages.Add(message);
                            await db.SaveChangesAsync();
                            allMessages.Add(message);

                            Console.WriteLine("🎭 creating feedbacks");
                            if (rnd.NextDouble() > 0.5)
                            {
                                var feedback = new Feedback
                                {
                                    MessageId = message.Id,
                                    UserId = users[rnd.Next(users.Count)].Id,
                                    Type = (Emoji)rnd.Next(0, 5)
                                };
                                db.Feedbacks.Add(feedback);
                                await db.SaveChangesAsync();
                                allFeedbacks.Add(feedback);
                            }
                        }
                    }
                }

                Console.WriteLine("📦 created data to DataBase");
            }
        }
    }