using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SaluteOnline.Domain.Enums;
using SaluteOnline.IdentityServer.DAL;
using SaluteOnline.Domain.Extensions;

namespace SaluteOnline.IdentityServer.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IPasswordHasher<MongoDbUser> _passwordHasher;
        private readonly IMongoDatabase _mongoDatabase;
        public const string UsersCollectionName = "Users";

        public AccountController(IPasswordHasher<MongoDbUser> passwordHasher)
        {
            _mongoDatabase = new MongoClient("mongodb://localhost:27017").GetDatabase("SaluteOnlineMongoDB");
            _passwordHasher = passwordHasher;
        }

        [HttpPost]
        [Authorize(nameof(Role.Admin))]
        public async Task<IActionResult> Register(MongoDbUser newUser)
        {
            var collection = _mongoDatabase.GetCollection<MongoDbUser>(UsersCollectionName);
            var filter = Builders<MongoDbUser>.Filter.Eq(t => t.Username, newUser.Username ) | Builders<MongoDbUser>.Filter.Eq(t => t.Email, newUser.Email);
            var target = collection.Find(filter).SingleOrDefaultAsync().Result;
            if (target != null) return BadRequest("User with same login or email already exists");
            var userToAdd = new MongoDbUser
            {
                Id = Guid.NewGuid().ToString(),
                LastName = newUser.LastName.EmptyIfNull(),
                FirstName = newUser.FirstName.EmptyIfNull(),
                Email = newUser.Email,
                IsActive = true,
                Username = newUser.Username,
                EmailVerified = false,
                Role = Role.User
            };
            userToAdd.Password = _passwordHasher.HashPassword(userToAdd, newUser.Password);
            await collection.InsertOneAsync(userToAdd);
            return Ok();
        }

        [HttpPatch]
        [Authorize(nameof(Role.SilentDon))]
        public async Task<IActionResult> ChangeUserRole(string userName, Role role)
        {
            var collection = _mongoDatabase.GetCollection<MongoDbUser>(UsersCollectionName);
            var filter = Builders<MongoDbUser>.Filter.Eq(t => t.Username, userName);
            var target = collection.Find(filter).SingleOrDefaultAsync().Result;
            if (target == null) return BadRequest($"User with UserName {userName} wasn't found");
            var update = Builders<MongoDbUser>.Update.Set(t => t.Role, role);
            var result = await collection.UpdateOneAsync(filter, update);
            if (result.IsAcknowledged)
            {
                return Json("Succesfully updated");
            }
            return BadRequest("Error while updating role");
        }
    }
}
