﻿using System.ComponentModel.DataAnnotations;

namespace Repository.Entities
{
    public enum Role
    {
        New,Veteran,Admin 
    }

    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string? ImageProfileUrl { get; set; }
        public Role Role { get; set; } 
        public int CountMessages { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}