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

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("PhoneMain")]
        public string PhoneMain { get; set; }

        [BsonElement("PhoneSecond")]
        public string PhoneSecond { get; set; }

        [BsonElement("Birthday")]
        public DateTime Birthday { get; set; }

        [BsonElement("Avatar")]
        public string Avatar { get; set; }
    }
}

