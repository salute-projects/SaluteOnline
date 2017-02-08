using SaluteOnline.IdentityServer.DAL;

namespace SaluteOnline.IdentityServer
{
    public class LoginService
    {
        private readonly IRepository _repository;

        public LoginService(IRepository repository)
        {
            _repository = repository;
        }

        public bool ValidateCredentials(string username, string password)
        {
            return _repository.ValidatePassword(username, password);
        }

        public Domain.User.MongoUser FindByUserName(string username)
        {
            return _repository.GetUserByUsername(username);
        }
    }
}
