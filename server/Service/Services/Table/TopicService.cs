﻿using AutoMapper;
using Common.Dto;
using Microsoft.AspNetCore.Http;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Service.Interfaces;
using System.Security.Claims;

namespace Service.Services.Table
{
    public class TopicService : IService<TopicDto>, IOwner
    {
        private readonly IRepository<Topic> repository;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TopicService(IRepository<Topic> repository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.repository = repository;
            this.mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<TopicDto> Add(TopicDto topicDto)
        {
            var userIdStr = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
                throw new UnauthorizedAccessException("User ID not found in token.");

            var topic = new Topic()
            {
                Title = topicDto.Title,
                UserId = userId,
                CategoryId = topicDto.CategoryId,
                ListMessages = new List<Message>()
            };
            var addedTopic = await repository.Add(topic);
            return mapper.Map<TopicDto>(addedTopic);
        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task<List<TopicDto>> GetAll()
        {
            return mapper.Map<List<TopicDto>>(await repository.GetAll());
        }

        public async Task<TopicDto> GetById(int id)
        {
            return mapper.Map<TopicDto>(await repository.GetById(id));
        }

        public async Task<bool> IsOwner(int topicId, int userId)
        {
            var feedback = await repository.GetById(topicId);
            return feedback != null && feedback.UserId == userId;
        }

        public async Task Update(int id, TopicDto item)
        {
            await repository.Update(id, mapper.Map<Topic>(item));
        }
    }
}
