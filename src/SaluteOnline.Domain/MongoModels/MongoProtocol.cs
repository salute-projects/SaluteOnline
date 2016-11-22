using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SaluteOnline.Domain.MongoModels
{
    public class MongoProtocol : IMongoEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Guid { get; set; }

        [BsonElement("Id")]
        public int Id { get; set; }

        [BsonElement("Table")]
        public int Table { get; set; }

        [BsonElement("Game")]
        public int Game { get; set; }

        [BsonElement("Manager")]
        public string Manager { get; set; }
    }
}
