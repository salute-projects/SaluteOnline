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
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public bool EmailVerified { get; set; }
        public Role Role { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneMain { get; set; }
        public string PhoneSecond { get; set; }
        public DateTime Birthday { get; set; }
        public string Avatar { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public bool HideProfile { get; set; }
    }
}

