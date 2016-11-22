using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SaluteOnline.Domain.Enums;

namespace SaluteOnline.IdentityServer.DAL
{
    public class MongoDbUser
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool EmailVerified { get; set; }
        public bool IsActive { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}
