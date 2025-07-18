﻿using AutoMapper;
using Common.Dto;
using Microsoft.AspNetCore.Http;
using Repository.Entities;
using Repository.Interfaces;
using Service.Interfaces;
using System.Security.Claims;

namespace Service.Services.Table
{
    public class MessageService : IService<MessageDto>, IOwner
    {
        private readonly IRepository<Message> repository;
        private readonly IRepository<User> userRepo;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;

        public MessageService(IRepository<Message> repository, IMapper mapper, IHttpContextAccessor httpContextAccessor, IRepository<User> userRepo)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userRepo = userRepo;
        }

        public async Task<MessageDto> Add(MessageDto messageDto)
        {
            var userIsStr = httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIsStr, out int userId))
                throw new UnauthorizedAccessException("User ID not found in token.");
            var message = new Message()
            {
                Content = messageDto.Content,
                UserId = userId,
                TopicId = messageDto.TopicId,
                TimeSend = DateTime.UtcNow,
                Likes = new List<Feedback>()
            };
            var addedMessage = await repository.Add(message);

            User curUser = await userRepo.GetById(userId);
            curUser.CountMessages++;

            return mapper.Map<MessageDto>(addedMessage);
        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task<List<MessageDto>> GetAll()
        {
            return mapper.Map<List<MessageDto>>(await repository.GetAll());
        }

        public async Task<MessageDto> GetById(int id)
        {
            return mapper.Map<MessageDto>(await repository.GetById(id));
        }

        public async Task<bool> IsOwner(int messageId, int userId)
        {
            var message = await repository.GetById(messageId);
            return message != null && message.UserId == userId;
        }

        public async Task Update(int id, MessageDto item)
        {
            await repository.Update(id, mapper.Map<Message>(item));
        }
    }
}
