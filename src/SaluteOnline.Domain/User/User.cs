using System;
using SaluteOnline.Domain.Common;

namespace SaluteOnline.Domain.User
{
    public class User : IEntity
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Nick { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string PhoneSecondary { get; set; }
        public string Avatar { get; set; }
        public string About { get; set; }
        public string LinkToVk { get; set; }
        public string LinkToFb { get; set; }
        public bool VisibleToOthers { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
    }
}