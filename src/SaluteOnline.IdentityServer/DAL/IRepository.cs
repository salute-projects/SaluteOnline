namespace SaluteOnline.IdentityServer.DAL
{
    public interface IRepository
    {
        Domain.User.MongoUser GetUserByUsername(string username);
        Domain.User.MongoUser GetUserById(string id);
        bool ValidatePassword(string username, string plainTextPassword);
        MongoDbClient GetClient(string clientId);
    }
}