using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using SaluteOnline.IdentityServer.DAL;

namespace SaluteOnline.IdentityServer
{
    public class MongoDbResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IRepository _repository;

        public MongoDbResourceOwnerPasswordValidator(IRepository repository)
        {
            _repository = repository;
        }

        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            context.Result = _repository.ValidatePassword(context.UserName, context.Password)
                ? new GrantValidationResult(context.UserName, "password")
                : new GrantValidationResult(TokenRequestErrors.InvalidGrant, "wrong password or username");
            return Task.FromResult(0);
        }
    }
}
