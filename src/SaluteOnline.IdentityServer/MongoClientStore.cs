using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Stores;
using SaluteOnline.IdentityServer.DAL;

namespace SaluteOnline.IdentityServer
{
    public class MongoClientStore : IClientStore
    {
        private readonly IRepository _repository;

        public MongoClientStore(IRepository repository)
        {
            _repository = repository;
        }

        public Task<Client> FindClientByIdAsync(string clientId)
        {
            var client = _repository.GetClient(clientId);
            if (client == null)
            {
                return Task.FromResult<Client>(null);
            }
            return Task.FromResult(new Client
            {
                ClientId = clientId,
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                RequireConsent = false,
                AllowAccessToAllScopes = true,
                RedirectUris = client.RedirectUris,
                AllowAccessTokensViaBrowser = true,
                ClientSecrets = client.ClientSecrets.Select(t => new Secret(t.Sha256())).ToList(),
            });
        }
    }
}
