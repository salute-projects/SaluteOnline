using Microsoft.AspNet.Identity;
using MongoDB.Driver;
using SaluteOnline.IdentityServer.DAL;

namespace SaluteOnline.IdentityServer
{
    public class MongoDbRepository : IRepository
    {
        private readonly IPasswordHasher<Domain.User.MongoUser> _passwordHasher;
        private readonly IMongoDatabase _mongoDatabase;
        public const string UsersCollectionName = "Users";
        public const string ClientsCollectionName = "Clients";

        public MongoDbRepository(IPasswordHasher<Domain.User.MongoUser> passwordHasher)
        {
            _mongoDatabase = new MongoClient("mongodb://localhost:27017").GetDatabase("SaluteOnlineMongoDB");
            _passwordHasher = passwordHasher;
        }

        public Domain.User.MongoUser GetUserByUsername(string username)
        {
            var collection = _mongoDatabase.GetCollection<Domain.User.MongoUser>(UsersCollectionName);
            var filter = Builders<Domain.User.MongoUser>.Filter.Eq(t => t.Username, username);
            return collection.Find(filter).SingleOrDefaultAsync().Result;
        }

        public Domain.User.MongoUser GetUserById(string id)
        {
            var collection = _mongoDatabase.GetCollection<Domain.User.MongoUser>(UsersCollectionName);
            var filter = Builders<Domain.User.MongoUser>.Filter.Eq(t => t.Guid.ToString(), id);
            return collection.Find(filter).SingleOrDefaultAsync().Result;
        }

        public bool ValidatePassword(string username, string plainTextPassword)
        {
            var user = GetUserByUsername(username);
            if (user == null)
            {
                return false;
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, plainTextPassword);
            switch (result)
            {
                case PasswordVerificationResult.Success:
                    return true;
                case PasswordVerificationResult.Failed:
                    return false;
                case PasswordVerificationResult.SuccessRehashNeeded:
                    return false;
                default:
                    return false;
            }
        }

        public MongoDbClient GetClient(string clientId)
        {
            var collection = _mongoDatabase.GetCollection<MongoDbClient>(ClientsCollectionName);
            var filter = Builders<MongoDbClient>.Filter.Eq(t => t.ClientId, clientId);
            return collection.Find(filter).SingleOrDefaultAsync().Result;
        }
    }
}
