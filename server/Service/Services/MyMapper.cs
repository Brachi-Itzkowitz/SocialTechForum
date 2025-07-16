using AutoMapper;
using Common.Dto;
using Common.Dto.User;
using Repository.Entities;

namespace Service.Services
{
    public class MyMapper:Profile
    {
        string path = Path.Combine(Environment.CurrentDirectory, "Images/");

        public MyMapper()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.ArrImageProfile, opt => opt.MapFrom(src => File.ReadAllBytes(path + src.ImageProfileUrl)))
                .ForMember(dest => dest.ImageProfileUrl, opt => opt.MapFrom(src => src.ImageProfileUrl));

            CreateMap<UserDto, User>()
                .ForMember(dest => dest.ImageProfileUrl, opt => opt.MapFrom(src => src.fileImageProfile.FileName));
       
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Feedback, FeedbackDto>().ReverseMap();
            CreateMap<Message, MessageDto>().ReverseMap();
            CreateMap<Topic, TopicDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserForAdminDto>().ReverseMap();
            CreateMap<User, UserRegisterDto>().ReverseMap();
            CreateMap<User, UserLogin>().ReverseMap();
            CreateMap<Message,SearchResultDto>().ReverseMap();
            CreateMap<Topic,SearchResultDto>().ReverseMap();
        }
    }
}