using Common.Dto;
using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using Repository.Repositories;
using Service.Interfaces;
using Service.Services.Table;

namespace Service.Services
{
    public static class ExtensionService
    {
        public static IServiceCollection AddServices(this IServiceCollection services) {
            services.AddRepository();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IService<FeedbackDto>, FeedbackService>();
            services.AddScoped<IService<MessageDto>, MessageService>();
            services.AddScoped<IService<TopicDto>, TopicService>();
            services.AddScoped<IService<CategoryDto>, CategoryService>();
            //services.AddScoped<IService<User>, AuthService>();

            services.AddScoped<IOwner, FeedbackService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ILoginService, UserService>();

            services.AddAutoMapper(typeof(MyMapper));

            services.AddScoped<UserRepository>();
            services.AddScoped<IAdminService, AdminService>();

            services.AddTransient<EmailService>();

            services.AddScoped<ISearchService,SearchService>();

            return services;
        }
    }
}
