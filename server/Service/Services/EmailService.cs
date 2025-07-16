using Common.Dto.Email;
using Mailjet.Client;
using Mailjet.Client.Resources;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace Service.Services
{
    public class EmailService 
    {
        private readonly MailJetSetting _settings;

        public EmailService(IOptions<MailJetSetting> options)
        {
            _settings = options.Value;
        }

        public async Task SendEmailAsync(string toEmail, string toName, string password)
        {
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "Emails", "WelcomeEmailTemplate.html");
            var htmlBody = await File.ReadAllTextAsync(templatePath);

            htmlBody = htmlBody.Replace("{{name}}", toName)
                   .Replace("{{email}}", toEmail)
                   .Replace("{{password}}", password);

            MailjetClient client = new MailjetClient(_settings.ApiKey, _settings.ApiSecret);
            var request = new MailjetRequest { Resource = SendV31.Resource }
                .Property(Send.Messages, new JArray {
                new JObject {
                    {"From", new JObject {
                        {"Email", "0264brachi@gmail.com"}, 
                        {"Name", "Social Network"}
                    }},
                    {"To", new JArray {
                        new JObject {
                            {"Email", toEmail},
                            {"Name", toName}
                        }
                    }},
                    {"Subject", "Welcome to Social Network!"},
                    {"TextPart", "Welcome to Social Network"},
                    {"HTMLPart", htmlBody}
                }
                });

            MailjetResponse response = await client.PostAsync(request);
            

            // Test

            if (response.IsSuccessStatusCode)
                Console.WriteLine("✅ Email sent successfully!");
            else
            {
                Console.WriteLine($"❌ Failed to send email. Status: {response.StatusCode}");
                Console.WriteLine(response.GetErrorMessage());
            }
        }
    }
}
