using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using SaluteOnline.IdentityServer.DAL;

namespace SaluteOnline.IdentityServer
{
    public class MongoDbProfileService : IProfileService
    {
        public readonly IRepository Repository;

        public MongoDbProfileService(IRepository repository)
        {
            Repository = repository;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var subjectId = context.Subject.GetSubjectId();
            var user = Repository.GetUserByUsername(subjectId);
            var claims = new List<Claim> {
                new Claim(JwtClaimTypes.Subject, user.Guid.ToString()),
                new Claim(JwtClaimTypes.Name, user.Username),
                new Claim(JwtClaimTypes.Email, user.Email),
                new Claim(JwtClaimTypes.Id, user.Id.ToString()),
                new Claim(JwtClaimTypes.EmailVerified, user.EmailVerified.ToString().ToLower(), ClaimValueTypes.Boolean),
                new Claim(JwtClaimTypes.Role, user.Role.ToString())
            };
            context.IssuedClaims = claims;
            return Task.FromResult(0);
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            var user = Repository.GetUserByUsername(context.Subject.GetSubjectId());
            context.IsActive = (user != null) && user.IsActive;
            return Task.FromResult(0);
        }
    }
}
