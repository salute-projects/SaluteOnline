using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SaluteOnline.Domain.MongoModels
{
    public class MongoGeoCities : IMongoEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Guid { get; set; }

        [BsonIgnore]
        public int Id { get; set; }

        [BsonElement("Country")]
        public string Country { get; set; }

        [BsonElement("Cities")]
        public List<string> Cities { get; set; }
    }
}
