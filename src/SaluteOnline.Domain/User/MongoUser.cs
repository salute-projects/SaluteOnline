using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SaluteOnline.Domain.Enums;
using SaluteOnline.Domain.MongoModels;

namespace SaluteOnline.Domain.User
{
    public class MongoUser : IMongoEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Guid { get; set; }

        [BsonElement("Id")]
        public int Id { get; set; }

        [BsonElement("Username")]
        public string Username { get; set; }

        [BsonElement("Password")]
        public string Password { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("IsActive")]
        public bool IsActive { get; set; }

        [BsonElement("EmailVerified")]
        public bool EmailVerified { get; set; }

        [BsonElement("Role")]
        public Role Role { get; set; }
    }
}

