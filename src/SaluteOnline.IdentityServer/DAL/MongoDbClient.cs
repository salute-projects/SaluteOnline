using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace SaluteOnline.IdentityServer.DAL
{
    public class MongoDbClient
    {
        public ObjectId Id { get; set; }
        public string ClientId { get; set; }
        public List<string> RedirectUris { get; set; }
        public List<string> ClientSecrets { get; set; }
        public List<string> AllowedScopes { get; set; }
    }
}
