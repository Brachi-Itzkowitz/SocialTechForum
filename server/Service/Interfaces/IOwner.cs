﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IOwner
    {
        Task<bool> IsOwner(int itemId, int userId);
    }
}
