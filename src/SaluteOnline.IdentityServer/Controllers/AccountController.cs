using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SaluteOnline.Domain.Enums;
using SaluteOnline.Domain.User;
using MongoUser = SaluteOnline.Domain.User.MongoUser;

namespace SaluteOnline.IdentityServer.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IPasswordHasher<Domain.User.MongoUser> _passwordHasher;
        private readonly IMongoDatabase _mongoDatabase;
        public const string UsersCollectionName = "Users";

        public AccountController(IPasswordHasher<Domain.User.MongoUser> passwordHasher)
        {
            _mongoDatabase = new MongoClient("mongodb://localhost:27017").GetDatabase("SaluteOnlineMongoDB");
            _passwordHasher = passwordHasher;
        }

        [HttpPost]
        public async Task<IActionResult> Register(Domain.User.MongoUser newUser)
        {
            var collection = _mongoDatabase.GetCollection<Domain.User.MongoUser>(UsersCollectionName);
            var filter = Builders<Domain.User.MongoUser>.Filter.Eq(t => t.Username, newUser.Username) |
                         Builders<Domain.User.MongoUser>.Filter.Eq(t => t.Email, newUser.Email);
            var target = collection.Find(filter).SingleOrDefaultAsync().Result;
            if (target != null) return BadRequest("User with same login or email already exists");
            var userToAdd = new Domain.User.MongoUser
            {
                Guid = Guid.NewGuid(),
                Email = newUser.Email,
                IsActive = true,
                Username = newUser.Username,
                EmailVerified = false,
                Role = Role.User
            };
            userToAdd.Password = _passwordHasher.HashPassword(userToAdd, newUser.Password);
            await collection.InsertOneAsync(userToAdd);
            return Ok(userToAdd);
        }

        [HttpPatch]
        [Authorize(nameof(Role.SilentDon))]
        public async Task<IActionResult> ChangeUserRole(string userName, Role role)
        {
            var collection = _mongoDatabase.GetCollection<Domain.User.MongoUser>(UsersCollectionName);
            var filter = Builders<Domain.User.MongoUser>.Filter.Eq(t => t.Username, userName);
            var target = collection.Find(filter).SingleOrDefaultAsync().Result;
            if (target == null) return BadRequest($"User with UserName {userName} wasn't found");
            var update = Builders<Domain.User.MongoUser>.Update.Set(t => t.Role, role);
            var result = await collection.UpdateOneAsync(filter, update);
            if (result.IsAcknowledged)
            {
                return Json("Succesfully updated");
            }
            return BadRequest("Error while updating role");
        }

        [HttpGet("EmailUniquity")]
        [AllowAnonymous]
        public async Task<IActionResult> EmailUniquity(string email)
        {
            try
            {
                var collection = _mongoDatabase.GetCollection<Domain.User.MongoUser>(UsersCollectionName);
                var filter = Builders<Domain.User.MongoUser>.Filter.Eq(t => t.Email, email);
                var target = collection.FindAsync(filter).Result;
                return Ok(await target.AnyAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("UsernameUniquity")]
        [AllowAnonymous]
        public async Task<IActionResult> UsernameUniquity(string username)
        {
            try
            {
                var collection = _mongoDatabase.GetCollection<Domain.User.MongoUser>(UsersCollectionName);
                var filter = Builders<Domain.User.MongoUser>.Filter.Eq(t => t.Username, username);
                var target = collection.FindAsync(filter).Result;
                return Ok(await target.AnyAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
