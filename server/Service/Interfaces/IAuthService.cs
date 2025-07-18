﻿using Common.Dto.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IAuthService
    {
        Task<string> GenerateTokenAsync(UserLogin userLogin);
        Task<UserDto> AuthenticateAsync(UserLogin userLogin);
    }
}
